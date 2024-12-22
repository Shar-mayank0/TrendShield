# TrendShield 🛡️

TrendShield is an intelligent Chrome extension that helps users make informed purchasing decisions by detecting potentially manipulative pricing patterns on e-commerce platforms. Using advanced machine learning algorithms, it analyzes historical price data to identify suspicious pricing behaviors and provides real-time risk assessments.

## 🎯 Key Features

- **Real-time Price Analysis**: Instantly analyzes product prices when you visit supported e-commerce pages
- **ML-Powered Detection**: Uses DBSCAN and K-means clustering to identify suspicious pricing patterns
- **Risk Assessment**: Provides clear risk levels and recommendations for each product
- **Price History Visualization**: Interactive graphs showing historical price trends and anomalies
- **Community-Driven Insights**: Incorporates user feedback to improve detection accuracy
- **User-Friendly Interface**: Clean, intuitive design that seamlessly integrates with shopping experience

## 🚀 How It Works

1. **Data Collection** 📊
   - Monitors product pages on supported platforms
   - Retrieves historical price data through specialized web scraping
   - Processes and standardizes pricing information

2. **Intelligent Analysis** 🧠
   - Features analyzed:
     - Price volatility
     - Discount patterns
     - Price spike frequency
     - Seasonal variations
     - Historical trends

3. **Risk Assessment** ⚖️
   - Generates risk scores (0-4)
   - Provides detailed analysis of pricing patterns
   - Highlights potential pricing manipulations
   - Offers purchase timing recommendations

## 💻 Technical Stack

- **Frontend**: Chrome Extension (JavaScript)
- **Backend**: FastAPI (Python)
- **ML Pipeline**: 
  - DBSCAN for anomaly detection
  - K-means clustering for risk classification
  - Scikit-learn for feature processing
- **Data Visualization**: Matplotlib, Interactive Charts
- **Storage**: Lightweight JSON-based system

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/trendshield.git
cd trendshield
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `extension` directory

## 🎮 Usage

1. Visit a supported e-commerce product page (Amazon, Flipkart)
2. Click the TrendShield icon in your browser
3. View the analysis results:
   - Risk level indicator
   - Price history graph
   - Manipulation detection alerts
   - Community feedback
4. (Optional) Provide your feedback to help improve the system

## 📈 Future Enhancements

- [ ] Expand support to more e-commerce platforms
- [ ] Implement advanced seasonality detection
- [ ] Add price drop predictions
- [ ] Enable price alert notifications
- [ ] Introduce product comparison features
- [ ] Develop mobile companion app

## 🤝 Contributing

We welcome contributions! Whether it's bug reports, feature requests, or code contributions, please feel free to reach out. Here's how you can contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🚨 Disclaimer

TrendShield is designed to provide insights and analysis based on historical price data. While we strive for accuracy, the tool should be used as one of many factors in making purchasing decisions. The risk assessments and recommendations provided are algorithmic interpretations and should not be considered as financial advice.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

- [Mayank Sharma](https://github.com/Shar-mayank0) 

## 🌟 Acknowledgments

- Special thanks to the open-source community for the tools and libraries used in this project
