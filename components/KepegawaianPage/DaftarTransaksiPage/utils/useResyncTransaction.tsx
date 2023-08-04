import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../action/CommonAction';
import { DaftarTransaksiAPI } from '../../../../constants/APIUrls';
import { SnackbarType } from '../../../../reducer/CommonReducer';
import { DaftarTransaksi } from '../../../../types/api/DaftarTransaksiAPI';
import { formatDate, getLastDayOfMonth } from '../../../../utils/DateUtil';
import { callAPI } from '../../../../utils/Fetchers';

interface useResyncTransactionProps {
  selectedDate?: Date;
  code: string;
  onSuccess: () => void;
  listSelected?: boolean;
  month?: number;
  year?: number;
  selectedIndex?: number;
}

function useResyncTransaction() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState<{ show: boolean; selectedIndex?: number }>({
    show: false,
    selectedIndex: 0,
  });
  const handleLoader = (show: boolean, selectedIndex?: number) => {
    setLoading({ show, selectedIndex });
  };
  const syncHandler = async (props: useResyncTransactionProps) => {
    const {
      listSelected = false,
      month = new Date().getMonth(),
      year = new Date().getFullYear(),
      selectedIndex = 0,
    } = props;
    handleLoader(true, selectedIndex);
    const properties = props;
    const startDate =
      properties.selectedDate && !listSelected
        ? formatDate(properties.selectedDate, 'yyyy-MM-dd')
        : formatDate(new Date(year, month - 1), 'yyyy-MM-dd');
    const endOfMonth =
      properties.selectedDate && !listSelected
        ? getLastDayOfMonth(properties.selectedDate)
        : getLastDayOfMonth(new Date(year, month - 1));
    const endDate = formatDate(endOfMonth, 'yyyy-MM-dd');
    const resSubmit = await callAPI<DaftarTransaksi.PostResyncReq, DaftarTransaksi.PostResyncRes>(
      DaftarTransaksiAPI.POST_DAFTAR_TRANSAKSI,
      {
        kode: properties.code,
        start_date: startDate,
        end_date: endDate,
      },
      { method: 'post' }
    );
    if (resSubmit.status === 200) {
      dispatch(
        setSnackbar({
          show: true,
          message: `Sukses Sync Transaksi.`,
          type: SnackbarType.INFO,
        })
      );
      props.onSuccess();
      handleLoader(false, selectedIndex);
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal mengirim data. Mohon coba beberapa saat lagi.',
          type: SnackbarType.ERROR,
        })
      );
      handleLoader(false, selectedIndex);
    }
  };

  return { loading, syncHandler };
}

export default useResyncTransaction;
