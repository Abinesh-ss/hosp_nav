// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'HospiNav Pro',
  description: 'Enterprise-Grade Indoor Navigation & Analytics Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-gray-900 bg-gray-50">
        {children}
      </body>
    </html>
  );
}

