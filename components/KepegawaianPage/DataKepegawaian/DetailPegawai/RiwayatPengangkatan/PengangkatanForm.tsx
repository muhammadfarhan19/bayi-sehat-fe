import { Dialog, Transition } from '@headlessui/react';
import { UploadIcon, XIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { JabatanAPI, RiwayatPengangkatanPekerjaan } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import { GetJabatanReq, JabatanData } from '../../../../../types/api/JabatanAPI';
import {
  GetRiwayatPengangkatanDetailReq,
  PostRiwayatPengangkatanInsertReq,
  PostRiwayatPengangkatanInsertRes,
  PostRiwayatPengangkatanUpdateReq,
  PostRiwayatPengangkatanUpdateRes,
  RiwayatPengangkatanDetailData,
} from '../../../../../types/api/RiwayatPengangkatanAPI';
import { Status } from '../../../../../types/Common';
import { classNames } from '../../../../../utils/Components';
import { callAPI } from '../../../../../utils/Fetchers';
import { CircleProgress } from '../../../../shared/CircleProgress';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import AutoComplete from '../../../../shared/Input/ComboBox';
import DatePickerCustom from '../../../../shared/Input/DatePicker';
import UploadWrapper, { FileObject } from '../../../../shared/Input/UploadWrapper';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedId?: string;
  onSuccess: () => void;
}

interface FormState {
  no_sk: string;
  tanggal_sk: number;
  tmt_awal: number;
  tmt_akhir: number;
  jabatan?: string;
  pejabatan_penandatangan: string;
  jabatan_penandatangan: string;
  unit_kerja: string;
  is_unit_kerja_pemerintah: boolean;
  document_uuid: string;
  document_name: string;
}

