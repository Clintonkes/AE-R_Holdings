import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ConditionalLayout } from '@/components/layout/ConditionalLayout';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});

export const metadata: Metadata = {
  title: {
    default: 'AE$R Holdings | Premium Cleaning Services in New Jersey',
    template: '%s | AE$R Holdings',
  },
  description:
    'AE$R Holdings delivers premium residential and commercial cleaning services across New Jersey. Reliable, thorough, and tailored to your needs. Call 1(973)937-2289.',
  keywords: [
    'cleaning services',
    'New Jersey cleaning',
    'residential cleaning',
    'commercial cleaning',
    'deep cleaning',
    'move in move out cleaning',
    'AER Holdings',
    'Rutherford NJ',
  ],
  authors: [{ name: 'AE$R Holdings' }],
  creator: 'AE$R Holdings',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aerholdings.com',
    siteName: 'AE$R Holdings',
    title: 'AE$R Holdings | Premium Cleaning Services in New Jersey',
    description:
      'Professional cleaning services across New Jersey. Residential, commercial, deep cleaning and more.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
