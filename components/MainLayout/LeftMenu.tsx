import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon, SearchIcon } from '@heroicons/react/outline';
import React from 'react';

import { classNames } from '../../utils/Components';
import { Navigation } from './NavigationProps';

function LeftMenu({ navigation = [] }: { navigation: Navigation[] }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <form className="flex" action="#">
        <div className="min-w-0 flex-1">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon className="h-5 w-5 text-indigo-400" aria-hidden="true" />
            </div>
            <input
              type="search"
              name="search"
              id="search"
              className="block w-full rounded-md border-indigo-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Search"
            />
          </div>
        </div>
      </form>

      <nav className="flex-1 bg-white" aria-label="Sidebar">
        {navigation.map((item, index) =>
          !item.childMenu ? (
            <div key={index}>
              <a
                href={item.href}
                className={classNames(
                  item.current
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex w-full items-center border-b-2 border-b-gray-100 py-3 pl-7 pr-2 text-sm font-medium'
                )}
              >
                {item.name}
              </a>
            </div>
          ) : (
            <Disclosure defaultOpen={item.current} as="div" key={item.name}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="group flex w-full items-center justify-between border-b-2 border-b-gray-100 bg-white py-3 pl-7 pr-2 text-left text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                    <span>{item.name}</span>
                    <ChevronRightIcon
                      className={classNames(
                        open ? 'rotate-90 text-indigo-700' : 'text-indigo-600',
                        'mr-2 h-4 w-4 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-indigo-700'
                      )}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel>
                    {item.childMenu.map((subItem, index) => (
                      <Disclosure.Button
                        key={index}
                        as="a"
                        href={subItem.href}
                        className={classNames(
                          subItem.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex w-full items-center border-b-2 border-b-gray-100 py-3 pl-10 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        )}
                      >
                        {subItem.name}
                      </Disclosure.Button>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          )
        )}
      </nav>
    </div>
  );
}

export default LeftMenu;
