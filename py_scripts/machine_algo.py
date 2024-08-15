import pandas as pd
import numpy as np
import os
import json
from scipy import stats
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import DBSCAN
from sklearn.ensemble import IsolationForest
from sklearn.metrics import silhouette_score, f1_score
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import matplotlib.colors as mcolors
import tkinter as tk
from tkinter import filedialog
from joblib import Parallel, delayed
from sklearn.cluster import KMeans
from matplotlib.cm import get_cmap
from pandasgui import show
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEnginePage


# Function to setup DataFrame and engineer features
def datafrm_setup(dates, prices):
    # Create a DataFrame with the dates and prices
    df = pd.DataFrame({
        'dates': pd.to_datetime(dates, format='mixed', dayfirst=True, errors='coerce'),
        'prices': prices
    })

    # Set the dates as the index of the DataFrame
    df.set_index('dates', inplace=True)

    # Resample the data to 1-month, 2-month, 3-month intervals and calculate the mode for each interval
    M1modedf = df.resample('ME').apply(lambda x: stats.mode(x)[0])
    M2modedf = df.resample('2ME').apply(lambda x: stats.mode(x)[0])
    M3modedf = df.resample('3ME').apply(lambda x: stats.mode(x)[0])

    # Reset the index of modedf to prepare for merging
    M1modedf = M1modedf.reset_index()
    M2modedf = M2modedf.reset_index()
    M3modedf = M3modedf.reset_index()

    # Rename the columns of modedf to avoid conflicts during merge
    M1modedf.columns = ['dates', 'Regular']
    M2modedf.columns = ['dates', 'Long_regular']
    M3modedf.columns = ['dates', 'Actual_price']

    # Merge df and modedf
    df = pd.merge(df, M1modedf, on='dates', how='left')
    df = pd.merge(df, M2modedf, on='dates', how='left')
    df = pd.merge(df, M3modedf, on='dates', how='left')

    # Forward fill missing values
    df.update(df[['Regular', 'Long_regular', 'Actual_price']].ffill())

    # Calculate the discount from the mode value for each price
    df['actual_discount'] = (df['Actual_price'] - df['prices']) / df['Actual_price'] * 100

    # Drop rows with any remaining missing values
    df.dropna(inplace=True)

    # maximum price
    max_price_all_time = df['Actual_price'].max()

    # Calculate the discount from the maximum price for each price
    df['discount_from_max_price'] = (max_price_all_time - df['prices']) / max_price_all_time * 100

    # Feature Engineering

    # Discount Discrepancy
    df['discount_discrepancy'] = df['discount_from_max_price'] - df['actual_discount']

    # Price Volatility
    price_volatility = df['prices'].std()  # Compute standard deviation as a measure of volatility

    # Price Trends
    # Calculate a simple moving average of prices over a specific window size
    window_size = 30
    df['price_moving_average'] = df['prices'].rolling(window=window_size).mean()

    # Abnormal Price Spikes
    # Define a threshold for abnormal price spikes based on historical data
    threshold = 2 * price_volatility  # For example, two times the standard deviation
    df['abnormal_price_spike'] = (df['prices'] - df['price_moving_average']) > threshold

    df['price_change_freq'] = df['prices'].diff().ne(0).rolling(window=30).sum()
    df['price_variance'] = df['prices'].rolling(window=30).std()
    df['price_reversions'] = df['prices'].diff().abs().rolling(window=30).sum() / df['prices']


    return df

# Path to JSON files
json_files_path = 'py_scripts\\training data'

# List to store DataFrames
dataframes = []

# Read all JSON files
for file_name in os.listdir(json_files_path):
    if file_name.endswith('.json'):
        file_path = os.path.join(json_files_path, file_name)
        with open(file_path, 'r') as file:
            data = json.load(file)
            dates = data.get('dates')
            prices = data.get('prices')
            df = datafrm_setup(dates, prices)
            df['product_id'] = file_name.split('.')[0]  # Add product ID to the DataFrame
            dataframes.append(df)

# Combine all DataFrames into one
combined_df = pd.concat(dataframes)

# Extract relevant features for clustering
features = combined_df[['prices', 'actual_discount', 'discount_discrepancy', 'price_moving_average', 'abnormal_price_spike', 'price_change_freq', 'price_variance', 'price_reversions']].fillna(0).values

# Normalize the features
scaler = StandardScaler()
features_scaled = scaler.fit_transform(features)
best_eps = 0.01
best_min_samples = 1
best_score = -1

db = DBSCAN(eps=0.25, min_samples=4).fit(features_scaled)
combined_df['cluster'] = db.labels_
combined_df['anomaly_dbscan'] = db.labels_ == -1

weights = {
    'anomaly_dbscan': 4,  # Highest priority
    'abnormal_price_spike': 3,  # High priority
    'price_change_freq': 2,  # Medium priority
    'prices': 1,  # Lower priority (but still needed)
    'actual_discount': 1,  # Lower priority (but still needed)
    'discount_discrepancy': 1,  # Lower priority (but still needed)
    'price_moving_average': 1,  # Lower priority (but still needed)
    'price_variance': 1,  # Lower priority (but still needed)
    'price_reversions': 1  # Lower priority (but still needed)
}

# Feature selection for K-Means (including the factors in priority order)
features_kmeans = combined_df[['anomaly_dbscan', 'abnormal_price_spike', 'price_change_freq', 'price_variance', 'price_reversions']].astype(float).values

# Handle NaN and infinite values
features_kmeans = np.where(np.isposinf(features_kmeans), np.finfo(np.float64).max, features_kmeans)
features_kmeans = np.where(np.isneginf(features_kmeans), np.finfo(np.float64).min, features_kmeans)
features_kmeans = np.nan_to_num(features_kmeans)

