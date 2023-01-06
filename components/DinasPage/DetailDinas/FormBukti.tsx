import { UploadIcon } from '@heroicons/react/solid';
import { AxiosResponse } from 'axios';
import { format } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { KeuanganDinasAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import {
  PostDinasBuktibayarReq,
  PostDinasBuktibayarRes,
  PostDinasBuktitanggungjawabReq,
  PostDinasBuktitanggungjawabRes,
} from '../../../types/api/KeuanganDinasAPI';
import { Status } from '../../../types/Common';
import { classNames } from '../../../utils/Components';
import { callAPI } from '../../../utils/Fetchers';
import { getQueryString } from '../../../utils/URLUtils';
import { CircleProgress } from '../../shared/CircleProgress';
import DatePickerCustom from '../../shared/Input/DatePicker';
import UploadWrapper, { FileObject } from '../../shared/Input/UploadWrapper';

interface FormState {
  tanggal: number;
  file: FileObject;
}

function FormBukti() {
  const dispatch = useDispatch();

  const { dinas_id, status: statusPembayaranId } = getQueryString<{ dinas_id: string; status: string }>();
  const isFormBuktiBayar = statusPembayaranId === '2';
  const isFormBuktitanggungjawab = statusPembayaranId === '3';

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<FormState>({
    defaultValues: {
      tanggal: Date.now(),
    },
  });

  const submitHandler = async (formData: FormState) => {
    let resSubmit: Partial<AxiosResponse<PostDinasBuktibayarRes | PostDinasBuktitanggungjawabRes>>;
    if (isFormBuktiBayar) {
      resSubmit = await callAPI<PostDinasBuktibayarReq, PostDinasBuktibayarRes>(
        KeuanganDinasAPI.POST_BUKTI_BAYAR,
        {
          dinas_id: Number(dinas_id),
          tgl_di_bayar: format(Number(formData.tanggal), 'yyyy-MM-dd'),
          file_bukti_bayar: [
            {
              document_uuid: formData.file.id,
              document_name: formData.file.name,
            },
          ],
        },
        { method: 'post' }
      );
    } else if (isFormBuktitanggungjawab) {
      resSubmit = await callAPI<PostDinasBuktitanggungjawabReq, PostDinasBuktitanggungjawabRes>(
        KeuanganDinasAPI.POST_BUKTI_TANGGUNGJAWAB,
        {
          dinas_id: Number(dinas_id),
          tgl_pertanggung_jawaban: format(Number(formData.tanggal), 'yyyy-MM-dd'),
          file_pertanggung_jawaban: [
            {
              document_uuid: formData.file.id,
              document_name: formData.file.name,
            },
          ],
        },
        { method: 'post' }
      );
    }

    if (resSubmit! && resSubmit.status === 200 && resSubmit.data?.status === Status.OK) {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Data berhasil tersimpan.',
          type: SnackbarType.INFO,
        })
      );
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

  const title = isFormBuktiBayar ? 'Bukti Pembayaran' : 'Bukti Pertanggungjawaban';
  const label = isFormBuktiBayar ? 'Tanggal Pembayaran' : 'Tanggal Bukti Pertanggungjawaban';

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col flex-nowrap justify-between rounded-lg bg-white p-6 py-4 shadow"
    >
      <p className="text-lg font-medium text-gray-900">{title}</p>
      <p className="text-xs text-gray-900">Masukan dokumen permohonan dalam bentuk PDF max 2mb</p>
      <div className="my-4 flex w-full max-w-[400px] shrink grow flex-col self-center">
        <Controller
          control={control}
          name={'file'}
          rules={{ required: `Mohon upload file ${title}.` }}
          render={({ field: { value } }) => (
            <UploadWrapper
              allowedSize={2000000}
              allowedTypes={['pdf']}
              handleUploadChange={(files: FileObject[]) => {
                setValue('file', files[0]);
              }}
            >
              {({ loading }) => (
                <div
                  className={classNames(
                    'flex flex-col items-center space-y-2 rounded-md border-2 border-dashed bg-slate-100 py-4',
                    errors.file ? 'border-red-800' : 'border-blue-800'
                  )}
                >
                  {loading ? <CircleProgress /> : null}
                  {value?.name ? (
                    <span className="text-base">{value.name}</span>
                  ) : (
                    <>
                      <UploadIcon className="h-10 w-10 text-slate-400" />
                      <span className="text-base">Drag and Drop your File Here or</span>
                    </>
                  )}
                  <button className="rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Browse file
                  </button>
                </div>
              )}
            </UploadWrapper>
          )}
        />
        {errors.file && <span className={'text-red-500'}>{errors.file.message}</span>}
      </div>

      <div className="mt-5 sm:col-span-6">
        <label className="mb-[2px] block text-sm font-medium text-gray-700">{label}</label>
        <Controller
          control={control}
          name={'tanggal'}
          rules={{ required: 'Mohon masukkan tanggal.' }}
          render={({ field: { onChange, value } }) => (
            <DatePickerCustom
              maxDate={new Date()}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              selected={new Date(value)}
              dateFormat="dd/MM/yyyy"
              onChange={(date: Date) => onChange(date.getTime())}
              customInput={
                <input
                  type="text"
                  className={classNames(
                    'block w-full rounded-md shadow-sm sm:text-sm',
                    errors.tanggal
                      ? 'ring-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                  )}
                />
              }
            />
          )}
        />
      </div>

      <div className="mt-6 flex flex-col items-end">
        <div className="flex items-center gap-x-2">
          <button
            className="rounded border border-transparent bg-gray-300 p-2 text-sm font-medium text-white shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-500 disabled:text-gray-200"
            onClick={() => reset()}
          >
            Batal
          </button>
          <button
            type="submit"
            className="rounded border border-transparent bg-indigo-600 p-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200"
          >
            Ajukan Pembayaran
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormBukti;
