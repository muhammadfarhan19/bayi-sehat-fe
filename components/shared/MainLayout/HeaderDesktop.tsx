import { Popover } from '@headlessui/react';
import { BellIcon, ChevronDownIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import * as React from 'react';

import HeaderMobile from './HeaderMobile';
import MenuDropdown from './MenuDropdown';
import { NavigationProps } from './NavigationProps';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function HeaderDesktop(props: NavigationProps) {
  const { navigation, user, userNavigation } = props;

  return (
    <>
      <Popover as="header" className="bg-indigo-600 pb-24">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="relative flex items-center justify-center py-5 lg:justify-between">
                {/* Logo */}
                <div className="absolute left-0 flex flex-shrink-0 items-center lg:static">
                  <a href="#">
                    <span className="sr-only">IntraDikti</span>
                    <img className="h-8 w-auto" src="/icon-192x192.png" alt="IntraDikti" />
                  </a>
                  <h1 className="ml-2 hidden text-xl tracking-wider text-white lg:block">Intra DIKTI</h1>
                </div>

                {/* Right section on desktop */}
                <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
                  <button
                    type="button"
                    className="flex-shrink-0 rounded-full p-1 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <MenuDropdown navigation={userNavigation}>
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                  </MenuDropdown>
                </div>

                {/* Menu button */}
                <div className="absolute right-0 flex-shrink-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
              </div>
              <div className="hidden border-t border-white border-opacity-20 py-5 lg:block">
                <div className="grid grid-cols-3 items-center gap-8">
                  <div className="col-span-2">
                    <nav className="flex space-x-4">
                      {navigation.map((item, index) =>
                        item.childMenu && Array.isArray(item.childMenu) ? (
                          <div key={index} className="relative flex">
                            <MenuDropdown navigation={item.childMenu} key={index} {...MenuDropdown.SimpleDesktopProps}>
                              {item.name} <ChevronDownIcon className="inline-block h-3 w-3" aria-hidden="true" />
                            </MenuDropdown>
                          </div>
                        ) : (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current ? 'text-white' : 'text-indigo-100',
                              'rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        )
                      )}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            <HeaderMobile {...props} />
          </>
        )}
      </Popover>
    </>
  );
}
