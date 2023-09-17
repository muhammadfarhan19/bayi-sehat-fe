import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon, SearchIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import * as React from 'react';

import { Case, classNames, Switch } from '../../../utils/Components';
import { useAuthorizedMenuContext } from '../context/AuthorizedMenuContext';
import { Navigation } from './NavigationProps';
import ShiftWidget  from './ShiftWidget';

interface LeftMenuProps {
  includeShiftWidget?: boolean;
}

export default function LeftMenu(props: LeftMenuProps) {
  const { includeShiftWidget = false } = props;
  const debounce = React.useRef<number>();
  const navigationContext = useAuthorizedMenuContext();
  const navigation = React.useCallback<() => Navigation[]>(() => {
    for (let i = 0; i < navigationContext.length; i++) {
      if (navigationContext[i].current) {
        return navigationContext[i].childMenu as Navigation[];
      }
    }
    return navigationContext?.[0]?.childMenu as Navigation[];
  }, [navigationContext]);

  const [filteredNavigation, setFilteredNavigation] = React.useState(navigation);

  React.useEffect(() => {
    setFilteredNavigation(navigation());
  }, [navigationContext]);

  const handleFilterMenu = () => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const filterText = event.target.value;
      if (!debounce.current) {
        clearTimeout(debounce.current);
      }
      debounce.current = window.setTimeout(() => {
        if (filterText) {
          const immutableNav = navigation();
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
        <div className="hidden min-w-0 flex-1 lg:block">
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
      <Switch>
        <Case condition={includeShiftWidget}>
          <ShiftWidget />
        </Case>
      </Switch>
      <nav className="hidden flex-1 rounded-md bg-white lg:block" aria-label="Sidebar">
        {(filteredNavigation || []).map((item, index) =>
          !item.childMenu ? (
            <div key={index}>
              <Link href={item.href}>
                <a
                  className={classNames(
                    item.current
                      ? 'bg-gray-100 text-gray-900'
                      : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    index === 0 ? 'rounded-t-md' : '',
                    index === filteredNavigation.length - 1 ? 'rounded-b-md' : '',
                    'group flex w-full items-center border-b-2 border-b-gray-100 py-3 pl-7 pr-2 text-sm font-medium'
                  )}
                >
                  {item.name}
                </a>
              </Link>
            </div>
          ) : (
            <Disclosure defaultOpen={true} as="div" key={item.name}>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={classNames(
                      index === 0 ? 'rounded-t-md' : '',
                      index === filteredNavigation.length - 1 ? 'rounded-b-md' : '',
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
                      <Link key={subIndex} href={subItem?.href || '/'}>
                        <a
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
                      </Link>
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
