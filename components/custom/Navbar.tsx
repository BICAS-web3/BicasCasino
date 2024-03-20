'use client'
import Link from 'next/link'

import { ThemeToggle } from '@/components/custom/ThemeToggle'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'

const menu = ['Home', 'Posts', '404 Page']

const Navbar = () => {
  return (
    <header className='bg-white dark:bg-neutral-950 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto flex items-center justify-between py-2 px-4'>
        <Link className='font-bold text-lg' href={'/'}>
          Next.js
        </Link>
        <NavigationMenu>
          <NavigationMenuList className='gap-2'>
            {menu.map((menuItem, index) => (
              <NavigationMenuItem key={`menu-${menuItem}_${index}`}>
                <Link
                  href={`/${
                    menuItem.toLocaleLowerCase() === 'home'
                      ? ''
                      : menuItem.split(' ').join('_').toLocaleLowerCase()
                  }`}
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), 'font-medium')}
                  >
                    {menuItem}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}

            <NavigationMenuItem>
              <ThemeToggle />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}
export default Navbar
