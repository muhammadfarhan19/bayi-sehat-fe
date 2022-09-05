import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const formatDate = (date: Date | number, formatString = 'dd-MMM-yyyy, HH:mm:ss') => {
  return format(date, formatString, { locale: id });
};

export const generateDays = (
  year: number,
  month: number
): {
  isToday?: boolean;
  date: string;
  isCurrentMonth?: boolean;
  events: { id: number; color: string; name: string; time: string; datetime: string; href: string }[];
}[] => {
  const today = new Date();
  const prevDate = new Date(year, month, 0);
  const lastDate = new Date(year, month + 1, 0);
  // Sunday = 0
  const firstDay = lastDate.getDay();
  const firstTotalLoop = 6 - firstDay;
  const lastTotalLoop = 42 - lastDate.getDate() - firstTotalLoop;
  const dates = [];

  for (let i = 0; i < firstTotalLoop; i++) {
    dates.push({
      date: prevDate.getFullYear() + '-' + (prevDate.getMonth() + 1) + '-' + (prevDate.getDate() - i),
      events: [],
    });
  }

  for (let i = 1; i <= lastDate.getDate(); i++) {
    dates.push({
      ...(i === today.getDate() ? { isToday: true } : {}),
      date: prevDate.getFullYear() + '-' + (month + 1) + '-' + i,
      isCurrentMonth: true,
      events: [
        { id: 4, color: 'amber', name: 'Maple syrup museum', time: '3PM', datetime: '2022-01-22T15:00', href: '#' },
        { id: 5, color: 'pink', name: 'Hockey game', time: '7PM', datetime: '2022-01-22T19:00', href: '#' },
        { id: 5, color: 'indigo', name: 'Hockey game', time: '7PM', datetime: '2022-01-22T19:00', href: '#' },
      ],
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
  const [startYear, startMonth] = start.split('-');
  const [endYear, endMonth] = end.split('-');
  const totalMonth = (Number(endYear) - Number(startYear)) * 12 + Number(endMonth) - Number(startMonth);
  return [Math.floor(totalMonth / 12), totalMonth % 12];
}
