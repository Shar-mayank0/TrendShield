import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Malicious Price Detection Dashboard
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Visualizing ML-driven insights to protect businesses from pricing anomalies and market manipulation.
          </p>

          <div className="flex gap-4">
            <Link href="/dashboard" className="btn-primary">
              Explore Dashboard
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
