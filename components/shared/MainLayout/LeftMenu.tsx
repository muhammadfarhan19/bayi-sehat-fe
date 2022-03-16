import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon, SearchIcon } from '@heroicons/react/outline';
import * as React from 'react';

import { classNames } from '../../../utils/Components';
import { useAuthorizedMenuContext } from '../context/AuthorizedMenuContext';
import { Navigation } from './NavigationProps';

export default function LeftMenu() {
  const navigation = useAuthorizedMenuContext();
  const [filteredNavigation, setFilteredNavigation] = React.useState(() => navigation);

  React.useEffect(() => {
    setFilteredNavigation(navigation);
  }, [navigation]);

  const handleFilterMenu = () => {
    let timeout: NodeJS.Timeout;
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const filterText = event.target.value;
      if (!timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        if (filterText) {
          const immutableNav = [...navigation];
          const filterNav = (navigationList: Navigation[]) =>
            navigationList.reduce<Navigation[]>((res, each) => {
              if (each.childMenu && Array.isArray(each.childMenu)) {
                const eachNav = { ...each };
                eachNav.childMenu = filterNav(eachNav.childMenu);
                if (eachNav.childMenu.length > 0) {
                  res.push(eachNav);
                }
              } else if (each.name.toLowerCase().includes(filterText.toLowerCase().trim())) {
                res.push(each);
              }
              return res;
            }, []);

          setFilteredNavigation(filterNav(immutableNav));
        } else {
          setFilteredNavigation(navigation);
        }
      }, 500);
    };
  };

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
              onChange={handleFilterMenu()}
            />
          </div>
        </div>
      </form>

      <nav className="flex-1 rounded-md bg-white" aria-label="Sidebar">
        {filteredNavigation.map((item, index) =>
          !item.childMenu ? (
            <div key={index}>
              <a
                href={item.href}
                className={classNames(
                  item.current
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  index === 0 ? 'rounded-t-md' : '',
                  index === navigation.length - 1 ? 'rounded-b-md' : '',
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
                  <Disclosure.Button
                    className={classNames(
                      index === 0 ? 'rounded-t-md' : '',
                      index === navigation.length - 1 ? 'rounded-b-md' : '',
                      'group flex w-full items-center justify-between border-b-2 border-b-gray-100 bg-white py-3 pl-7 pr-2 text-left text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <span>{item.name}</span>
                    <ChevronRightIcon
                      className={classNames(
                        open ? 'rotate-90 text-indigo-700' : 'text-indigo-600',
                        'mr-2 h-4 w-4 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-indigo-700'
                      )}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel>
                    {item.childMenu.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={subItem.href}
                        className={classNames(
                          subIndex === item.childMenu.length - 1 ? 'rounded-b-md' : '',
                          subItem.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex w-full items-center border-b-2 border-b-gray-100 py-3 pl-10 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        )}
                      >
                        {subItem.name}
                      </a>
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
