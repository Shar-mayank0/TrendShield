import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, BarChart2, Bell, Eye, Move, ZoomIn } from "lucide-react";
import React from "react";

export default function DashboardHeaderSection(){
  // Card data for the three feature cards
  const featureCards = [
    {
      icon: <AlertCircle className="w-8 h-8" />,
      title: "Price Anomaly Detection",
      description:
        "Our system identifies unusual price movements that deviate from expected market behavior, flagging potential manipulation attempts.",
    },
    {
      icon: <BarChart2 className="w-8 h-8" />,
      title: "ML-Powered Analysis",
      description:
        "DBSCAN and K-Means clustering algorithms work together to analyze pricing data and identify patterns that human analysts might miss.",
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Real-Time Alerts",
      description:
        "Get immediate notifications when suspicious pricing activities are detected, allowing for quick action to protect your business.",
    },
  ];

  // Data for non-technical user tips
  const userTips = [
    {
      icon: <AlertCircle className="w-6 h-6 text-[#3498db]" />,
      highlight: "Red markers",
      text: " on charts indicate potential pricing anomalies that deserve your attention.",
    },
    {
      icon: <ZoomIn className="w-6 h-6 text-[#3498db]" />,
      highlight: "zoom and pan",
      text: " features to explore specific time periods in detail.",
    },
    {
      icon: <Eye className="w-6 h-6 text-[#3498db]" />,
      highlight: "detailed information",
      text: " about each price event.",
    },
    {
      icon: <Move className="w-6 h-6 text-[#3498db]" />,
      highlight: "view modes",
      text: " to see overall trends or focus specifically on anomalies.",
    },
  ];

  return (
    <section id="dashboard-header-section" className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-14">
          <h2 className="text-4xl font-bold text-[#2c3e50] text-center mb-4 font-['Roboto-Bold']">
            Understanding Malicious Pricing
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl font-['Open_Sans-Regular']">
            TrendShield uses advanced machine learning to detect and protect
            against malicious pricing
            <br />
            patterns in real-time.
          </p>
        </div>

        <div id="feature-cards" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {featureCards.map((card, index) => (
            <Card
              key={index}
              className="overflow-hidden border-t-4 border-[#3498db] shadow-[0px_4px_6px_-4px_#0000001a,0px_10px_15px_-3px_#0000001a]"
            >
              <CardContent className="p-6 flex flex-col items-center">
                <div className="w-16 h-16 bg-[#3498db1a] rounded-full flex items-center justify-center mb-6 mt-1">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-[#2c3e50] text-center mb-4 font-['Roboto-Bold' ]">
                  {card.title}
                </h3>
                <p className="text-base text-gray-600 text-center font-['Open_Sans-Regular' ]">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-neutral-800 shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a]">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left column - ML Algorithms */}
              <div>
                <h3 className="text-2xl font-bold text-[#3498db] mb-4 font-['Roboto-Bold' ]">
                  How Our ML Algorithms Work
                </h3>

                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 bg-[#e74c3c] rounded-full mr-2"></div>
                    <span className="text-base font-bold text-white font-['Roboto-Bold' ]">
                      DBSCAN Algorithm
                    </span>
                  </div>
                  <p className="text-base text-gray-300 ml-6 font-['Open_Sans-Regular' ]">
                    Density-Based Spatial Clustering of Applications with Noise
                    (DBSCAN) identifies clusters of
                    <br />
                    normal pricing behavior and flags outliers that don't fit
                    within these clusters as potential
                    <br />
                    anomalies.
                  </p>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 bg-[#3498db] rounded-full mr-2"></div>
                    <span className="text-base font-bold text-white font-['Roboto-Bold' ]">
                      K-Means Clustering
                    </span>
                  </div>
                  <p className="text-base text-gray-300 ml-6 font-['Open_Sans-Regular' ]">
                    This algorithm groups similar price patterns together,
                    helping to establish normal market
                    <br />
                    behavior baselines. Deviation from these clusters can signal
                    unusual activity.
                  </p>
                </div>
              </div>

              {/* Right column - Non-Technical Users */}
              <div>
                <h3 className="text-2xl font-bold text-[#3498db] mb-4 font-['Roboto-Bold' ]">
                  For Non-Technical Users
                </h3>

                <ul className="space-y-4">
                  {userTips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      {tip.icon}
                      <p className="ml-2 text-base text-white font-['Open_Sans-Regular' ]">
                        {index === 0 || index === 2 ? (
                          <>
                            <span className="font-bold text-[#3498db] font-['Open_Sans-Bold' ]">
                              {tip.highlight}
                            </span>
                            <span>{tip.text}</span>
                          </>
                        ) : index === 1 ? (
                          <>
                            <span>Use the </span>
                            <span className="font-bold text-[#3498db] font-['Open_Sans-Bold' ]">
                              {tip.highlight}
                            </span>
                            <span>{tip.text}</span>
                          </>
                        ) : (
                          <>
                            <span>Toggle between </span>
                            <span className="font-bold text-[#3498db] font-['Open_Sans-Bold' ]">
                              {tip.highlight}
                            </span>
                            <span>{tip.text}</span>
                          </>
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
