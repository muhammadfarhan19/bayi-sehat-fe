import { useRouter } from 'next/router';
import * as React from 'react';

import { UserNavigationList } from '../../../constants/NavigationList';
import { useAuthorizedMenuContext } from '../context/AuthorizedMenuContext';
import useTawkChat from '../hooks/useTawkChat';
import HeaderDesktop from './HeaderDesktop';
import MobileNavigation from './MobileNavigation';
import { Navigation } from './NavigationProps';

const user = {
  name: 'TU Dikti',
  email: 'SuperApps',
  imageUrl: '',
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const navigationContext = useAuthorizedMenuContext();
  const { pathname } = useRouter();
  const { handleShownChat } = useTawkChat();
  const navigation = navigationContext.map<Navigation>(each => {
    return {
      current: each.current,
      href: (each.childMenu?.[0].href || '') as string,
      id: each.id,
      name: each.name,
    };
  });

  React.useLayoutEffect(() => {
    handleShownChat();
  }, [pathname]);

  return (
    <>
      <div className="min-h-full">
        <HeaderDesktop navigation={navigation} user={user} userNavigation={UserNavigationList} />
        <main className="pb-8 lg:-mt-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">{children}</div>
        </main>

        <div className="sticky bottom-[69px] z-10 lg:hidden" onClick={() => setOpen(!open)}>
          <button className="ml-[32px] inline-flex items-center justify-center rounded-md bg-transparent text-indigo-200 drop-shadow-lg hover:bg-white hover:bg-opacity-10 hover:text-white">
            <span className="sr-only">Open main menu</span>
            <img src="/menu.svg" className="block h-[40px] w-[40px] text-blue-600" aria-hidden="true" />
          </button>
        </div>

        <MobileNavigation onClose={() => setOpen(false)} expand={open} />
      </div>
    </>
  );
}
