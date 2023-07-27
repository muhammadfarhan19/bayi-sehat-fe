import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../action/CommonAction';
import { DaftarTransaksiAPI } from '../../../../constants/APIUrls';
import { SnackbarType } from '../../../../reducer/CommonReducer';
import { DaftarTransaksi } from '../../../../types/api/DaftarTransaksiAPI';
import { Status } from '../../../../types/Common';
import { formatDate, getLastDayOfMonth } from '../../../../utils/DateUtil';
import { callAPI } from '../../../../utils/Fetchers';

interface useResyncTransactionProps {
  selectedDate?: Date;
  code: string;
  onSuccess: () => void;
}

function useResyncTransaction() {
  const dispatch = useDispatch();

  const syncHandler = async (props: useResyncTransactionProps) => {
    const properties = props;
    const startDate = properties.selectedDate
      ? formatDate(properties.selectedDate, 'yyyy-MM-dd')
      : formatDate(new Date(), 'yyyy-MM-dd');
    const endOfMonth = properties.selectedDate ? getLastDayOfMonth(properties.selectedDate) : new Date();
    const endDate = formatDate(endOfMonth, 'yyyy-MM-dd');
    const resSubmit = await callAPI<DaftarTransaksi.PostResyncReq, DaftarTransaksi.PostResyncRes>(
      DaftarTransaksiAPI.POST_TRANSAKSI,
      {
        kode: properties.code,
        start_date: startDate,
        end_date: endDate,
      },
      { method: 'post' }
    );
    if (resSubmit.status === 200 && resSubmit.data?.status === Status.OK) {
      dispatch(
        setSnackbar({
          show: true,
          message: `${resSubmit?.data?.data} .`,
          type: SnackbarType.INFO,
        })
      );
      props.onSuccess();
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal mengirim data. Mohon coba beberapa saat lagi.',
          type: SnackbarType.ERROR,
        })
      );
    }
  };

  return { syncHandler };
}

export default useResyncTransaction;
