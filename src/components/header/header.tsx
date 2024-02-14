import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

import logo from './logo.svg';

export default function Header({ children }: PropsWithChildren) {
  return (
    <header className="header">
      <div className="flex place-items-center lg:gap-10 justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            className="px-5 rounded-full"
            alt="Estore Logo"
            width={200}
            height={54}
            unoptimized
            priority
          />
        </Link>
        {children}
      </div>
    </header>
  );
}
