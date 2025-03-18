'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Import landing page components
// import HeroSection from '@/components/landing/hero-section';
// import FeaturesSection from '@/components/landing/features-section';
import CtaSection from '@/components/landing/cta-section';
import HeroSection from '@/components/landing/hero-section';

export default function Home() {
  const [productUrl, setProductUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productUrl) {
      // Handle form submission
      console.log('Analyzing URL:', productUrl);
      // Normally you would redirect to results or call an API here
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {<HeroSection />}

      {/* Understanding Malicious Pricing Section */}
      <section className="py-16 bg-blue-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Understanding Malicious Pricing</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              TrendShield uses advanced machine learning to detect and protect against malicious pricing patterns in real-time.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="text-red-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Price Anomaly Detection</h3>
              <p className="text-gray-700">
                Our system identifies unusual price movements that deviate from expected market behavior, flagging potential manipulation attempts.
              </p>
            </div>
            
            <div className="card">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">ML-Powered Analysis</h3>
              <p className="text-gray-700">
                DBSCAN and K-Means clustering algorithms work together to analyze pricing data and identify patterns that human analysts might miss.
              </p>
            </div>
            
            <div className="card">
              <div className="text-green-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Real-Time Alerts</h3>
              <p className="text-gray-700">
                Get immediate notifications when suspicious pricing activities are detected, allowing for quick action to protect your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Our ML Algorithms Work */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How Our ML Algorithms Work</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold mb-4">DBSCAN Algorithm</h3>
              <p className="text-gray-700 mb-6">
                Density-Based Spatial Clustering of Applications with Noise (DBSCAN) identifies clusters of normal pricing behavior and flags outliers that don't fit within these clusters as potential anomalies.
              </p>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-gray-400">DBSCAN Visualization Placeholder</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold mb-4">K-Means Clustering</h3>
              <p className="text-gray-700 mb-6">
                This algorithm groups similar price patterns together, helping to establish normal market behavior baselines. Deviation from these clusters can signal unusual activity.
              </p>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-gray-400">K-Means Visualization Placeholder</div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold mb-6">For Non-Technical Users</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start">
                <div className="text-red-500 mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-gray-700">
                  Red markers on charts indicate potential pricing anomalies that deserve your attention.
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="text-blue-500 mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-gray-700">
                  Use the zoom and pan features to explore specific time periods in detail.
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="text-green-500 mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-700">
                  Hover over data points to see detailed information about each price event.
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="text-purple-500 mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <p className="text-gray-700">
                  Toggle between view modes to see overall trends or focus specifically on anomalies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to See More? */}
        {<CtaSection />}
      

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-700">
              Get answers to common questions about TrendShield's Malicious Price Detection Dashboard
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="card">
              <h3 className="text-xl font-bold mb-3">What exactly is malicious pricing and why should I care?</h3>
              <p className="text-gray-700">
                Malicious pricing refers to deliberate price manipulations in markets that can harm businesses and consumers. This includes price gouging, coordinated price movements, and artificially inflated or deflated prices. Detecting these patterns helps protect your business from unfair competition and market distortions.
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-bold mb-3">How accurate is TrendShield's anomaly detection?</h3>
              <p className="text-gray-700">
                Our ML algorithms achieve over 94% accuracy in detecting genuine price anomalies based on extensive validation with historical market data. Each alert is assigned a confidence score to help you prioritize your response.
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-bold mb-3">How frequently is the data updated?</h3>
              <p className="text-gray-700">
                TrendShield monitors pricing data in near real-time, with updates as frequent as every 15 minutes for high-volatility markets. Standard monitoring occurs hourly, with comprehensive daily reports and alerts for significant anomalies.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/faq" className="text-blue-600 hover:text-blue-700 font-medium">
              View all FAQs →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}