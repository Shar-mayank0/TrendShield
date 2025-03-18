import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <Link href="/">
          <Image src="/images/logo.svg" alt="TrendShield Logo" width={120} height={40} />
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link href="/dashboard" className="nav-link">Dashboard</Link>
          <Link href="/visualization" className="nav-link">Visualizations</Link>
          <Link href="/insights" className="nav-link">Insights</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </nav>

        <div className="md:hidden">
          {/* Mobile Menu Placeholder */}
          <button className="text-gray-700">
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
