import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { SyncKehadiranAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import { SyncKehadiranRes } from '../../../types/api/SyncKehadiranAPI';
import { Status } from '../../../types/Common';
import { callAPI } from '../../../utils/Fetchers';

const resetIndex = 0;

function useSyncKehadiran() {
  const dispatch = useDispatch();

  const [isSyncLoading, setIsSyncLoading] = React.useState({
    onLoad: false,
    onSelected: resetIndex,
  });

  const handleSetLoader = (onLoad: boolean, onSelected: number) => setIsSyncLoading({ onLoad, onSelected });

  async function handleSyncByDate(startDate: string, endDate: string, selectedIndex: number) {
    if (!startDate || !endDate) {
      return;
    }

    handleSetLoader(true, selectedIndex);
    const queryParams = `?start_date=${startDate}&end_date=${endDate}`;

    try {
      const syncRes = await callAPI<null, SyncKehadiranRes>(SyncKehadiranAPI.POST_SYNC + queryParams, null);
      if (syncRes.status === 200 && syncRes.data?.status === Status.OK) {
        dispatch(
          setSnackbar({
            show: true,
            message: 'Data berhasil di Sync.',
            type: SnackbarType.INFO,
          })
        );
      } else {
        dispatch(
          setSnackbar({
            show: true,
            message: 'Gagal Sync data. Mohon coba beberapa saat lagi.',
            type: SnackbarType.ERROR,
          })
        );
      }
    } catch (error) {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Terjadi kesalahan saat Sync data.',
          type: SnackbarType.ERROR,
        })
      );
    }
    handleSetLoader(false, resetIndex);
  }

  async function handleSyncPegawai(startDate: string, endDate: string, nip: string, selectedIndex: number) {
    const apiURL = new URL(SyncKehadiranAPI.POST_SYNC, window.location.origin);
    const params = new URLSearchParams(apiURL.search);
    params.append('start_date', startDate);
    params.append('end_date', endDate);
    params.append('nip', nip);

    handleSetLoader(true, selectedIndex);
    apiURL.search = params.toString();

    const syncRes = await callAPI<null, SyncKehadiranRes>(apiURL.href, null);

    if (syncRes.status === 200 && syncRes.data?.status === Status.OK) {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Data berhasil di Sync.',
          type: SnackbarType.INFO,
        })
      );
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal Sync data. Mohon coba beberapa saat lagi.',
          type: SnackbarType.ERROR,
        })
      );
    }
    handleSetLoader(false, resetIndex);
  }

  return { isSyncLoading, handleSyncByDate, handleSyncPegawai };
}

export default useSyncKehadiran;
