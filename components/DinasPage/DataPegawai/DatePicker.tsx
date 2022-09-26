import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import * as React from 'react';

import { classNames } from '../../../utils/Components';

const dateToday = new Date();
const months = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

interface Props {
  onChange: (date: Date) => void;
}

function DatePicker(props: Props) {
  const [selectedYear, setSelectedYear] = React.useState(dateToday.getFullYear());
  const [selectedMonth, setSelectedMonth] = React.useState(dateToday.getMonth());

  React.useEffect(() => {
    props.onChange(new Date(selectedYear, selectedMonth));
  }, [selectedYear, selectedMonth]);

  const handleChangeYear = (increment: number) => () => {
    setSelectedYear(selectedYear + increment);
  };

  const handleChangeMonth = (index: number) => () => {
    setSelectedMonth(index);
  };

  const handleNextPrevMonth = (increment: number) => {
    let nextMonth = selectedMonth + increment;
    if (nextMonth >= 12 || nextMonth < 0) {
      setSelectedYear(Number(selectedYear) + (nextMonth >= 12 ? 1 : -1));
      nextMonth = nextMonth >= 12 ? 0 : 11;
    }
    setSelectedMonth(nextMonth);
  };

  return (
    <>
      <h1 className="text-lg font-semibold text-gray-900">
        <Menu as="div" className="relative">
          <Menu.Button
            type="button"
            className="flex w-[200px] items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <span className="w-full">{`${months[selectedMonth]} ${selectedYear}`}</span>
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
            <Menu.Items className="absolute right-0 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="flex  w-full items-center rounded-md shadow-sm md:items-stretch">
                <button
                  onClick={handleChangeYear(-1)}
                  className="flex items-center justify-center rounded-l-md bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
                >
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  disabled
                  className="flex flex-1 flex-row items-center bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
                >
                  {selectedYear}
                </button>
                <button
                  onClick={handleChangeYear(1)}
                  className="flex items-center justify-center rounded-r-md bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
                >
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div className="py-1">
                {months.map((each, index) => (
                  <Menu.Item key={`month-${index}`}>
                    {({ active }) => (
                      <a
                        onClick={handleChangeMonth(index)}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
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
      <div className="flex items-center">
        <div className="flex items-center rounded-md shadow-sm md:items-stretch">
          <button
            onClick={() => handleNextPrevMonth(-1)}
            className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            onClick={() => handleNextPrevMonth(1)}
            className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
          >
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
}

export default DatePicker;
