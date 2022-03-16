import { Navigation } from '../components/shared/MainLayout/NavigationProps';
import { NavigationList } from '../constants/NavigationList';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function filterMenu(allowedMap?: Record<number, boolean>): Navigation[] {
  if (typeof window !== 'undefined') {
    const currentLocation = window.location.pathname;
    const currentAppender = (listOfMenu: Navigation[], parent?: Navigation): Navigation[] => {
      let result = [];
      for (const iterator of listOfMenu) {
        if (iterator.href && iterator.href === currentLocation) {
          iterator.current = true;
          // Also inject current to parent if exist
          if (parent && !parent.current) {
            parent.current = true;
          }
        } else if (iterator.childMenu && Array.isArray(iterator.childMenu)) {
          // Recursive check
          iterator.childMenu = currentAppender(iterator.childMenu, iterator);
        }

        // Check if authorize
        if (allowedMap && allowedMap[iterator.id]) {
          result.push(iterator);
        } else if (!allowedMap) {
          result.push(iterator);
        }
      }
      return result;
    };
    return currentAppender(NavigationList);
  } else {
    return NavigationList;
  }
}
