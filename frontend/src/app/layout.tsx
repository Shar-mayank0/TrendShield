import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'TrendShield - ML-Powered Malicious Price Detection Dashboard',
  description: 'Advanced machine learning platform for detecting and preventing malicious pricing activities in real-time.',
  keywords: 'price anomaly detection, machine learning, DBSCAN, K-Means, market manipulation, price monitoring',
  authors: [{ name: 'TrendShield Technologies' }],
  creator: 'TrendShield Technologies Pvt. Ltd.',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://trendshield.in',
    title: 'TrendShield - ML-Powered Malicious Price Detection Dashboard',
    description: 'Advanced machine learning platform for detecting and preventing malicious pricing activities in real-time.',
    siteName: 'TrendShield',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TrendShield Dashboard Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrendShield - ML-Powered Malicious Price Detection Dashboard',
    description: 'Advanced machine learning platform for detecting and preventing malicious pricing activities in real-time.',
    images: ['/images/twitter-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}