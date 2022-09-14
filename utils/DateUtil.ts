import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const formatDate = (date: Date | number, formatString = 'dd-MMM-yyyy, HH:mm:ss') => {
  return format(date, formatString, { locale: id });
};

export interface EventDate {
  id: number;
  color: string;
  name: string;
  time?: string;
  datetime: string;
  infoType: 'presensi' | 'dinas';
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
      ...(i === firstDate.getDate() ? { isToday: true } : {}),
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
  var dateStart = new Date(start);
  var dateEnd = new Date(end);
  var diff = new Date(dateEnd.getTime() - dateStart.getTime());
  return [diff.getUTCFullYear() - 1970, diff.getUTCMonth()];
}
