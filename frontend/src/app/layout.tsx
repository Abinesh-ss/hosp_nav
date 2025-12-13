// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HospiNav Pro | Modern Indoor Navigation",
  description: "Enterprise-grade indoor mapping and navigation research.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Nav */}
        <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="group flex items-center space-x-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-3 transition-transform">
                <div className="w-5 h-5 border-2 border-white rounded-sm"></div>
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-slate-900">HOSPI</span>
                <span className="text-indigo-600">NAV</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-gray-600">
              <Link href="/pricing" className="hover:text-indigo-600 transition-colors">Pricing</Link>
              <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
              <Link href="/upload" className="hover:text-indigo-600 transition-colors">Upload</Link>
              <Link href="/login" className="bg-slate-900 text-white px-6 py-2.5 rounded-full hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95">
                Sign in
              </Link>
            </div>
          </div>
        </nav>

        {/* main is full-width so pages that need full-bleed can stretch.
            Pages that should be centered will use the .content-wrap utility */}
        <main className="w-full">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-100 bg-white mt-20 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-gray-500 text-sm font-medium">
            <p>© 2025 HospiNav Pro. All rights reserved.</p>
            <div className="flex space-x-8">
              <Link href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-indigo-600 transition-colors">Contact Support</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

