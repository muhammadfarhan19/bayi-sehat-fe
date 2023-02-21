import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const formatDate = (date: Date | number, formatString = 'dd-MMM-yyyy, HH:mm:ss') => {
  return format(date, formatString, { locale: id });
};

export const formatStringDate = (date: string | number, formatString = 'dd-MMM-yyyy, HH:mm:ss') => {
  try {
    return date ? format(new Date(date), formatString, { locale: id }) : '';
  } catch (error) {
    return '';
  }
};

export interface EventDate {
  id: number;
  color: string;
  name: string;
  time?: string;
  timeIn?: string;
  timeOut?: string;
  dateKey: string;
  datetime: string;
  totalDinas?: number;
  infoType: 'presensi' | 'dinas';
  listDinas?: string;
}

export const generateDays = (
  year: number,
  month: number,
  mapEvent?: Record<number, EventDate[]>
): {
  isToday?: boolean;
  date: string;
  isCurrentMonth?: boolean;
  events: EventDate[];
}[] => {
  const today = new Date();
  const prevDate = new Date(year, month, 0);
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);
  // Sunday = 0
  const firstDay = firstDate.getDay();
  const lastTotalLoop = 42 - lastDate.getDate() - firstDay;
  const dates = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    dates.push({
      date: prevDate.getFullYear() + '-' + (prevDate.getMonth() + 1) + '-' + (prevDate.getDate() - i),
      events: [],
    });
  }

  for (let i = 1; i <= lastDate.getDate(); i++) {
    dates.push({
      isToday:
        i === today.getDate() &&
        lastDate.getMonth() === today.getMonth() &&
        lastDate.getFullYear() === today.getFullYear(),
      date: prevDate.getFullYear() + '-' + (month + 1) + '-' + i,
      isCurrentMonth: true,
      events: mapEvent?.[i] || [],
    });
  }

  for (let i = 1; i <= lastTotalLoop; i++) {
    dates.push({
      date: prevDate.getFullYear() + '-' + (month + 2) + '-' + i,
      events: [],
    });
  }

  return dates;
};

export function yearMonthDuration(start: string, end: string) {
  const dateStart = new Date(start);
  const dateEnd = new Date(end);
  const diff = new Date(dateEnd.getTime() - dateStart.getTime());
  return [diff.getUTCFullYear() - 1970, diff.getUTCMonth()];
}

export const convertIndonesiaFormat = (date: string) => {
  if (date) {
    const bulan = [
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
    const arr = date.split('-');

    return arr[2].substring(0, 2) + ' ' + bulan[parseInt(arr[1]) - 1] + ' ' + arr[0];
  }
  return '-';
};

export const startEndDateString = (tgl_mulai: string, tgl_selesai: string) => {
  try {
    if (tgl_mulai === tgl_selesai) {
      return format(new Date(tgl_mulai), 'dd MMM yyyy', { locale: id });
    }

    const breakStart = tgl_mulai.split('-'),
      breakEnd = tgl_selesai.split('-');
    breakStart.pop();
    breakEnd.pop();

    const dateStartFormat = breakStart.join('') === breakEnd.join('') ? 'dd' : 'dd MMM yyyy';
    return [
      format(new Date(tgl_mulai), dateStartFormat, { locale: id }),
      format(new Date(tgl_selesai), 'dd MMM yyyy', { locale: id }),
    ].join(' - ');
  } catch (error) {
    console.error(error);
    return '';
  }
};

export function getFirstAndLastDaysOfYear(year: number): { start: Date; end: Date }[] {
  // Loop through each month of the year
  return Array.from({ length: 12 }, (_, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return {
      start: firstDay,
      end: lastDay,
    };
  });
}

export const handleCheckTime = (event?: string) => {
  if (event) {
    const emptyString = ' ';
    const dividerTime = ':';
    const dateString = event ? event : emptyString;
    const dateParts = dateString?.split(emptyString);
    const timeString = dateParts[1] ?? [];
    const timeParts = timeString.split(dividerTime);
    return timeParts[0] + ':' + timeParts[1];
  }
  return;
};
