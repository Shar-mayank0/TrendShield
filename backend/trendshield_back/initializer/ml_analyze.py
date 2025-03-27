import pandas as pd
import json
from scipy import stats
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import DBSCAN
from sklearn.cluster import KMeans
import numpy as np
from sklearn.metrics import silhouette_score

class MLAnalyze:
    def __init__(self, data, product_id):
        json_data = json.loads(data)
        self.product_id = product_id
        self.dates = json_data.get('dates')
        self.prices = json_data.get('prices')
        self.anomalies = None
        self.clusters = None

        # get json data from the scraper or the database
    def get_data(self, dates, prices):
        df = pd.DataFrame({
        'dates': pd.to_datetime(dates, format='mixed', dayfirst=True, errors='coerce'),
        'prices': prices
        })
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
        df.dropna(inplace=True)
        df['actual_discount'] = (df['Actual_price'] - df['prices']) / df['Actual_price'] * 100
        max_price_all_time = df['Actual_price'].max()
        # Calculate the discount from the maximum price for each price
        df['discount_from_max_price'] = (max_price_all_time - df['prices']) / max_price_all_time * 100
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
        return self.MLapply(df)


    def MLapply(self, df):
        # apply machine learning algorithms
        # Extract relevant features for clustering
        features = df[['prices', 'actual_discount', 'discount_discrepancy', 'price_moving_average', 'price_change_freq', 'price_variance', 'price_reversions']].fillna(0).values
        scaler = StandardScaler()
        features_scaled = scaler.fit_transform(features)
        feature_names = ['prices', 'actual_discount', 'discount_discrepancy', 
                        'price_moving_average', 'price_change_freq', 
                        'price_variance', 'price_reversions']
        
        db = DBSCAN(eps=0.65, min_samples=14).fit(features_scaled)
        df['cluster'] = db.labels_
        df['anomaly_dbscan'] = db.labels_ == -1

        # Silhouette Score for DBSCAN
        labels_dbscan = df['cluster']
        silhouette_dbscan = silhouette_score(features_scaled, labels_dbscan)
        print(f"Silhouette Score for DBSCAN: {silhouette_dbscan}")
        weights = {
            'anomaly_dbscan': 5,  # Highest priority
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
        features_kmeans = df[['anomaly_dbscan', 'abnormal_price_spike', 'price_change_freq', 'price_variance', 'price_reversions']].astype(float).values

        # Handle NaN and infinite values
        features_kmeans = np.where(np.isposinf(features_kmeans), np.finfo(np.float64).max, features_kmeans)
        features_kmeans = np.where(np.isneginf(features_kmeans), np.finfo(np.float64).min, features_kmeans)
        features_kmeans = np.nan_to_num(features_kmeans)

        # Normalize the features and apply weights
        features = df[['anomaly_dbscan', 'prices', 'actual_discount', 'discount_discrepancy', 'price_moving_average', 'abnormal_price_spike', 'price_change_freq', 'price_variance', 'price_reversions']].fillna(0)
        scaler = StandardScaler()
        features_scaled = scaler.fit_transform(features)

        # Apply weights to the features
        for feature_name, weight in weights.items():
            feature_index = features.columns.get_loc(feature_name)
            features_scaled[:, feature_index] *= weight

        # Apply KMeans clustering
        kmeans = KMeans(n_clusters=5, random_state=19)
        df['maliciousness_level'] = kmeans.fit_predict(features_scaled)

        labels_kmeans = df['maliciousness_level']
        silhouette_kmeans = silhouette_score(features_scaled, labels_kmeans)
        print(f"Silhouette Score for KMeans: {silhouette_kmeans}")
        self.clusters = df['maliciousness_level']
        self.anomalies = df['anomaly_dbscan']
        return 
    # def graph_output(self, df):
    #     # graph the output
    #     fig, ax = plt.subplots(figsize=(10, 6))
    #     colors = {0: 'green', 1: 'lightgreen', 2: 'yellow', 3: 'orange', 4: 'red'}  # Mapping levels to colors

    #     # Plot the prices
    #     ax.plot(df['dates'], df['prices'], color='blue', label='Prices')

    #     # Plot the clusters detected by K-Means
    #     clusters_kmeans = df['maliciousness_level'].unique()
    #     for cluster in clusters_kmeans:
    #         cluster_df = df[df['maliciousness_level'] == cluster]
    #         ax.scatter(cluster_df['dates'], cluster_df['prices'], color=colors[cluster], label=f'Cluster {cluster}')

    #     # Set the x-axis format to display dates
    #     ax.xaxis.set_major_locator(mdates.MonthLocator())
    #     ax.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m'))

    #     # Set the labels and title
    #     ax.set_xlabel('Date')
    #     ax.set_ylabel('Price')
    #     ax.set_title(f'Product ID: {self.product_id}')

    #     # Add a legend
    #     ax.legend()
    #     # save the plot image 
    #     # Show the plot
    #     plt.show()
        

    def upload_data(self, data):
        # upload the data to the database
        pass



