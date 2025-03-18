import Link from 'next/link';

export default function CtaSection() {
  return (
    <section className="py-16 bg-blue-600 text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to See More?</h2>
        <p className="text-xl mb-10 max-w-3xl mx-auto">
          Dive deeper into the analysis with our customizable reports and alerts.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/contact" className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-md">
            try our extionsion now!
          </Link>
          <Link href="/insights" className="border border-white text-white py-3 px-6 rounded-md hover:bg-blue-700">
            Download Sample Report
          </Link>
        </div>
      </div>
    </section>
  );
}
