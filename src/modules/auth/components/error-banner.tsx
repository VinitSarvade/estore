import { ShieldAlert } from 'lucide-react';

interface ErrorBannerProps {
  error?: string;
}

export default function ErrorBanner({ error }: ErrorBannerProps) {
  if (!error) {
    return null;
  }

  return (
    <div className="bg-red-50 flex gap-2 px-3 py-2 rounded-md text-destructive place-content-center place-items-center">
      <ShieldAlert className="stroke-destructive animate-pulse" />
      {error}
    </div>
  );
}
