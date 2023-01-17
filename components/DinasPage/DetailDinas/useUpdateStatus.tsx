import { format } from 'date-fns';
import { useDispatch } from 'react-redux';

import { setModal, setSnackbar } from '../../../action/CommonAction';
import { KeuanganDinasAPI } from '../../../constants/APIUrls';
import { ModalType, SnackbarType } from '../../../reducer/CommonReducer';
import {
  PostDataPembayaranReq,
  PostDataPembayaranRes,
  PostDinasBuktibayarReq,
  PostDinasBuktibayarRes,
  PostDinasBuktitanggungjawabReq,
  PostDinasBuktitanggungjawabRes,
  PostUpdateStatusPembayaranReq,
  PostUpdateStatusPembayaranRes,
} from '../../../types/api/KeuanganDinasAPI';
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
    let apiResult;
    if (status === 2) {
      // insert bukti bayar
      apiResult = await callAPI<PostDataPembayaranReq, PostDataPembayaranRes>(KeuanganDinasAPI.POST_DATA_PEMBAYARAN, {
        dinas_id: Number(dinas_id),
      });
    } else if (status === 3) {
      // insert buktibayar
      apiResult = await callAPI<PostDinasBuktibayarReq, PostDinasBuktibayarRes>(KeuanganDinasAPI.POST_BUKTI_BAYAR, {
        dinas_id: Number(dinas_id),
        tgl_di_bayar: format(new Date(), 'yyyy-MM-dd'),
      });
    } else {
      // insert buktitanggungjawab
      apiResult = await callAPI<PostDinasBuktitanggungjawabReq, PostDinasBuktitanggungjawabRes>(
        KeuanganDinasAPI.POST_BUKTI_TANGGUNGJAWAB,
        {
          dinas_id: Number(dinas_id),
          tgl_pertanggung_jawaban: format(new Date(), 'yyyy-MM-dd'),
        }
      );
    }

    if (apiResult.status === 200 && apiResult.data?.status === 'OK') {
      const resSubmit = await callAPI<PostUpdateStatusPembayaranReq, PostUpdateStatusPembayaranRes>(
        KeuanganDinasAPI.POST_UPDATE_STATUS_PEMBAYARAN,
        {
          dinas_id: Number(dinas_id),
          status_pembayaran: status,
        }
      );

      if (resSubmit.status === 200 && resSubmit.data?.status === 'OK') {
        dispatch(
          setModal({
            message: 'Data berhasil tersimpan!',
            type: ModalType.INFO,
            show: true,
            redirect: `/keuangan/daftar-dinas?type=detail&dinas_id=${dinas_id}&status=${status}`,
          })
        );
        return;
      }
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
