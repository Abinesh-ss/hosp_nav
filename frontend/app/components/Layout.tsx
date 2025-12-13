"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { Shield, LogOut, Menu, X, Navigation, Settings, Upload, Map, BarChart3 } from "lucide-react";

export default function Layout({ children, showSidebar }: { children: ReactNode; showSidebar?: boolean }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication status
    const auth = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(auth === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    router.push("/login");
  };

  // Public navigation for marketing pages
  const PublicNav = () => (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Navigation className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">HospiNav Pro</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#features" className="text-gray-600 hover:text-indigo-600 transition">Features</Link>
            <Link href="/#how-it-works" className="text-gray-600 hover:text-indigo-600 transition">How It Works</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-indigo-600 transition">Pricing</Link>
            <Link href="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
              Sign In
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link href="/#features" className="text-gray-600 hover:text-indigo-600 transition px-2 py-1">Features</Link>
              <Link href="/#how-it-works" className="text-gray-600 hover:text-indigo-600 transition px-2 py-1">How It Works</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-indigo-600 transition px-2 py-1">Pricing</Link>
              <Link href="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-center">
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  // Authenticated navigation for app pages
  const AuthNav = () => (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">HospiNav Pro</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-indigo-600 transition flex items-center">
              <BarChart3 className="w-4 h-4 mr-1" />
              Dashboard
            </Link>
            <Link href="/upload" className="text-gray-600 hover:text-indigo-600 transition flex items-center">
              <Upload className="w-4 h-4 mr-1" />
              Upload
            </Link>
            <Link href="/editor" className="text-gray-600 hover:text-indigo-600 transition flex items-center">
              <Map className="w-4 h-4 mr-1" />
              Editor
            </Link>
            <Link href="/navigate" className="text-gray-600 hover:text-indigo-600 transition flex items-center">
              <Navigation className="w-4 h-4 mr-1" />
              Navigate
            </Link>
            <Link href="/qr" className="text-gray-600 hover:text-indigo-600 transition flex items-center">
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:text-red-700 transition"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link href="/dashboard" className="text-gray-600 hover:text-indigo-600 transition px-2 py-1">Dashboard</Link>
              <Link href="/upload" className="text-gray-600 hover:text-indigo-600 transition px-2 py-1">Upload</Link>
              <Link href="/editor" className="text-gray-600 hover:text-indigo-600 transition px-2 py-1">Editor</Link>
              <Link href="/navigate" className="text-gray-600 hover:text-indigo-600 transition px-2 py-1">Navigate</Link>
              <Link href="/qr" className="text-gray-600 hover:text-indigo-600 transition px-2 py-1">QR Codes</Link>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 transition px-2 py-1 text-left"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Render appropriate navigation based on authentication and sidebar requirement */}
      {showSidebar ? <AuthNav /> : <PublicNav />}
      
      <div className="flex">
        {/* Sidebar for authenticated pages */}
        {showSidebar && (
          <aside className="w-64 bg-white shadow-md h-screen sticky top-16 border-r border-gray-200 hidden md:block">
            <div className="p-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Navigation
              </h3>
              <nav className="space-y-2">
                <Link
                  href="/dashboard"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 text-gray-700 hover:text-indigo-600 transition"
                >
                  <BarChart3 className="w-4 h-4 mr-3" />
                  Dashboard
                </Link>
                <Link
                  href="/upload"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 text-gray-700 hover:text-indigo-600 transition"
                >
                  <Upload className="w-4 h-4 mr-3" />
                  Upload Maps
                </Link>
                <Link
                  href="/editor"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 text-gray-700 hover:text-indigo-600 transition"
                >
                  <Map className="w-4 h-4 mr-3" />
                  Map Editor
                </Link>
                <Link
                  href="/navigate"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 text-gray-700 hover:text-indigo-600 transition"
                >
                  <Navigation className="w-4 h-4 mr-3" />
                  Live Navigation
                </Link>
                <Link
                  href="/qr"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 text-gray-700 hover:text-indigo-600 transition"
                >
                  Settings
                </Link>
              </nav>

              <div className="mt-8">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/upload"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"
                  >
                    <Upload className="w-4 h-4 mr-3" />
                    Upload New Map
                  </Link>
                  <Link
                    href="/editor"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition"
                  >
                    <Map className="w-4 h-4 mr-3" />
                    Create Route
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Main content area */}
        <main className={`flex-1 ${showSidebar ? 'md:ml-0' : ''}`}>
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} HospiNav Pro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Privacy</Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Terms</Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
