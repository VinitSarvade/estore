import { Space_Grotesk } from 'next/font/google';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import Tabbar from '@/components/bottom-nav/bottom-nav';
import Navbar from '@/components/navbar/navbar';
import { Toaster } from '@/components/ui/toaster';
import { prisma } from '@estore/prisma';

import Header from './components/header/header';
import UserNav from './components/user-nav/user-nav';

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
  const categories = await prisma.category.findMany({
    where: {
      path: {
        not: {
          contains: '/',
        },
      },
      tagCodes: {
        isEmpty: false,
      },
    },
    orderBy: { id: 'asc' },
  });

  return (
    <html lang="en">
      {/*eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {(process.env.NODE_ENV === 'development' ||
          process.env.VERCEL_ENV === 'preview') && (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script
            data-project-id="FlxITW1bqpUvEly2JldTAFvh5WDHKWwBxr5rT1af"
            data-is-production-environment="false"
            src="https://snippet.meticulous.ai/v1/meticulous.js"
          />
        )}
      </head>
      <body className={grotesk.className}>
        <Header>
          <Navbar categories={categories} />
          <UserNav />
        </Header>
        <main className="pb-20 md:pb-0">{children}</main>
        <Tabbar />
        <Toaster />

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
