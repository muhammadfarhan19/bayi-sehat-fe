import { filterMenu } from '../../utils/Components';
import HeaderDesktop from './HeaderDesktop';
import { Navigation } from './NavigationProps';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const navigation: Navigation[] = filterMenu();

const userNavigation: Navigation[] = [
  { name: 'Biodata', href: '#' },
  { name: 'Kalender Kegiatan', href: '#' },
  { name: 'Log Out', href: '/logout' },
];

export default function MainLayout({ children }) {
  console.log(navigation);
  return (
    <>
      <div className="min-h-full">
        <HeaderDesktop navigation={navigation} user={user} userNavigation={userNavigation} />

        <main className="-mt-24 pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
}
