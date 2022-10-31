import { ChevronDownIcon } from '@heroicons/react/outline';

import { classNames } from '../../../utils/Components';
import MenuDropdown from './MenuDropdown';
import { NavigationProps } from './NavigationProps';

export default function HeaderMobile(props: NavigationProps) {
  const { navigation, expand } = props;

  return (
    <>
      <div className={classNames(expand ? 'block' : 'invisible', 'py-4 lg:hidden')}>
        <div className="flex flex-col px-2">
          {navigation.map(({ current, childMenu, name, href }, index) =>
            childMenu && Array.isArray(childMenu) ? (
              <MenuDropdown key={index} {...MenuDropdown.SimpleMobileProps} navigation={childMenu}>
                {name} <ChevronDownIcon className="inline-block h-3 w-3" aria-hidden="true" />
              </MenuDropdown>
            ) : (
              <a
                key={index}
                href={href}
                className={classNames(
                  current ? 'bg-opacity-10 text-white' : 'text-indigo-100',
                  'mx-auto my-1 rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10'
                )}
              >
                {name}
              </a>
            )
          )}
        </div>
      </div>
    </>
  );
}
