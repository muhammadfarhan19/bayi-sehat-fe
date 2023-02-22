export interface User {
  name: string;
  email: string;
  imageUrl: string;
}

export type Navigation = {
  id: number;
  name: string;
  selectedHref?: string[];
  current?: boolean;
  accessId?: number;
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
  expand?: boolean;
  user: User;
  navigation: Navigation[];
  userNavigation: Navigation[];
}
