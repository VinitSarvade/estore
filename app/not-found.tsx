import Link from 'next/link';

import { FileWarningIcon, UndoDotIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col w-full py-10 items-center justify-center">
      <FileWarningIcon size={64} />
      <h2 className="text-2xl font-semibold">Not Found</h2>

      <p className="text-lg">Could not find page you are looking for</p>

      <Link href="/" className="flex gap-2 mt-3">
        <UndoDotIcon /> Return Home
      </Link>
    </div>
  );
}
