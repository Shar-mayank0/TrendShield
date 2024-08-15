import pandas as pd
import json
from scipy import stats
import numpy as np
import sys
import os
from pandasgui import show
import tkinter as tk
from tkinter import filedialog
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEnginePage



def datafrm_setup(dates, prices):
# Create a DataFrame with the dates and prices
    df = pd.DataFrame({
        'dates': pd.to_datetime(dates),
        'prices': prices
    })

    # Set the dates as the index of the DataFrame
    df.set_index('dates', inplace=True)

    # Resample the data to 1-month, 2-month, 3-month intervals and calculate the mode for each interval
    M1modedf = df.resample('M').apply(lambda x: stats.mode(x)[0])
    M2modedf = df.resample('2M').apply(lambda x: stats.mode(x)[0])
    M3modedf = df.resample('3M').apply(lambda x: stats.mode(x)[0])

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
    df['Regular'].fillna(method='ffill', inplace=True) # type: ignore
    df['Long_regular'].fillna(method='ffill', inplace=True) # type: ignore
    df['Actual_price'].fillna(method='ffill', inplace=True) # type: ignore

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
    df['price_reversions'] = df['price_reversions'].fillna(0)
    df['price_variance'] = df['price_variance'].fillna(0)
    df['price_change_freq'] = df['price_change_freq'].fillna(0)
    df['price_moving_average'] = df['price_moving_average'].fillna(0)
    return df


def file_selector():
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
        # Get the selected file
        file = selected_file.get()

        # Open the selected file
        with open(os.path.join(directory, file), 'r', encoding='utf-8-sig') as f:
            data = json.load(f)
            dates = data.get('dates')
            prices = data.get('prices')
            df = datafrm_setup(dates, prices)
            show(df)
        

    # Create a button to select the file
    select_button = tk.Button(root, text="Select File", command=select_file)
    select_button.pack()

    # Run the Tkinter event loop
    root.mainloop()

file_selector()