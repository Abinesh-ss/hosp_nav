import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
title: 'HospiNav Pro SaaS',
description: 'Indoor navigation and map management for hospitals.',
}

// Replacement for the file in lines 481-492
export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
<html lang="en">
<body className={inter.className}>
<Navbar />
{children}
</body>
</html>
)
}
