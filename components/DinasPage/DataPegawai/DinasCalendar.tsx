import { format } from 'date-fns';
import React from 'react';

import { KepegawaianAPI } from '../../../constants/APIUrls';
import {
  Dinas,
  DinasPegawaiKalenderData,
  GetDinasPegawaiKalenderReq,
  Presensi,
} from '../../../types/api/KepegawaianAPI';
import { classNames } from '../../../utils/Components';
import { EventDate, generateDays } from '../../../utils/DateUtil';
import useCommonApi from '../../shared/hooks/useCommonApi';
import usePersonalData from '../../shared/hooks/usePersonalData';
import MonthPicker from './DatePicker';
import ModalEventInfo, { MapEventColor } from './ModalEventInfo';
import ModalPresensiInfo, { MapPresensiColorText } from './ModalPresensiInfo';

export default function DinasCalendar() {
  const personalPegawai = usePersonalData();
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [selectedPresensi, setSelectedPresensi] = React.useState<Presensi>();
  const [selectedDinas, setSelectedDinas] = React.useState<Dinas[]>();

  let endDateStr = '';
  if (selectedDate) {
    const nextMonth = selectedDate.getMonth() + 1;
    const endDate = new Date(selectedDate.getFullYear(), nextMonth, 0);
    endDateStr = format(endDate, 'yyyy-MM-dd');
  }

  const { data: kalendarData } = useCommonApi<GetDinasPegawaiKalenderReq, DinasPegawaiKalenderData>(
    KepegawaianAPI.GET_DINAS_PEGAWAI_KALENDER_V2,
    {
      pegawai_id: personalPegawai?.pegawai_id || 0,
      tgl_mulai: format(selectedDate || new Date(), 'yyyy-MM-dd'),
      tgl_selesai: endDateStr,
    },
    { method: 'get' },
    { skipCall: !selectedDate || !personalPegawai?.pegawai_id }
  );

  const eventList = {} as Record<number, EventDate[]>;

  (kalendarData?.list_presensi || [])
    .filter(each => !!each?.date)
    .forEach(each => {
      const key = Number(each.date.split('-')[2]);
      if (!eventList[key]) {
        eventList[key] = [];
      }

      if (each.list_dinas && each.list_dinas.length) {
        (each.list_dinas || []).forEach(item => {
          const dateTime = item.tgl_mulai.split('-').slice(0, 1);
          dateTime.push(String(key));
          eventList[key].push({
            id: item.dinas_id,
            color: MapEventColor[item.jenis_dinas.toUpperCase() as keyof typeof MapEventColor] || 'blue',
            dateKey: each.date,
            datetime: dateTime.join('-'),
            name: item.jenis_dinas,
            infoType: 'dinas',
          });
        });
        return;
      }

      eventList[key].push({
        id: each.presensi_id,
        color: String(MapPresensiColorText[each.status as keyof typeof MapPresensiColorText]?.[0]) || 'gray',
        dateKey: each.date,
        datetime: each.date,
        name: 'Presensi',
        infoType: 'presensi',
      });
    });

  const handleClick = (event: EventDate) => () => {
    if (event.infoType === 'presensi') {
      setSelectedPresensi((kalendarData?.list_presensi || []).filter(each => each.presensi_id === event.id)?.[0]);
    } else if (event.infoType === 'dinas') {
      setSelectedDinas(
        (kalendarData?.list_presensi || []).filter(each => each.date === event.dateKey)?.[0]?.list_dinas || []
      );
    }
  };

  return (
    <div className="h-full lg:flex lg:flex-col">
      <header className="relative z-10 flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none">
        <MonthPicker onChange={date => setSelectedDate(date)} />
      </header>
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
                            <p className={`flex-auto truncate text-xs text-${event.color}-700`}>{event.name}</p>
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

            <ModalPresensiInfo
              open={!!selectedPresensi}
              toggleOpen={(open: boolean) => setSelectedPresensi(!open ? undefined : selectedPresensi)}
              info={selectedPresensi}
            />

            <ModalEventInfo
              open={!!selectedDinas}
              toggleOpen={(open: boolean) => setSelectedDinas(!open ? undefined : selectedDinas)}
              infos={selectedDinas}
            />

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
