import { Category } from '@estore/types/category';

// import NavbarLG from './lg/navbar.lg';
import NavbarMD from './md/navbar.md';
import NavbarSM from './sm/navbar.sm';

export interface NavbarProps {
  categories: Category[];
}

export function Navbar({ categories }: NavbarProps) {
  return (
    <>
      {/* <div className="hidden lg:block">
        <NavbarLG categories={categories} />
      </div> */}
      <div className="hidden md:block">
        <NavbarMD categories={categories} />
      </div>
      <div className="md:hidden">
        <NavbarSM />
      </div>
    </>
  );
}
