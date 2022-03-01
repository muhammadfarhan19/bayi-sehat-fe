import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { classNames } from '../../utils/Components';

export default function ModuleNavigation({ menu }) {
  const router = useRouter();
  const data = menu;

  return (
    <div className="grid grid-cols-1 gap-4 transition duration-500 ease-in-out lg:col-span-1">
      <section aria-labelledby="section-1-title">
        <div className="mb-3 rounded-lg border-b border-gray-200 bg-white shadow">
          <nav className="space-y-1" aria-label="Sidebar">
            {data.map((item, index) =>
              !item.children ? (
                <div key={index} className="transition duration-500 ease-in">
                  <Link href={item.href}>
                    <a
                      className={classNames(
                        router.asPath == item.href
                          ? 'border-2 border-gray-50  bg-gray-50 py-3'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex transform items-center  rounded-md border-2 border-white px-3 py-3 text-sm font-medium transition duration-300 ease-in-out active:ring-0'
                      )}
                    >
                      {item.name}
                    </a>
                  </Link>
                </div>
              ) : (
                <Disclosure as="div" key={item.name} className="space-y-1">
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={classNames(
                          router.asPath == item.href
                            ? 'bg-gray-100 py-3 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex w-full transform items-center rounded-md px-3 py-3 text-sm font-medium transition duration-300 ease-in-out focus:bg-gray-50 focus:outline-none'
                        )}
                      >
                        {item.name}
                        <ChevronRightIcon
                          className={classNames(
                            open ? 'rotate-90 text-gray-400' : 'text-gray-300',
                            'ml-auto h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400'
                          )}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="space-y-1">
                        {item.children.map(subItem => (
                          <Link href={subItem.href}>
                            <a
                              key={subItem.name}
                              className="group flex w-full items-center rounded-md py-3 pl-10 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 "
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
      </section>
    </div>
  );
}
