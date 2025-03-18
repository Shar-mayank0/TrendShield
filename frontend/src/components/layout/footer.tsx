import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h3 className="text-lg font-bold mb-3">TrendShield</h3>
          <p className="text-gray-400">Advanced ML-powered platform for detecting and preventing malicious pricing activities.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/overview" className="nav-link">Overview</Link></li>
            <li><Link href="/visualization" className="nav-link">Visualization</Link></li>
            <li><Link href="/insights" className="nav-link">Insights</Link></li>
            <li><Link href="/faq" className="nav-link">FAQ</Link></li>
            <li><Link href="/contact" className="nav-link">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Contact Us</h3>
          <p className="text-gray-400">Email: support@trendshield.in</p>
          <p className="text-gray-400">Phone: +91 (800) 123-4567</p>
        </div>
      </div>

      <div className="text-center mt-10 text-gray-500 text-sm">
        © 2025 TrendShield Technologies Pvt. Ltd. All rights reserved.
      </div>
    </footer>
  );
}
