import { Navigation } from '../components/shared/MainLayout/NavigationProps';
import { NavigationList } from '../constants/NavigationList';
import { getQueryString } from './URLUtils';

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
        } else if (iterator.childMenu && Array.isArray(iterator.childMenu)) {
          // Recursive check
          iterator.childMenu = currentAppender(iterator.childMenu, iterator);
        }

        // Also inject current to parent if exist
        if (parent && !parent.current && iterator.current) {
          parent.current = true;
        }

        // Check if authorize
        if (allowedMap && allowedMap[iterator.id]) {
          result.push(iterator);
        } else if (!allowedMap || !iterator.id) {
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

export const composeListDefaultValue = <T extends Array<any>>(
  list: T,
  valueField: keyof Flatten<T>,
  textField: keyof Flatten<T>,
  value: any
) => {
  if ((list || []).length) {
    const selectedValue = (list || [])?.filter(each => String(each[valueField]) === String(value))[0];
    return {
      text: selectedValue?.[textField],
      value: selectedValue?.[valueField],
    };
  }
};
