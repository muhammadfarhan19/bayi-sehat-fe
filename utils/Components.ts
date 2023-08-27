import React, { FC, ReactElement, ReactNode } from 'react';

import { Navigation } from '../components/shared/MainLayout/NavigationProps';
import { NavigationList } from '../constants/NavigationList';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function filterMenu(currentLocation: string, allowedMap?: Record<number, boolean>): Navigation[] {
  if (typeof window !== 'undefined') {
    const currentAppender = (listOfMenu: Navigation[], parent?: Navigation): Navigation[] => {
      const result = [];
      let parentUpdated = false;
      for (const iterator of listOfMenu) {
        if (iterator.href) {
          iterator.current = iterator.href === currentLocation;

          // CONDITIONAL SELECTED MENU
          if (!iterator.current && iterator.selectedHref && iterator.selectedHref.length) {
            iterator.current = iterator.selectedHref.includes(currentLocation);
          }
        } else if (iterator.childMenu && Array.isArray(iterator.childMenu)) {
          // Recursive check
          iterator.childMenu = currentAppender(iterator.childMenu, iterator);
        }

        // Also inject current to parent if exist
        if (parent && !parentUpdated) {
          parent.current = !!iterator.current;
          parentUpdated = parent.current;
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
  }
  return NavigationList;
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

/**
 *
 * @param value
 * @param children
 * @returns
 * @link [DOCS](https://react.dev/learn/conditional-rendering)
 */
export function ConditionalRendering(value: boolean, children: ReactNode) {
  if (value) {
    return children;
  }
  return null;
}

/**
 * Composable Readable of Nesting conditional Rendering of a Component
 */
interface SwitchProps {
  children: ReactNode;
}

interface CaseProps {
  children: ReactNode;
  condition: boolean;
}

interface DefaultProps {
  children: ReactNode;
}

const Switch: FC<SwitchProps> = ({ children }) => {
  let matchChild: ReactElement | null = null;
  let defaultCase: ReactElement | null = null;

  React.Children.forEach(children, child => {
    if (!matchChild && React.isValidElement(child) && child.type === Case) {
      const { condition } = child.props;
      const conditionResult = Boolean(condition);

      if (conditionResult) {
        matchChild = child;
      }
    } else if (!defaultCase && React.isValidElement(child) && child.type === Default) {
      defaultCase = child;
    }
  });

  return matchChild ?? defaultCase ?? null;
};

const Case: FC<CaseProps> = ({ children }) => {
  return children as ReactElement;
};

const Default: FC<DefaultProps> = ({ children }) => {
  return children as ReactElement;
};

export { Case, Default, Switch };
