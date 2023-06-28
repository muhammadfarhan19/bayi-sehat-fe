import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { RekapPresensiAPI } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import { GetDocumentRes } from '../../../../../types/api/DocumentAPI';
import { callAPI } from '../../../../../utils/Fetchers';

function useDownloadRekapPresensi() {
  const dispatch = useDispatch();

  const handleDownloadRekap = (startDate: string, endDate: string, statusPegawai: number[]) => {
    callAPI<null, GetDocumentRes>(
      RekapPresensiAPI.POST_PRESENSI_SUMMARY_EXPORT +
        `?start_date=${startDate}&end_date=${endDate}&status_cpns=${statusPegawai}`,
      null,
      { isBlob: true, method: 'POST' }
    ).then(response => {
      console.log(response.status);
      let url = '';
      if (response.status === 200 && response.data instanceof Blob) {
        url = window.URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `rekap_presensi_tukin_pegawai_${startDate}_${endDate}.xlsx`);
        document.body.appendChild(link);
        dispatch(
          setSnackbar({
            show: true,
            message: 'Data berhasil di Download.',
            type: SnackbarType.INFO,
          })
        );
        link.click();
      } else {
        dispatch(
          setSnackbar({
            show: true,
            message: 'Gagal download data. Mohon coba beberapa saat lagi.',
            type: SnackbarType.ERROR,
          })
        );
      }
    });
  };

  return { handleDownloadRekap };
}

export default useDownloadRekapPresensi;
