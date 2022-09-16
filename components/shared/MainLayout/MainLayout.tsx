import * as React from 'react';

import { UserNavigationList } from '../../../constants/NavigationList';
import { useAuthorizedMenuContext } from '../context/AuthorizedMenuContext';
import HeaderDesktop from './HeaderDesktop';
import { Navigation } from './NavigationProps';

const user = {
  name: 'TU Dikti',
  email: 'SuperApps',
  imageUrl: '',
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const navigationContext = useAuthorizedMenuContext();
  const navigation = navigationContext.map<Navigation>(each => {
    return {
      current: each.current,
      href: (each.childMenu?.[0].href || '') as string,
      id: each.id,
      name: each.name,
    };
  });

  return (
    <>
      <div className="min-h-full">
        <HeaderDesktop navigation={navigation} user={user} userNavigation={UserNavigationList} />
        <main className="-mt-24 pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
}
