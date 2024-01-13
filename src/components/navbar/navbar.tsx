import { Category } from '@estore/types/category';

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
      {categoriesWithHome.map(({ key, name, tags }) => (
        <NavbarLink key={key} name={name} tags={tags} />
      ))}
    </nav>
  );
}
