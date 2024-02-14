import Link from 'next/link';

import { User } from '@supabase/supabase-js';
import {
  CircleUserRoundIcon,
  HeartIcon,
  LogOutIcon,
  UserIcon,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Signout from './signout';

interface UserDropDownProps {
  user: User;
}

export default function UserDropDown({ user }: UserDropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CircleUserRoundIcon
          size={28}
          strokeWidth={1.25}
          className="cursor-pointer stroke-muted-foreground"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          Hi {user.user_metadata.firstName}!
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/account">
            <DropdownMenuItem className="cursor-pointer">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Account</span>
            </DropdownMenuItem>
          </Link>

          <Link href="/wishlist">
            <DropdownMenuItem>
              <HeartIcon className="mr-2 h-4 w-4" />
              <span>Wishlist</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Signout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
