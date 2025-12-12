'use client'

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';

function useAuthMock() {
const [isLoggedIn] = useState(false); 
const [user] = useState({ name: "Alex" });
const login = useCallback(() => {}, []);
const logout = useCallback(() => {}, []);
return { isLoggedIn, user, login, logout };
}

export default function Navbar() {
const { isLoggedIn, user, logout } = useAuthMock();

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
<Link href={href} className="text-sm font-medium transition-colors text-foreground hover:text-primary">
{children}
</Link>
);

return (
<nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-foreground">
                HOSPI<span className="text-purple-600">NAV</span>
            </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/upload">Upload</NavLink>
            <NavLink href="/editor">Editor</NavLink>
            <NavLink href="/qr">QR</NavLink>
            <NavLink href="/navigate">Navigate</NavLink>
        </div>

        {/* Auth Button */}
        <div>
            {isLoggedIn ? (
                <button
                    onClick={logout}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80"
                >
                    <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
                </button>
            ) : (
                <Link href="/login"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
                >
                    Sign in
                </Link>
            )}
        </div>
    </div>
</nav>
);
}
