import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { ChevronRightIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React, { Fragment } from 'react';

import { classNames } from '../../../utils/Components';
import { useAuthorizedMenuContext } from '../context/AuthorizedMenuContext';
import { Navigation } from './NavigationProps';

interface NavigationProps {
  expand: boolean;
  onClose: () => void;
}

export default function MobileNavigation(props: NavigationProps) {
  const { expand, onClose } = props;
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

  return (
    <Transition.Root show={expand} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed bottom-0 top-[4rem] left-0 flex max-w-full pr-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <div className="ml-auto flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={onClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <nav className="block flex-1 rounded-md bg-white" aria-label="Sidebar">
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
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
