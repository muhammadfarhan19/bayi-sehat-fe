import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

import { classNames } from '../../../utils/Components';
import { generateDays } from '../../../utils/DateUtil';
import MonthPicker from './MonthPicker';

export default function DinasCalendar() {
  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <header className="relative z-20 flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none">
        <h1 className="text-lg font-semibold text-gray-900">
          <MonthPicker />
        </h1>
        <div className="flex items-center">
          <div className="flex items-center rounded-md shadow-sm md:items-stretch">
            <button
              type="button"
              className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="bg-white py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="bg-white py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="bg-white py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
        </div>
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {generateDays(2022, 5).map(day => (
              <div
                key={day.date}
                className={classNames(
                  day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500',
                  'relative py-2 px-3'
                )}
              >
                <time
                  dateTime={day.date}
                  className={
                    day.isToday
                      ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
                      : undefined
                  }
                >
                  {(day.date.split('-').pop() || '').replace(/^0/, '')}
                </time>
                {day.events.length > 0 && (
                  <ol className="mt-2">
                    {day.events.slice(0, 2).map(event => (
                      <li key={event.id}>
                        <a
                          href={event.href}
                          className={classNames(
                            'group flex rounded-lg px-2',
                            `bg-${event.color}-50 hover:bg-${event.color}-100`
                          )}
                        >
                          <p className={classNames('flex-auto truncate font-semibold', `text-${event.color}-700`)}>
                            {event.name}
                          </p>
                          <time
                            dateTime={event.datetime}
                            className={classNames(
                              'ml-3 hidden flex-none xl:block',
                              `text-${event.color}-500 group-hover:text-${event.color}-700`
                            )}
                          >
                            {event.time}
                          </time>
                        </a>
                      </li>
                    ))}
                    {day.events.length > 2 && <li className="text-gray-500">+ {day.events.length - 2} more</li>}
                  </ol>
                )}
              </div>
            ))}

            {/* precall tailwind class */}
            <div className="hidden">
              <div className="bg-amber-500 text-amber-500" />
              <div className="bg-indigo-500 text-indigo-500" />
              <div className="bg-pink-500 text-pink-500" />
              <div className="bg-rose-500 text-rose-500" />
              <div className="bg-slate-500 text-slate-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
