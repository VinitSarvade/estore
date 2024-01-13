import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { twc } from 'react-twc';

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@estore/utils/cn';

const PrimitiveRoot = twc(
  NavigationMenuPrimitive.Root,
)`relative z-10 flex w-full flex-1 items-center justify-center`;

const NavigationMenu = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Root>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <PrimitiveRoot ref={ref} className={className} {...props}>
    {children}
    <NavigationMenuViewport />
  </PrimitiveRoot>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationSubMenu = NavigationMenuPrimitive.Sub;

const NavigationMenuList = twc(
  NavigationMenuPrimitive.List,
)`group flex flex-1 list-none items-center justify-center space-x-1 max-w-full`;
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = twc(NavigationMenuPrimitive.Item)``;
NavigationMenuItem.displayName = NavigationMenuPrimitive.Item.displayName;

const navigationMenuTriggerStyle = cva(
  'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50',
);

const PrimitiveTrigger = twc(NavigationMenuPrimitive.Trigger)`${cn(
  navigationMenuTriggerStyle(),
  'group capitalize',
)}`;

const NavigationMenuTrigger = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <PrimitiveTrigger ref={ref} className={cn('px-2', className)} {...props}>
    {children}&nbsp;
    <ChevronDownIcon
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </PrimitiveTrigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = twc(
  NavigationMenuPrimitive.Content,
)`left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto`;
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = twc(NavigationMenuPrimitive.Link)`px-2 capitalize`;

const PrimitiveViewPort = twc(
  NavigationMenuPrimitive.Viewport,
)`origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]`;

const NavigationMenuViewport = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className="absolute left-0 top-full flex justify-center">
    <PrimitiveViewPort ref={ref} className={className} {...props} />
  </div>
));
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const PrimitiveIndicator = twc(
  NavigationMenuPrimitive.Indicator,
)`top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in`;

const NavigationMenuIndicator = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <PrimitiveIndicator ref={ref} className={className} {...props}>
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </PrimitiveIndicator>
));
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

const Anchor = twc.a`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground`;

const NavigationMenuListItem = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Anchor ref={ref} className={className} {...props}>
          <div className="text-sm capitalize font-medium leading-none">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Anchor>
      </NavigationMenuLink>
    </li>
  );
});
NavigationMenuListItem.displayName = 'NavigationMenuListItem';

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationSubMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  NavigationMenuListItem,
};
