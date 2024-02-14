import Image from 'next/image';

import { cn } from '@/lib/utils/cn';

import { Button } from '../../../components/ui/button';
import AppleIcon from './Apple.svg';
import GoogleIcon from './Google.svg';

const IMAGE_SIZE = 24;

const SOCIAL_LOGINS = [
  {
    name: 'Google',
    icon: GoogleIcon,
  },
  {
    name: 'Apple',
    icon: AppleIcon,
  },
];

interface SocialSignInProps {
  className?: string;
}

export default function SocialSignIn({ className }: SocialSignInProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-4', className)}>
      {SOCIAL_LOGINS.map(({ name, icon }) => (
        <Button key={name} variant="outline" className="gap-2">
          <Image src={icon} alt={name} width={IMAGE_SIZE} height={IMAGE_SIZE} />
          {name}
        </Button>
      ))}
    </div>
  );
}
