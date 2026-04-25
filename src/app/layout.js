import './globals.css';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google'
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Deboik Academy | Learn JavaScript Once, Build for All Platforms',
  description: 'Master JavaScript and build for every platform - Web, Mobile, and Desktop. Join Deboik Academy and become a full-stack developer.',
  keywords: 'JavaScript, React, Node.js, React Native, Electron, Web Development, Academy, Programming Course',
  
  openGraph: {
    title: 'Deboik Academy | Learn JavaScript Once, Build for All Platforms',
    description: 'Master JavaScript and build for every platform - Web, Mobile, and Desktop.',
    siteName: 'Deboik Academy',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png', // If you have a mobile version
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
    </html>
  );
}