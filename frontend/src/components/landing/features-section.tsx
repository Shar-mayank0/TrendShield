export default function FeaturesSection() {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose TrendShield?</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our AI-powered analysis ensures businesses stay ahead of market manipulations.
            </p>
          </div>
  
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <h3 className="text-xl font-bold mb-3">Price Anomaly Detection</h3>
              <p className="text-gray-700">
                Our system identifies unusual price movements that deviate from market norms.
              </p>
            </div>
  
            <div className="card">
              <h3 className="text-xl font-bold mb-3">ML-Powered Insights</h3>
              <p className="text-gray-700">
                DBSCAN and K-Means clustering analyze pricing patterns for hidden insights.
              </p>
            </div>
  
            <div className="card">
              <h3 className="text-xl font-bold mb-3">Real-Time Alerts</h3>
              <p className="text-gray-700">
                Get notified when suspicious pricing activities are detected.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  