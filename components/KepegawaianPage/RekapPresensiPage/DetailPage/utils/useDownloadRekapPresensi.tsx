import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { RekapPresensiAPI } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import { GetDocumentRes } from '../../../../../types/api/DocumentAPI';
import { RekapPresensiReq } from '../../../../../types/api/RekapPresensiAPI';
import { callAPI } from '../../../../../utils/Fetchers';

function useDownloadRekapPresensi() {
  const dispatch = useDispatch();

  const handleDownloadRekap = (page: number, perPage: number, startDate: string, endDate: string) => {
    callAPI<RekapPresensiReq, GetDocumentRes>(RekapPresensiAPI.POST_PRESENSI_SUMMARY_EXPORT, {
      page: page,
      per_page: perPage,
      start_date: startDate,
      end_date: endDate,
    })
      .then(response => {
        let url = '';
        if (response.status === 200 && response.data instanceof Blob) {
          url = window.URL.createObjectURL(response.data);
        }
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'RekapPresensi.xlsx');
        document.body.appendChild(link);
        dispatch(
          setSnackbar({
            show: true,
            message: 'Data berhasil di Download.',
            type: SnackbarType.INFO,
          })
        );
        link.click();
      })
      .catch(() => {
        dispatch(
          setSnackbar({
            show: true,
            message: 'Gagal download data. Mohon coba beberapa saat lagi.',
            type: SnackbarType.ERROR,
          })
        );
      });
  };

  return { handleDownloadRekap };
}

export default useDownloadRekapPresensi;