export default function PengangkatanForm(props: Props) {
  const { open, setOpen, selectedId, onSuccess } = props;
  const debounce = React.useRef<number>(0);
  const dispatch = useDispatch();
  const personalData = usePersonalData();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormState>({
    defaultValues: {
      tanggal_sk: Date.now(),
      tmt_awal: Date.now(),
      tmt_akhir: Date.now(),
    },
  });

  const [queryJabatan, setQueryJabatan] = React.useState('');
  const { data: daftarJabatan } = useCommonApi<GetJabatanReq, JabatanData>(
    JabatanAPI.GET_JABATAN,
    { page: 1, per_page: 20, jabatan: queryJabatan },
    { method: 'GET' }
  );

  const { data, isValidating } = useCommonApi<GetRiwayatPengangkatanDetailReq, RiwayatPengangkatanDetailData>(
    RiwayatPengangkatanPekerjaan.GET_RIWAYAT_PENGANGKATAN_DETAIL,
    { riwayat_id: Number(selectedId) },
    { method: 'GET' },
    { skipCall: !selectedId, revalidateOnMount: true }
  );

  React.useEffect(() => {
    if (data) {
      setValue('document_name', data?.files?.[0]?.document_name);
      setValue('document_uuid', data?.files?.[0]?.document_uuid);
      setValue('no_sk', data.no_sk);
      setValue('tanggal_sk', new Date(data.tanggal_sk).getTime());
      setValue('tmt_awal', new Date(data.tmt_awal).getTime());
      setValue('tmt_akhir', new Date(data.tmt_akhir).getTime());
      setValue('jabatan', data.jabatan);
      setValue('pejabatan_penandatangan', data.pejabatan_penandatangan);
      setValue('jabatan_penandatangan', data.jabatan_penandatangan);
      setValue('unit_kerja', data.unit_kerja);
      setValue('is_unit_kerja_pemerintah', data.is_unit_kerja_pemerintah);
      setQueryJabatan(data.jabatan_penandatangan);
    }
  }, [data]);

  if (isValidating) {
    return <></>;
  }

  const toggleModal = () => {
    setOpen(!open);
  };

  const submitHandler = async (formData: FormState) => {
    let resSubmit;
    if (selectedId) {
      resSubmit = await callAPI<PostRiwayatPengangkatanUpdateReq, PostRiwayatPengangkatanUpdateRes>(
        RiwayatPengangkatanPekerjaan.POST_RIWAYAT_PENGANGKATAN_UPDATE,
        {
          riwayat_id: Number(selectedId),
          pegawai_id: Number(personalData?.pegawai_id),
          no_sk: formData.no_sk,
          tanggal_sk: format(formData.tanggal_sk, 'yyyy/MM/dd'),
          tmt_awal: format(formData.tmt_awal, 'yyyy/MM/dd'),
          tmt_akhir: format(formData.tmt_akhir, 'yyyy/MM/dd'),
          jabatan: formData.jabatan || '',
          pejabatan_penandatangan: formData.pejabatan_penandatangan,
          jabatan_penandatangan: formData.jabatan_penandatangan,
          unit_kerja: formData.unit_kerja,
          is_unit_kerja_pemerintah: !!formData.is_unit_kerja_pemerintah,
          files: [
            {
              document_uuid: formData.document_uuid,
              document_name: formData.document_name,
            },
          ],
        },
        { method: 'post' }
      );
    } else {
      resSubmit = await callAPI<PostRiwayatPengangkatanInsertReq, PostRiwayatPengangkatanInsertRes>(
        RiwayatPengangkatanPekerjaan.POST_RIWAYAT_PENGANGKATAN_INSERT,
        {
          pegawai_id: Number(personalData?.pegawai_id),
          no_sk: formData.no_sk,
          tanggal_sk: format(formData.tanggal_sk, 'yyyy/MM/dd'),
          tmt_awal: format(formData.tmt_awal, 'yyyy/MM/dd'),
          tmt_akhir: format(formData.tmt_akhir, 'yyyy/MM/dd'),
          jabatan: formData.jabatan || '',
          pejabatan_penandatangan: formData.pejabatan_penandatangan,
          jabatan_penandatangan: formData.jabatan_penandatangan,
          unit_kerja: formData.unit_kerja,
          is_unit_kerja_pemerintah: !!formData.is_unit_kerja_pemerintah,
          files: [
            {
              document_uuid: formData.document_uuid,
              document_name: formData.document_name,
            },
          ],
        },
        { method: 'post' }
      );
    }

    if (resSubmit.status === 200 && resSubmit.data?.status === Status.OK) {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Data berhasil tersimpan.',
          type: SnackbarType.INFO,
        })
      );
      onSuccess();
      setOpen(!open);
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
    <Transition appear show={open} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={toggleModal}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 backdrop-brightness-50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-full max-w-lg transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="div" className="flex justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {selectedId ? 'Ubah' : 'Tambah'} Riwayat Pendidikan
                </h3>
                <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
              </Dialog.Title>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">No. SK Pengangkatan</label>
                  <div className="mt-1">
                    <input
                      {...register('no_sk', { required: 'Silahkan masukan No. SK Pengangkatan' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      type="text"
                    />
                    {errors.no_sk && <p className="mt-1 text-xs text-red-500">{errors.no_sk.message}</p>}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Tanggal SK Pengangkatan</label>
                  <div className="mt-1">
                    <Controller
                      control={control}
                      name={'tanggal_sk'}
                      rules={{ required: 'Mohon masukkan tanggal SK Pengangkatan.' }}
                      render={({ field: { onChange, value } }) => (
                        <DatePickerCustom
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
                                errors.tanggal_sk
                                  ? 'ring-red-500 focus:border-red-500 focus:ring-red-500'
                                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                              )}
                            />
                          }
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">TMT Awal</label>
                  <div className="mt-1">
                    <Controller
                      control={control}
                      name={'tmt_awal'}
                      rules={{ required: 'Mohon masukkan TMT awal.' }}
                      render={({ field: { onChange, value } }) => (
                        <DatePickerCustom
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
                                errors.tmt_awal
                                  ? 'ring-red-500 focus:border-red-500 focus:ring-red-500'
                                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                              )}
                            />
                          }
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">TMT Akhir</label>
                  <div className="mt-1">
                    <Controller
                      control={control}
                      name={'tmt_akhir'}
                      rules={{ required: 'Mohon masukkan TMT akhir.' }}
                      render={({ field: { onChange, value } }) => (
                        <DatePickerCustom
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
                                errors.tmt_akhir
                                  ? 'ring-red-500 focus:border-red-500 focus:ring-red-500'
                                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                              )}
                            />
                          }
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Jabatan</label>
                  <div className="mt-1">
                    <input
                      {...register('jabatan', { required: 'Silahkan masukan data jabatan.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      type="text"
                    />
                    {errors.jabatan && <p className="mt-1 text-xs text-red-500">{errors.jabatan.message}</p>}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Unit Kerja</label>
                  <div className="mt-1">
                    <input
                      {...register('unit_kerja', { required: 'Silahkan masukan data unit kerja.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      type="text"
                    />
                    {errors.unit_kerja && <p className="mt-1 text-xs text-red-500">{errors.unit_kerja.message}</p>}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <div className="flex flex-row items-center">
                    <input
                      {...register('is_unit_kerja_pemerintah')}
                      className="block rounded-md border-gray-300 shadow-sm sm:text-sm"
                      id="unit_pemerintah"
                      type="checkbox"
                    />
                    <label htmlFor="unit_pemerintah" className="ml-2 block text-sm font-medium text-gray-700">
                      Unit Kerja Pemerintahan
                    </label>
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  {(!selectedId || data?.jabatan_penandatangan) && (
                    <Controller
                      control={control}
                      name="jabatan_penandatangan"
                      rules={{ required: 'Mohon isi data jabatan' }}
                      render={({ field: { onChange } }) => (
                        <AutoComplete
                          onChange={value => onChange(value.value)}
                          label={'Jabatan Penandatangan'}
                          defaultValue={{
                            text: data?.jabatan_penandatangan || '',
                            value: data?.jabatan_penandatangan || '',
                          }}
                          onQueryChange={queryText => {
                            if (debounce.current) {
                              clearTimeout(debounce.current);
                            }
                            debounce.current = window.setTimeout(() => {
                              setQueryJabatan(queryText);
                            }, 500);
                          }}
                          options={(daftarJabatan?.list || []).map(each => ({
                            text: each.name,
                            value: each.name,
                          }))}
                        />
                      )}
                    />
                  )}
                  {errors.jabatan_penandatangan && (
                    <p className="mt-1 text-xs text-red-500">{errors.jabatan_penandatangan.message}</p>
                  )}
                </div>
                <div className="mt-5 sm:col-span-6">
                  <Controller
                    control={control}
                    name={'document_name'}
                    rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
                    render={({ field: { onChange, value } }) => (
                      <UploadWrapper
                        allowedTypes={['pdf']}
                        handleUploadChange={(files: FileObject[]) => {
                          setValue('document_uuid', files[0].id);
                          onChange(files[0].name);
                        }}
                      >
                        {({ loading }) => (
                          <div
                            className={classNames(
                              'flex items-center justify-between border-[1px] p-3',
                              errors.document_name ? 'border-red-500' : ''
                            )}
                          >
                            <div>
                              <div className="text-sm text-gray-600">{value || 'Bukti Pengangkatan'}</div>
                              <div className="text-xs text-gray-400">(pdf)</div>
                            </div>
                            <button
                              disabled={loading}
                              type="button"
                              className="inline-flex items-center rounded border border-green-300 bg-white px-2.5 py-1.5 text-xs font-medium text-green-700 shadow-sm hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:text-gray-300"
                            >
                              {loading ? <CircleProgress /> : null}
                              <UploadIcon className="mr-1 h-4" />
                              Upload
                            </button>
                          </div>
                        )}
                      </UploadWrapper>
                    )}
                  ></Controller>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {selectedId ? 'Ubah' : 'Tambah'} Riwayat Pengangkatan
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
