import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { AbsenBackdoorAPI, PresensiOnlineAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import { PostBackdoorReq, PostBackdoorRes } from '../../../types/api/BackdoorAPI';
import { PresensiOnlineResp } from '../../../types/api/PresensiOnlineAPI';
import { Status } from '../../../types/Common';
import { Case, classNames, Default, Switch } from '../../../utils/Components';
import { formatStringDate } from '../../../utils/DateUtil';
import { callAPI } from '../../../utils/Fetchers';
import { checkReturnValueOfString } from '../../../utils/StringUtil';
import useCommonApi from '../hooks/useCommonApi';
import usePersonalData from '../hooks/usePersonalData';

export type StatusShift =
  | 'Dinas'
  | 'Libur Weekend'
  | 'Libur Nasional/Spesial'
  | 'Cuti'
  | 'Shift Libur'
  | 'pegawai has not check_in'
  | 'pegawai has check_in'
  | 'pegawai has not check_out'
  | 'pegawai has check_out';

const PresensiIcon = ({ asTapIn }: { asTapIn?: boolean }) => {
  const arrowLeft = '.25V15m3 0l3-3m0 0l-3-3m3 3H9';
  const arrowRight = '.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75';
  const renderArrowIcon = asTapIn ? arrowRight : arrowLeft;
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="mr-2 h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={`M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2${renderArrowIcon}`}
        />
      </svg>
    </>
  );
};

const HoursComponent = ({ timeCheckIn, timeCheckOut }: { timeCheckIn?: string; timeCheckOut?: string }) => {
  return (
    <div className="flex flex-row rounded-br-md rounded-bl-md bg-zinc-50 shadow-md">
      <div className="flex flex-1 flex-col items-center justify-center border-t-2 border-r-2 border-gray-300 py-2 px-2 ">
        <p className="text-md font-bold text-green-600">{checkReturnValueOfString(timeCheckIn as string, '-:-')} WIB</p>
        <p className="text-xs">Jam Masuk</p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center border-t-2 border-gray-300 py-2 px-2 ">
        <p className="text-md font-bold text-green-600">
          {checkReturnValueOfString(timeCheckOut as string, '-:-')} WIB
        </p>
        <p className="text-xs">Jam Keluar</p>
      </div>
    </div>
  );
};

const ButtonPresensiComponent = ({
  onCheckIn,
  statusData,
  timeCompare,
}: {
  onCheckIn: React.MouseEventHandler<HTMLButtonElement>;
  statusData: StatusShift;
  timeCompare: Date;
}) => {
  const now = new Date();

  const handleDisabledButton = (): boolean => {
    if (!statusData) return true;
    if (statusData === 'pegawai has check_in' && timeCompare < now) {
      return true;
    }
    if (statusData === 'pegawai has check_out') {
      return true;
    }
    return false;
  };

  return (
    <button
      type="button"
      disabled={handleDisabledButton()}
      onClick={onCheckIn}
      className={classNames(
        statusData === 'pegawai has not check_in' ? 'bg-green-600 hover:bg-green-300' : 'bg-red-600 hover:bg-red-300',
        'mt-2 flex w-full flex-row items-center justify-center rounded-md  py-2 text-white disabled:bg-gray-400'
      )}
    >
      <PresensiIcon asTapIn={handleDisabledButton()} />
      <Switch>
        <Case condition={statusData === 'pegawai has not check_out'}>Presensi Keluar</Case>
        <Default>Presensi Masuk</Default>
      </Switch>
    </button>
  );
};

export function incrementToMonday(dateStr: string): string {
  const inputDate = new Date(dateStr);
  const dayOfWeek = inputDate.getDay();

  if (dayOfWeek === 6) {
    inputDate.setDate(inputDate.getDate() + 2);
  } else if (dayOfWeek === 0) {
    inputDate.setDate(inputDate.getDate() + 1);
  }

  return inputDate.toISOString().slice(0, 10);
}

export function getCurrentTime(): string {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

interface FormShift {
  pegawaiId?: number;
  dateSubmitted: string;
  checkIn: boolean;
}

function ShiftWidget() {
  const personalData = usePersonalData();
  const dispatch = useDispatch();
  const { data: shift, mutate } = useCommonApi<null, PresensiOnlineResp>(PresensiOnlineAPI.GET_PRESENSI_ONLINE, null, {
    method: 'GET',
  });
  const asDay = 'EEEE, dd/MMM/yyyy';
  const formatDate = shift?.date && formatStringDate(shift?.date, asDay);
  const formatTimestamp = (timeStamp?: string, includeSeconds = false) => {
    const hoursAndMinutes = 'HH:mm';
    const formattedString = includeSeconds ? hoursAndMinutes?.concat(':ss') : hoursAndMinutes;
    if (timeStamp) {
      const formatDate = formatStringDate(timeStamp, formattedString);
      return formatDate;
    }
    return '';
  };

  const submitHandler = async (formData: FormShift) => {
    const formatDatePreCalculated = formatStringDate(formData?.dateSubmitted, 'yyyy-MM-dd');
    const requestBody = {
      pegawai_id: personalData?.pegawai_id as number,
      date: formatDatePreCalculated,
      check_in: getCurrentTime(),
      check_out: '',
    };
    const call = await callAPI<PostBackdoorReq, PostBackdoorRes>(
      AbsenBackdoorAPI.POST_PRESENSI,
      formData?.checkIn ? requestBody : { ...requestBody, check_in: '', check_out: getCurrentTime() }
    );
    if (call.status === 200 && call.data?.status === Status.OK) {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Data berhasil tersimpan.',
          type: SnackbarType.INFO,
        })
      );
      mutate();
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal menyimpan data. mohon coba beberapa saat lagi.',
          type: SnackbarType.ERROR,
        })
      );
    }
  };

  return (
    <>
      <div className="hidden flex-1 rounded-md bg-white lg:block" aria-label="Widget">
        <div className="px-6 py-4">
          <p className="text-sm font-bold text-indigo-600">Shift Berikutnya</p>
          <p className="text-md font-medium text-gray-600">{formatDate}</p>
          <p className="text-xl font-medium text-gray-600">
            {formatTimestamp(shift?.check_in)} - {formatTimestamp(shift?.check_out)}
          </p>
          <p className="mt-1 text-xs font-light text-gray-600">{shift?.shift}</p>
          <ButtonPresensiComponent
            timeCompare={new Date(shift?.check_out as unknown as Date)}
            statusData={shift?.status as StatusShift}
            onCheckIn={() =>
              submitHandler({
                dateSubmitted: shift?.date as string,
                checkIn: shift?.can_do_absence as boolean,
              })
            }
          />
        </div>
        <HoursComponent
          timeCheckIn={formatTimestamp(shift?.time_check_in)}
          timeCheckOut={formatTimestamp(shift?.time_check_out)}
        />
      </div>
    </>
  );
}

export default ShiftWidget;
