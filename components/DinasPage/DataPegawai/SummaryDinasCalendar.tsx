import { format } from 'date-fns';
import React from 'react';

import { KepegawaianAPI, UnitKerjaAPI } from '../../../constants/APIUrls';
import { CalendarData, GetCalendarReq } from '../../../types/api/RekapDinasAPI';
import { GetUnitKerjaData } from '../../../types/api/UnitKerjaAPI';
import { classNames } from '../../../utils/Components';
import { EventDate, generateDays } from '../../../utils/DateUtil';
import useCommonApi from '../../shared/hooks/useCommonApi';
import usePersonalData from '../../shared/hooks/usePersonalData';
import MonthPicker from './DatePicker';

interface UnitKerja {
  unit_kerja_id: number;
}

export default function SummaryDinasCalendar(props: UnitKerja) {
  const { unit_kerja_id } = props;
  const personalPegawai = usePersonalData();
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const [loaded, setLoaded] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  let endDateStr = '';
  if (selectedDate) {
    const nextMonth = selectedDate.getMonth() + 1;
    const endDate = new Date(selectedDate.getFullYear(), nextMonth, 0);
    endDateStr = format(endDate, 'yyyy-MM-dd');
  }

  const [filterState, setFilterState] = React.useState<GetCalendarReq>();

  const { data: kalendarData, mutate } = useCommonApi<GetCalendarReq, CalendarData[]>(
    KepegawaianAPI.GET_CALENDAR_PEGAWAI,
    {
      tgl_mulai: format(selectedDate || new Date(), 'yyyy-MM-dd'),
      tgl_selesai: endDateStr,
      ...filterState,
      unit_kerja_id: unit_kerja_id,
    },
    { method: 'get' }
  );

  const eventList = {} as Record<number, EventDate[]>;

  (kalendarData || [])
    .filter(each => !!each?.date)
    .forEach(each => {
      const key = Number(each.date.split('-')[2]);
      if (!eventList[key]) {
        eventList[key] = [];
      }

      eventList[key].push({
        id: each.dinas_id,
        color: 'blue',
        dateKey: each.date,
        datetime: each.date,
        name: 'Dinas',
        infoType: 'dinas',
        totalDinas: each.total_dinas,
      });
    });

  const handleClick = (event: EventDate) => () => {
    window.location.href = `?date=${event.dateKey}&tipe=summary`;
  };

  const { data: unitKerjaList } = useCommonApi<null, GetUnitKerjaData[]>(
    UnitKerjaAPI.GET_UNIT_KERJA_LIST_DIREKTORAT,
    null,
    { method: 'GET' }
  );

  const changeFilterState = (inputState: Partial<GetCalendarReq>) => {
    const newState = {
      ...filterState,
      ...inputState,
    };

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setFilterState(newState));
  };

  React.useEffect(() => {
    if (loaded) {
      mutate();
    }
    setLoaded(true);
  }, [filterState]);

  return (
    <div className="h-full lg:flex lg:flex-col">
      <div className="flex w-full flex-row gap-x-[16px] p-6">
        <div className="w-[202px] pb-2">
          <p className="mb-[4px] text-[14px] font-normal">Unit Kerja</p>
          <select
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm"
            onChange={e => {
              changeFilterState({ unit_kerja_id: e.target.value === '' ? undefined : Number(e.target.value) });
            }}
            disabled={!!personalPegawai?.unit_kerja_id}
          >
            <option value="">Semua</option>
            {(unitKerjaList || []).map((item, index) => (
              <option
                key={`options-${index}`}
                value={item?.unit_kerja_id}
                selected={personalPegawai?.unit_kerja_id === Number(item?.unit_kerja_id) ? true : false}
              >
                {item?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[202px] pb-2">
          <p className="mb-[4px] text-[14px] font-normal">Jenis Dinas</p>
          <select
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            onChange={e => {
              changeFilterState({ dinas_id: e.target.value === '' ? undefined : Number(e.target.value) });
            }}
          >
            <option value="">Semua</option>
            <option value="1">Dinas SPPD</option>
            <option value="2">Dinas Non SPPD</option>
          </select>
        </div>
        <div className="relative z-10 w-[202px] pb-2">
          <p className="mb-[5px] text-sm font-medium text-gray-700"> Bulan</p>
          <MonthPicker type="date" onChange={date => setSelectedDate(date)} />
        </div>
      </div>

      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="bg-white py-2 text-red-500">
            M<span className="sr-only sm:not-sr-only">inggu</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">enin</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">elasa</span>
          </div>
          <div className="bg-white py-2">
            R<span className="sr-only sm:not-sr-only">abu</span>
          </div>
          <div className="bg-white py-2">
            K<span className="sr-only sm:not-sr-only">amis</span>
          </div>
          <div className="bg-white py-2">
            J<span className="sr-only sm:not-sr-only">umat</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">abtu</span>
          </div>
        </div>
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className=" grid w-full grid-cols-7 grid-rows-6 gap-px">
            {generateDays(selectedDate?.getFullYear() || 2000, selectedDate?.getMonth() || 0, eventList).map(
              (day, index) => (
                <div
                  key={`day.date${index}`}
                  className={classNames(
                    day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500',
                    'relative h-[80px] py-2 px-3'
                  )}
                >
                  <time
                    dateTime={day.date}
                    className={
                      day.isToday
                        ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
                        : index % 7 === 0 && day.isCurrentMonth
                        ? 'text-red-500'
                        : ''
                    }
                  >
                    {(day.date.split('-').pop() || '').replace(/^0/, '')}
                  </time>
                  {day.events.length > 0 && (
                    <ol className="mt-2">
                      {day.events.slice(0, 1).map((event, index) => (
                        <li key={`event.id${index}`}>
                          <span
                            onClick={handleClick(event)}
                            className={`group flex rounded-lg px-2 bg-${event.color}-50 hover:bg-${event.color}-100 cursor-pointer`}
                          >
                            <p className={`flex-auto truncate text-xs text-${event.color}-700`}>
                              {event.totalDinas} {event.name}
                            </p>
                            <time
                              dateTime={event.datetime}
                              className={`ml-3 hidden flex-none xl:block text-${event.color}-500 group-hover:text-${event.color}-700`}
                            >
                              {event.time}
                            </time>
                          </span>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              )
            )}

            {/* precall tailwind class */}
            <div className="hidden">
              <div className="bg-blue-50 text-blue-500 hover:bg-blue-100 group-hover:text-blue-700" />
              <div className="bg-gray-50 text-gray-500 hover:bg-gray-100 group-hover:text-gray-700" />
              <div className="bg-green-50 text-green-500 hover:bg-green-100 group-hover:text-green-700" />
              <div className="bg-orange-50 text-orange-500 hover:bg-orange-100 group-hover:text-orange-700" />
              <div className="bg-red-50 text-red-500 hover:bg-red-100 group-hover:text-red-700" />
              <div className="bg-yellow-50 text-yellow-500 hover:bg-yellow-100 group-hover:text-yellow-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
