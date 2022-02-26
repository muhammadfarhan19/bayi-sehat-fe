export interface User {
  name: string;
  email: string;
  imageUrl: string;
}

export interface Navigation {
  name: string;
  href: string;
  current?: boolean;
  childMenu?: Navigation[];
}

export interface NavigationProps {
  user: User;
  navigation: Navigation[];
  userNavigation: Navigation[];
}