# Normalize the features and apply weights
features = combined_df[['anomaly_dbscan', 'prices', 'actual_discount', 'discount_discrepancy', 'price_moving_average', 'abnormal_price_spike', 'price_change_freq', 'price_variance', 'price_reversions']].fillna(0)
scaler = StandardScaler()
features_scaled = scaler.fit_transform(features)

# Apply weights to the features
for feature_name, weight in weights.items():
    feature_index = features.columns.get_loc(feature_name)
    features_scaled[:, feature_index] *= weight

# Apply KMeans clustering
kmeans = KMeans(n_clusters=5, random_state=19)
combined_df['maliciousness_level'] = kmeans.fit_predict(features_scaled)


# Visualization with different colors for levels of maliciousness # Mapping levels to colors

colors = {0: 'green', 1: 'lightgreen', 2: 'yellow', 3: 'orange', 4: 'red'}  # Mapping levels to colors

directory = "py_scripts\\training data"

# Get all files in the directory
files_in_directory = os.listdir(directory)

# Filter out files that are not json
json_files = [file for file in files_in_directory if file.endswith(".json")]

# Create a Tkinter window
root = tk.Tk()

# Create a StringVar to store the selected file
selected_file = tk.StringVar(root)

# Create an OptionMenu with the json_files as options
option_menu = tk.OptionMenu(root, selected_file, *json_files)
option_menu.pack()

def select_file():
    selected_product_id = selected_file.get().split('.')[0]
    product_df = combined_df[combined_df['product_id'] == selected_product_id]
    def plot_results(product_df):
        fig, ax = plt.subplots(figsize=(10, 6))

        # Plot the prices
        ax.plot(product_df['dates'], product_df['prices'], color='blue', label='Prices')

        # Plot the anomalies detected by DBSCAN
        anomalies_dbscan = product_df[product_df['anomaly_dbscan']]
        ax.scatter(anomalies_dbscan['dates'], anomalies_dbscan['prices'], color='red', label='Anomalies (DBSCAN)')

        # Plot the clusters detected by K-Means
        clusters_kmeans = product_df['maliciousness_level'].unique()
        for cluster in clusters_kmeans:
            cluster_df = product_df[product_df['maliciousness_level'] == cluster]
            ax.scatter(cluster_df['dates'], cluster_df['prices'], color=colors[cluster], label=f'Cluster {cluster}')

        # Set the x-axis format to display dates
        ax.xaxis.set_major_locator(mdates.MonthLocator())
        ax.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m'))

        # Set the labels and title
        ax.set_xlabel('Date')
        ax.set_ylabel('Price')
        ax.set_title(f'Product ID: {selected_product_id}')

        # Add a legend
        ax.legend()

        # Show the plot
        plt.show()

    #Call the plot_results function with the selected product_df
    plot_results(product_df)

# Create a button to select the file
select_button = tk.Button(root, text="Select File", command=select_file)
select_button.pack()

# Run the Tkinter event loop
root.mainloop()
# dropped isolation forest algo due to high complexity n non understandable results


# best_contamination = 0.01
# best_score = -1

# for contamination in range(1, 100, 1):
#     contamination = contamination / 100
#     iso_forest = IsolationForest(contamination=contamination, random_state=42)
#     iso_forest.fit(features_scaled)
#     scores = iso_forest.decision_function(features_scaled)
#     threshold = np.percentile(scores, 100 * contamination)
#     anomalies = scores < threshold
#     score = f1_score(combined_df['anomaly_dbscan'], anomalies)
#     if score > best_score:
#         best_score = score
#         best_contamination = contamination

# iso_forest = IsolationForest(contamination=best_contamination, random_state=42)
# combined_df['anomaly_iso_forest'] = iso_forest.fit_predict(features_scaled) == -1

# print(f'Best Isolation Forest contamination: {best_contamination}, F1 Score: {best_score}')

# combined_df['anomaly'] = combined_df['anomaly_dbscan'] | combined_df['anomaly_iso_forest']

# # Visualizing Anomalies Detected by Isolation Forest
# 


# Visualizing Anomalies Detected by DBSCAN
# Apply DBSCAN for anomaly detection and clustering and find the best hyperparameters
# def find_best_dbscan(eps, min_samples):
#     eps = eps / 100
#     db = DBSCAN(eps=eps, min_samples=min_samples).fit(features_scaled)
#     if len(set(db.labels_)) > 1:  # Ensure there is more than one cluster
#         score = silhouette_score(features_scaled, db.labels_)
#         return eps, min_samples, score

# results = Parallel(n_jobs=6, backend='threading')(delayed(find_best_dbscan)(eps, min_samples) for eps in range(1, 100, 1) for min_samples in range(1, 10, 1))
# # Filter out None values from results
# filtered_results = [result for result in results if result is not None]

# # Ensure filtered_results is not empty to avoid ValueError from max()
# if filtered_results:
#     # Find the tuple with the maximum score
#     best_tuple = max(filtered_results, key=lambda x: x[2])

#     # Extract the best eps and min_samples values
#     best_eps = best_tuple[0] * 100  # Multiplying by 100 to revert the earlier division
#     best_min_samples = best_tuple[1]

#     print(f'Best DBSCAN eps: {best_eps}, min_samples: {best_min_samples}, Silhouette Score: {best_tuple[2]}')
# else:
#     print("No suitable parameters found for DBSCAN.")
# print(f'Best DBSCAN eps: {best_eps}, min_samples: {best_min_samples}, Silhouette Score: {best_score}')
