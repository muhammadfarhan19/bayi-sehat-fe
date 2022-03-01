export interface User {
  name: string;
  email: string;
  imageUrl: string;
}

export type Navigation = {
  name: string;
  current?: boolean;
} & (
  | {
      href: string;
      childMenu?: never;
    }
  | {
      href?: never;
      childMenu: Navigation[];
    }
);

export interface NavigationProps {
  user: User;
  navigation: Navigation[];
  userNavigation: Navigation[];
}
