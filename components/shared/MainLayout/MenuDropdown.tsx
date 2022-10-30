import { Menu, Transition } from '@headlessui/react';
import { ElementType, Fragment, ReactNode } from 'react';
import { useDispatch } from 'react-redux';

import { setShowProfPic } from '../../../action/CommonAction';
import { classNames } from '../../../utils/Components';
import { Navigation } from './NavigationProps';

interface MenuDropdownProps {
  children: ReactNode;
  menuAs?: ElementType<unknown>;
  menuClassName?: string;
  buttonAs?: ElementType;
  buttonClassName?: string;
  navigation: Navigation[];
  position?: string;
}

export default function MenuDropdown(props: MenuDropdownProps) {
  const {
    children,
    menuAs = 'div',
    menuClassName = 'relative lg:ml-4 flex-shrink-0 my-auto',
    buttonAs = 'div',
    buttonClassName = 'relative lg:ml-4 flex-shrink-0 cursor-pointer',
    navigation,
    position = '-right-2',
  } = props;
  const dispatch = useDispatch();

  const handleCustomMenuClick = (itemName: string) => () => {
    if (itemName === 'Ubah Foto Profil') {
      dispatch(setShowProfPic(true));
    }
  };

  return (
    <Menu as={menuAs} {...(menuClassName ? { className: menuClassName } : {})}>
      <Menu.Button as={buttonAs} className={buttonClassName}>
        {children}
      </Menu.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute ${position} z-40 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          {navigation.map(item => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <a
                  href={item.href}
                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                  {...(item.href === '#' ? { onClick: handleCustomMenuClick(item.name) } : {})}
                >
                  {item.name}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

MenuDropdown.SimpleMobileProps = {
  menuAs: Fragment,
  menuClassName: null,
  buttonAs: 'a',
  buttonClassName:
    'block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800 cursor-pointer',
  position: '',
} as unknown as Partial<MenuDropdownProps>;

MenuDropdown.SimpleDesktopProps = {
  menuAs: Fragment,
  menuClassName: null,
  buttonAs: 'a',
  buttonClassName:
    'rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10 text-indigo-100 cursor-pointer',
  position: 'top-8',
} as unknown as Partial<MenuDropdownProps>;
