import { StatusMenikah } from '../types/Common';

export const StatusMenikahText: Record<StatusMenikah, string> = {
  [StatusMenikah.MARRIED]: 'Menikah',
  [StatusMenikah.NOT_MARRIED]: 'Belum menikah',
  [StatusMenikah.DIVORCE]: 'Bercerai',
};
