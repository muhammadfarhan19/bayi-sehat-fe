import { Menu } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import * as React from 'react';

const dateToday = new Date();

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
        <Menu
          as="div"
          className="relative w-[150px] items-center justify-center rounded-md border bg-white text-center text-sm"
        >
          <div className="flex  w-full items-center rounded-md shadow-sm md:items-stretch">
            <button
              onClick={handleChangeYear(-1)}
              className="flex items-center justify-center rounded-l-md bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="flex w-full items-center justify-center">{`${selectedYear}`}</span>
            <button
              onClick={handleChangeYear(1)}
              className="flex items-center justify-center rounded-r-md bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </Menu>
      </h1>
      <div className="flex hidden items-center">
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
