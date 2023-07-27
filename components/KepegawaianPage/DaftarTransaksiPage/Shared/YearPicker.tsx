import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import React from 'react';

import { classNames } from '../../../../utils/Components';
import { generateYearList } from '../../../../utils/DateUtil';

const dateToday = new Date();
interface YearProps {
  onChange: (date: Date) => void;
  selectedMonth?: number;
}

function YearPicker(props: YearProps) {
  const [selectedYear, setSelectedYear] = React.useState(dateToday.getFullYear());
  const dataSet = generateYearList();

  React.useEffect(() => {
    props.onChange(new Date(selectedYear, props.selectedMonth ?? dateToday?.getMonth()));
  }, [selectedYear, props.selectedMonth]);

  const handleChangeYear = (year: number) => () => {
    setSelectedYear(year);
  };

  return (
    <>
      <h1 className="text-lg font-semibold text-gray-900">
        <Menu as="div" className="absolute">
          <Menu.Button
            type="button"
            className="flex w-[200px] items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <span className="w-full">{selectedYear}</span>
            <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>

          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-3 w-32 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {dataSet.map((each, index) => (
                  <Menu.Item key={`year-${index}`}>
                    {({ active }) => (
                      <a
                        onClick={handleChangeYear(each)}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-2 py-2 text-center text-sm'
                        )}
                      >
                        {each}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </h1>
    </>
  );
}

export default YearPicker;
