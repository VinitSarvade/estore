import { Space_Grotesk } from 'next/font/google';

import Tabbar from '@/components/bottom-nav/bottom-nav';
import Navbar from '@/components/navbar/navbar';
import { Analytics } from '@vercel/analytics/react';

import { Category } from '@estore/types/category';
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

        <Analytics />
      </body>
    </html>
  );
}
