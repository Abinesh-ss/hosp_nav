// app/page.tsx
import Link from 'next/link';
import { Map, CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <section className="py-12 md:py-20 min-h-[calc(100vh-160px)] page-transition">
      <div className="content-wrap grid gap-16 lg:grid-cols-2 lg:items-center">
        {/* Hero */}
        <div className="space-y-8 text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Design <span className="text-indigo-600">confidently.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
            HospiNav is the remote map research platform that takes the guesswork out of indoor navigation by validating layouts with real users.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/upload" className="inline-flex items-center justify-center rounded-full text-base font-semibold transition-all h-12 px-8 bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 hover:scale-105 active:scale-95">
              Get Started
            </Link>
            <Link href="/pricing" className="inline-flex items-center justify-center rounded-full text-base font-semibold transition-all h-12 px-8 border-2 border-gray-200 text-gray-700 hover:bg-gray-50">
              View Pricing
            </Link>
          </div>

          <div className="flex items-center justify-center lg:justify-start space-x-4 text-sm text-gray-500 font-medium">
            <div className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-1"/> No CC required</div>
            <div className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-1"/> Free trial included</div>
          </div>
        </div>

        {/* Illustration */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative flex h-[360px] items-center justify-center bg-white border border-gray-100 rounded-2xl shadow-2xl p-8">
            <div className="text-center space-y-4">
              <div className="bg-indigo-50 p-6 rounded-full inline-block">
                <Map className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Map Analytics Engine</h3>
              <p className="text-sm text-gray-400">Visualization of navigation flow patterns</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

