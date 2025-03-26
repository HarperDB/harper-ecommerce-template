import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SiteHeader } from '@/components/site-header';
// import { ControlPanel } from '@/components/control-panel';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Modern E-commerce Store',
  description: 'Shop the latest trends with confidence',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteHeader />
        {children}
        {/* <ControlPanel /> */}
      </body>
    </html>
  );
}