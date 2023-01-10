import { useDispatch } from 'react-redux';

import { setModal, setSnackbar } from '../../../action/CommonAction';
import { KeuanganDinasAPI } from '../../../constants/APIUrls';
import { ModalType, SnackbarType } from '../../../reducer/CommonReducer';
import { PostUpdateStatusPembayaranReq, PostUpdateStatusPembayaranRes } from '../../../types/api/KeuanganDinasAPI';
import { callAPI } from '../../../utils/Fetchers';
import { getQueryString } from '../../../utils/URLUtils';

export enum StatusPUMK {
  MENUNGGU_PUMK_MEMPROSES = 0,
  DIPROSES_PUMK = 1,
  DIAJUKAN_PUMK_KEPADA_BPP = 2,
  DIBAYARKAN_OLEH_PUMK = 3,
  SELESAI = 4,
}

function useUpdateStatus() {
  const { dinas_id } = getQueryString<{ dinas_id: string }>();
  const dispatch = useDispatch();

  const updateStatus = async (status: StatusPUMK) => {
    const apiResult = await callAPI<PostUpdateStatusPembayaranReq, PostUpdateStatusPembayaranRes>(
      KeuanganDinasAPI.POST_UPDATE_STATUS_PEMBAYARAN,
      {
        dinas_id: Number(dinas_id),
        status_pembayaran: status,
      }
    );

    if (apiResult.status === 200 && apiResult.data?.status === 'OK') {
      dispatch(
        setModal({
          message: 'Data berhasil tersimpan!',
          type: ModalType.INFO,
          show: true,
          redirect: `/keuangan/daftar-dinas/detail?dinas_id=${dinas_id}&status=${status}`,
        })
      );
      return;
    }

    dispatch(
      setSnackbar({
        show: true,
        message: 'Gagal mengubah status. Mohon coba beberapa saat lagi.',
        type: SnackbarType.ERROR,
      })
    );
  };

  return {
    updateStatus,
  };
}

export default useUpdateStatus;
