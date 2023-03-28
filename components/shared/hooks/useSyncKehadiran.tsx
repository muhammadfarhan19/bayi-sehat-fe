import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { SyncKehadiranAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import { SyncKehadiranReq, SyncKehadiranRes } from '../../../types/api/SyncKehadiranAPI';
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

    try {
      const syncRes = await callAPI<SyncKehadiranReq, SyncKehadiranRes>(SyncKehadiranAPI.POST_SYNC, {
        start_date: startDate,
        end_date: endDate,
      });
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
    handleSetLoader(true, selectedIndex);

    const syncRes = await callAPI<SyncKehadiranReq, SyncKehadiranRes>(SyncKehadiranAPI.POST_SYNC, {
      start_date: startDate,
      end_date: endDate,
      nip: nip,
    });

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
