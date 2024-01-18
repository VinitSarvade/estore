import { Space_Grotesk } from 'next/font/google';

import { Category } from '@prisma/client';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import Tabbar from '@/components/bottom-nav/bottom-nav';
import Navbar from '@/components/navbar/navbar';
import { API } from '@estore/utils/api';

import Header from './components/header/header';

const grotesk = Space_Grotesk({
  display: 'swap',
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await API.get<Category[]>('/categories');

  return (
    <html lang="en">
      <body className={grotesk.className}>
        <Header>
          <Navbar categories={categories} />
        </Header>
        <main className="mt-5 pb-20 md:pb-0">{children}</main>
        <Tabbar />

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
