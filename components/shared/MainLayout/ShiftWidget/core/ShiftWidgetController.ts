import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { AbsenBackdoorAPI, PresensiOnlineAPI } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import { PostBackdoorReq, PostBackdoorRes } from '../../../../../types/api/BackdoorAPI';
import { PresensiOnlineResp } from '../../../../../types/api/PresensiOnlineAPI';
import { Status } from '../../../../../types/Common';
import { formatStringDate, formatTimestamp, getCurrentTime } from '../../../../../utils/DateUtil';
import { callAPI } from '../../../../../utils/Fetchers';
import useCommonApi from '../../../hooks/useCommonApi';
import usePersonalData from '../../../hooks/usePersonalData';

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

interface FormShift {
  pegawaiId?: number;
  dateSubmitted: string;
  checkIn: boolean;
}

function callApiSubmitShiftWidget() {
  const pegawaiPersonalData = usePersonalData();
  const dispatch = useDispatch();
  const submitHandler = async (formData: FormShift, mutateApi: () => void) => {
    const formatDatePreCalculated = formatStringDate(formData?.dateSubmitted, 'yyyy-MM-dd');
    const requestBody = {
      pegawai_id: pegawaiPersonalData?.pegawai_id as number,
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
      mutateApi();
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
  return { submitHandler, pegawaiPersonalData };
}

function getApiDataShiftWidget() {
  const { data: shift, mutate } = useCommonApi<null, PresensiOnlineResp>(PresensiOnlineAPI.GET_PRESENSI_ONLINE, null, {
    method: 'GET',
  });
  const asDay = 'EEEE, dd/MMM/yyyy';
  const formatDate = shift?.date && formatStringDate(shift?.date, asDay);
  const shiftTime = {
    check_in: formatTimestamp(shift?.check_in),
    check_out: formatTimestamp(shift?.check_out),
    timeSubmittedCheckIn: formatTimestamp(shift?.time_check_in),
    timeSubmittedCheckOut: formatTimestamp(shift?.time_check_out),
  };
  const timeComparison = new Date(shift?.check_out as unknown as Date);
  const status = shift?.status;
  return { mutate, shiftTime, formatDate, timeComparison, shift, status };
}

function disabledOnSubmisson(statusPns: number) {
  const disabledForPns = statusPns !== 2;
  const now = new Date();
  const handleDisabledButton = (statusData: string | StatusShift, timeCompare: Date): boolean => {
    if (disabledForPns) return true;
    if (!statusData) return true;
    if (statusData === 'pegawai has check_in' && timeCompare > now) return true;
    if (statusData === 'pegawai has check_in') return true;
    if (statusData === 'pegawai has check_out') return true;
    return false;
  };
  return { handleDisabledButton };
}

export default function SubmitShiftController() {
  const postShift = callApiSubmitShiftWidget();
  const getShiftData = getApiDataShiftWidget();
  const shouldDisabledOnSubmisson = disabledOnSubmisson(postShift.pegawaiPersonalData?.status_cpns as number);
  return { postShift, getShiftData, shouldDisabledOnSubmisson };
}
