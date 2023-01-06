import { UploadIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { KeuanganDinasAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import { GetDocumentRes } from '../../../types/api/DocumentAPI';
import { PostDataPembayaranReq, PostDataPembayaranRes } from '../../../types/api/KeuanganDinasAPI';
import { Status } from '../../../types/Common';
import { callAPI } from '../../../utils/Fetchers';
import { getQueryString } from '../../../utils/URLUtils';
import { CircleProgress } from '../../shared/CircleProgress';
import UploadWrapper, { FileObject } from '../../shared/Input/UploadWrapper';

function FormPembayaran() {
  const { dinas_id } = getQueryString<{ dinas_id: string }>();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDownload = () => {
    (async () => {
      const fileRes = await callAPI<{ dinas_id: number }, GetDocumentRes>(
        KeuanganDinasAPI.GET_TEMPLATE_PEMBAYARAN,
        { dinas_id: Number(dinas_id) },
        {
          method: 'get',
          isBlob: true,
        }
      );

      if (fileRes.status === 200 && fileRes.data instanceof Blob) {
        const fileUrl = window.URL.createObjectURL(fileRes.data);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.download = `TemplateDinas_${dinas_id}.csv`;
        a.href = fileUrl;
        a.click();
        window.URL.revokeObjectURL(fileUrl);
        a.remove();
      }
    })();
  };

  const handleUploadBuktiBayar = async (files: FileObject[]) => {
    const resSubmit = await callAPI<PostDataPembayaranReq, PostDataPembayaranRes>(
      KeuanganDinasAPI.POST_DATA_PEMBAYARAN,
      {
        dinas_id: Number(dinas_id),
        files: [{ document_name: files[0].name, document_uuid: files[0].id }],
      },
      { method: 'post' }
    );

    if (resSubmit.status === 200 && resSubmit.data?.status === Status.OK) {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Data berhasil tersimpan.',
          type: SnackbarType.INFO,
        })
      );
      router.push(location.href);
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal menyimpan data. Mohon coba beberapa saat lagi.',
          type: SnackbarType.ERROR,
        })
      );
    }
  };

  return (
    <div className="flex flex-col flex-nowrap justify-between rounded-lg bg-white p-6 py-4 shadow">
      <p className="text-lg font-medium text-gray-900">Form Pembayaran</p>
      <p className="text-xs text-gray-900">
        Download{' '}
        <span onClick={handleDownload} className="cursor-pointer text-indigo-600 underline">
          Template
        </span>
        . Masukan dokumen permohonan dalam bentuk CSV max 2mb
      </p>
      <div className="my-4 flex w-full max-w-[400px] shrink grow flex-col self-center">
        <UploadWrapper allowedSize={2000000} allowedTypes={['csv']} handleUploadChange={handleUploadBuktiBayar}>
          {({ loading }) => (
            <div
              className={
                'flex flex-col items-center space-y-2 rounded-md border-2 border-dashed border-blue-800 bg-slate-100 py-4'
              }
            >
              {loading ? <CircleProgress /> : null}
              <>
                <UploadIcon className="h-10 w-10 text-slate-400" />
                <span className="text-base">Drag and Drop your File Here or</span>
              </>
              <button className="rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Browse file
              </button>
            </div>
          )}
        </UploadWrapper>
      </div>
    </div>
  );
}

export default FormPembayaran;
