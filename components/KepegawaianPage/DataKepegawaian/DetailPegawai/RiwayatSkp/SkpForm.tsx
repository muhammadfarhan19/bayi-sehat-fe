import { Dialog, Transition } from '@headlessui/react';
import { UploadIcon, XIcon } from '@heroicons/react/outline';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { RiwayatSKPAPI } from '../../../../../constants/APIUrls';
import { PredikatKinerjaPegawai, RatingPerilakuDanHasilKerja } from '../../../../../constants/Resource';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import {
  PostRiwayatSkpInsertRes,
  PostRiwayatSkpReq,
  PostRiwayatSkpUpdateRes,
  PutRiwayatSkpReq,
  RiwayatSkpData,
} from '../../../../../types/api/RiwayatSkpAPI';
import { Status } from '../../../../../types/Common';
import { classNames } from '../../../../../utils/Components';
import { callAPI } from '../../../../../utils/Fetchers';
import { CircleProgress } from '../../../../shared/CircleProgress';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import AutoComplete from '../../../../shared/Input/ComboBox';
import UploadWrapper, { FileObject } from '../../../../shared/Input/UploadWrapper';

interface UploadFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  detail?: RiwayatSkpData;
}

interface FormState {
  pegawai_id: number;
  tahun: number;
  file_id: string;
  file_name: string;
  document_uuid: string;
  document_name: string;
  rating_hasil_kerja: string;
  rating_perilaku_kerja: string;
  predikat_kinerja_pegawai: string;
}

export default function SkpForm(props: UploadFormProps) {
  const { open, setOpen, detail, onSuccess } = props;
  const dispatch = useDispatch();
  const personalData = usePersonalData();
  const toggleModal = () => {
    setOpen(!open);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormState>();

  const yearOptions: Array<number> = [];
  const year = new Date().getFullYear();
  for (let i = 1998; i <= year; i++) {
    yearOptions.push(i);
  }

  React.useEffect(() => {
    if (detail && detail?.files[0]?.document_uuid) {
      setValue('file_id', detail.files[0].document_uuid);
      setValue('file_name', detail.files[0].document_uuid);
      setValue('rating_hasil_kerja', detail.rating_hasil_kerja);
      setValue('rating_perilaku_kerja', detail.rating_perilaku_kerja);
      setValue('predikat_kinerja_pegawai', detail.predikat_kinerja_pegawai);
      setValue('tahun', detail?.tahun);
    }
  }, [detail]);

  const submitHandler = async (formData: FormState) => {
    let resSubmit;
    if (detail) {
      resSubmit = await callAPI<PutRiwayatSkpReq, PostRiwayatSkpUpdateRes>(
        RiwayatSKPAPI.PUT_RIWAYAT_SKP_V2,
        {
          riwayat_id: Number(detail?.riwayat_id),
          pegawai_id: Number(personalData?.pegawai_id),
          tahun: Number(formData.tahun),
          rating_hasil_kerja: formData?.rating_hasil_kerja,
          rating_perilaku_kerja: formData?.rating_perilaku_kerja,
          predikat_kinerja_pegawai: formData?.predikat_kinerja_pegawai,
          files: [
            {
              document_uuid: formData.file_id,
              document_name: formData.file_name,
            },
          ],
        },
        { method: 'post' }
      );
    } else {
      resSubmit = await callAPI<PostRiwayatSkpReq, PostRiwayatSkpInsertRes>(
        RiwayatSKPAPI.POST_RIWAYAT_SKP_V2,
        {
          pegawai_id: Number(personalData?.pegawai_id),
          tahun: Number(formData?.tahun),
          rating_hasil_kerja: formData?.rating_hasil_kerja,
          rating_perilaku_kerja: formData?.rating_perilaku_kerja,
          predikat_kinerja_pegawai: formData?.predikat_kinerja_pegawai,
          files: [
            {
              document_uuid: formData.file_id,
              document_name: formData.file_name,
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
                  {detail ? 'Ubah' : 'Tambah'} Riwayat SKP
                </h3>
                <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
              </Dialog.Title>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="nip" className="block text-sm font-medium text-gray-700">
                    NIP
                  </label>
                  <div className="mt-1">
                    <input
                      className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                      disabled={true}
                      name="nip"
                      type="text"
                      value={personalData?.nip}
                    />
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                    Nama
                  </label>
                  <div className="mt-1">
                    <input
                      className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                      disabled={true}
                      name="nama"
                      type="text"
                      value={personalData?.nama}
                    />
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <Controller
                    control={control}
                    name="tahun"
                    rules={{ required: 'Mohon masukkan tahun.' }}
                    render={({ field: { onChange } }) => (
                      <AutoComplete
                        onChange={value => onChange(value.value)}
                        label={'Tahun'}
                        defaultValue={(() => {
                          if (detail?.tahun) {
                            return {
                              text: String(detail?.tahun),
                              value: String(detail?.tahun),
                            };
                          }
                          return {
                            text: '',
                            value: '',
                          };
                        })()}
                        options={(yearOptions || [])?.map(each => {
                          return {
                            text: String(each),
                            value: String(each),
                          };
                        })}
                      />
                    )}
                  />
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Rating Hasil Kerja</label>
                  <div className="mt-1">
                    <select
                      {...register('rating_hasil_kerja', { required: 'Silahkan pilih Rating Hasil Kerja.' })}
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Semua</option>
                      {RatingPerilakuDanHasilKerja.map(item => (
                        <option key={item.id} value={item.textAsValue}>
                          {item.textAsValue}
                        </option>
                      ))}
                    </select>
                    {errors.rating_hasil_kerja && (
                      <p className="mt-1 text-xs text-red-500">{errors.rating_hasil_kerja.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Rating Perilaku Kerja</label>
                  <div className="mt-1">
                    <select
                      {...register('rating_perilaku_kerja', { required: 'Silahkan pilih Rating Perilaku Kerja.' })}
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Semua</option>
                      {RatingPerilakuDanHasilKerja.map(item => (
                        <option key={item.id} value={item.textAsValue}>
                          {item.textAsValue}
                        </option>
                      ))}
                    </select>
                    {errors.rating_perilaku_kerja && (
                      <p className="mt-1 text-xs text-red-500">{errors.rating_perilaku_kerja.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Predikat Kinerja Pegawai</label>
                  <div className="mt-1">
                    <select
                      {...register('predikat_kinerja_pegawai', {
                        required: 'Silahkan pilih Predikat Kinerja Pegawai.',
                      })}
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Semua</option>
                      {PredikatKinerjaPegawai.map(item => (
                        <option key={item.id} value={item.textAsValue}>
                          {item.textAsValue}
                        </option>
                      ))}
                    </select>
                    {errors.predikat_kinerja_pegawai && (
                      <p className="mt-1 text-xs text-red-500">{errors.predikat_kinerja_pegawai.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <Controller
                    control={control}
                    name={'file_name'}
                    rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
                    render={({ field: { onChange, value } }) => (
                      <UploadWrapper
                        allowedTypes={['pdf']}
                        handleUploadChange={(files: FileObject[]) => {
                          setValue('file_id', files[0].id);
                          onChange(files[0].name);
                        }}
                      >
                        {({ loading }) => (
                          <div
                            className={classNames(
                              'flex items-center justify-between border-[1px] p-3',
                              errors.file_name ? 'border-red-500' : ''
                            )}
                          >
                            <div>
                              <div className="text-sm text-gray-600">{value || 'Berkas'}</div>
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
                    {detail ? 'Ubah' : 'Tambah'} Riwayat SKP
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
