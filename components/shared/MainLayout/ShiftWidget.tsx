import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { AbsenBackdoorAPI, PresensiOnlineAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import { PostBackdoorReq, PostBackdoorRes } from '../../../types/api/BackdoorAPI';
import { PresensiOnlineResp } from '../../../types/api/PresensiOnlineAPI';
import { Status } from '../../../types/Common';
import { Case, classNames, Default, Switch } from '../../../utils/Components';
import { formatStringDate, formatTimestamp, getCurrentTime } from '../../../utils/DateUtil';
import { callAPI } from '../../../utils/Fetchers';
import { checkReturnValueOfString } from '../../../utils/StringUtil';
import useCommonApi from '../hooks/useCommonApi';
import usePersonalData from '../hooks/usePersonalData';

type StatusShift =
  | 'Dinas'
  | 'Libur Weekend'
  | 'Libur Nasional/Spesial'
  | 'Cuti'
  | 'Shift Libur'
  | 'pegawai has not check_in'
  | 'pegawai has check_in'
  | 'pegawai has not check_out'
  | 'pegawai has check_out';

interface FormShift {
  pegawaiId?: number;
  dateSubmitted: string;
  checkIn: boolean;
}

function SubmitShift() {
  const dispatch = useDispatch();
  const personalData = usePersonalData();
  const asDay = 'EEEE, dd/MMM/yyyy';
  const { data: shift, mutate } = useCommonApi<null, PresensiOnlineResp>(PresensiOnlineAPI.GET_PRESENSI_ONLINE, null, {
    method: 'GET',
  });
  const formatDate = shift?.date && formatStringDate(shift?.date, asDay);
  const shiftTime = {
    check_in: formatTimestamp(shift?.check_in),
    check_out: formatTimestamp(shift?.check_out),
    timeSubmittedCheckIn: formatTimestamp(shift?.time_check_in),
    timeSubmittedCheckOut: formatTimestamp(shift?.time_check_out),
  };
  const timeComparison = new Date(shift?.check_out as unknown as Date);
  const now = new Date();
  const handleDisabledButton = (statusData: string | StatusShift, timeCompare: Date): boolean => {
    if (!statusData) return true;
    if (statusData === 'pegawai has check_in' && timeCompare < now) {
      return true;
    }
    if (statusData === 'pegawai has check_out') {
      return true;
    }
    return false;
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
      (formData?.checkIn as unknown as StatusShift) === 'pegawai has not check_in'
        ? requestBody
        : { ...requestBody, check_in: '', check_out: getCurrentTime() }
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
  return { submitHandler, asDay, shift, formatDate, shiftTime, timeComparison, handleDisabledButton };
}

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
    <div className="flex flex-row rounded-br-md rounded-bl-md bg-zinc-50">
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
  const SubmitShiftVM = SubmitShift();
  return (
    <button
      type="button"
      disabled={SubmitShiftVM?.handleDisabledButton(statusData, timeCompare)}
      onClick={onCheckIn}
      className={classNames(
        statusData === 'pegawai has not check_in' ? 'bg-green-600 hover:bg-green-300' : 'bg-red-600 hover:bg-red-300',
        'mt-2 flex w-full flex-row items-center justify-center rounded-md  py-2 text-white disabled:bg-gray-400'
      )}
    >
      <PresensiIcon asTapIn={SubmitShiftVM?.handleDisabledButton(statusData, timeCompare)} />
      <Switch>
        <Case condition={statusData === 'pegawai has not check_out'}>Presensi Keluar</Case>
        <Default>Presensi Masuk</Default>
      </Switch>
    </button>
  );
};

function ShiftWidget() {
  const SubmitShiftVM = SubmitShift();
  return (
    <>
      <div className="flex-1 rounded-md bg-white shadow-lg lg:block" aria-label="Widget">
        <div className="px-6 py-4">
          <p className="text-sm font-bold text-indigo-600">Shift Berikutnya</p>
          <p className="text-md font-medium text-gray-600">{SubmitShiftVM?.formatDate}</p>
          <p className="text-xl font-medium text-gray-600">
            {SubmitShiftVM?.shiftTime?.check_in} - {SubmitShiftVM?.shiftTime?.check_out}
          </p>
          <p className="mt-1 text-xs font-light text-gray-600">{SubmitShiftVM?.shift?.shift}</p>
          <ButtonPresensiComponent
            timeCompare={SubmitShiftVM?.timeComparison}
            statusData={SubmitShiftVM?.shift?.status as StatusShift}
            onCheckIn={() =>
              SubmitShiftVM.submitHandler({
                dateSubmitted: SubmitShiftVM.shift?.date as string,
                checkIn: SubmitShiftVM.shift?.status as unknown as boolean,
              })
            }
          />
        </div>
        <HoursComponent
          timeCheckIn={SubmitShiftVM?.shiftTime?.timeSubmittedCheckIn}
          timeCheckOut={SubmitShiftVM?.shiftTime?.timeSubmittedCheckOut}
        />
      </div>
    </>
  );
}

export default ShiftWidget;
