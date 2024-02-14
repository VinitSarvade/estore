import { Category } from '@prisma/client';

import NavbarLink from './navbar-link';
import './navbar.scss';

interface NavbarTabletProps {
  categories: Category[];
}

// const homeLink = { key: 'navbar-home', name: 'Home', tags: undefined };

export default function Navbar({ categories }: NavbarTabletProps) {
  const categoriesWithHome = [/* homeLink, */ ...categories];

  return (
    <nav className="navbar py-1" aria-label="main navigation">
      {categoriesWithHome.map(({ id, name, value }) => (
        <NavbarLink key={id} name={name} value={value} />
      ))}
    </nav>
  );
}
