import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../action/CommonAction';
import { DaftarTransaksiAPI } from '../../../../constants/APIUrls';
import { SnackbarType } from '../../../../reducer/CommonReducer';
import { DaftarTransaksi } from '../../../../types/api/DaftarTransaksiAPI';
import { callAPI } from '../../../../utils/Fetchers';

function useDownloadTransaksi() {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const downloadTransaksi = async (filterState: Partial<DaftarTransaksi.Request>, fileName: string) => {
    setLoading(true);
    const updatedFilterState = { ...filterState };
    if (filterState.page && filterState.per_page) {
      delete updatedFilterState.page;
      delete updatedFilterState.per_page;
    }
    if (!filterState.search) {
      delete updatedFilterState.search;
    }
    const callApiDownload = await callAPI<Partial<DaftarTransaksi.Request>, DaftarTransaksi.PostResponse>(
      DaftarTransaksiAPI.POST_BLOB_TRANSAKSI,
      { ...updatedFilterState },
      { method: 'GET', isBlob: true, timeout: 120000 }
    );
    if (callApiDownload.status === 200 && callApiDownload.data instanceof Blob) {
      let url = '';
      url = window.URL.createObjectURL(callApiDownload.data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName + '.xlsx');
      document.body.appendChild(link);
      link.click();
      dispatch(
        setSnackbar({
          show: true,
          message: 'Data berhasil di Download.',
          type: SnackbarType.INFO,
        })
      );
      setLoading(false);
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: `[${callApiDownload.status}] - Gagal Download data. Mohon coba beberapa saat lagi.`,
          type: SnackbarType.ERROR,
        })
      );
      setLoading(false);
    }
  };
  return { loading, downloadTransaksi };
}

export default useDownloadTransaksi;
