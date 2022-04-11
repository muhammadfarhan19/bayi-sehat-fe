import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const formatDate = (date: Date | number, formatString = 'dd-MMM-yyyy, HH:mm:ss') => {
  return format(date, formatString, { locale: id });
};
