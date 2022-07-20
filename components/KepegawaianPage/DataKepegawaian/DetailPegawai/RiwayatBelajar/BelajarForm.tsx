import { Dialog, Transition } from '@headlessui/react';
import { UploadIcon, XIcon } from '@heroicons/react/outline';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { RiwayatBelajarAPI } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import {
  GetRiwayatBelajarDetailReq,
  PostRiwayatBelajarInsertReq,
  PostRiwayatBelajarInsertRes,
  PostRiwayatBelajarUpdateReq,
  PostRiwayatBelajarUpdateRes,
  RiwayatBelajarDetailData,
} from '../../../../../types/api/RiwayatBelajarAPI';
import { Status } from '../../../../../types/Common';
import { classNames } from '../../../../../utils/Components';
import { callAPI } from '../../../../../utils/Fetchers';
import { CircleProgress } from '../../../../shared/CircleProgress';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import UploadWrapper, { FileObject } from '../../../../shared/Input/UploadWrapper';

interface UploadFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedId?: string;
  onSuccess: () => void;
}

interface FormState {
  pegawai_id: number;
  file_id: string;
  file_name: string;
  jenis_belajar: string;
  jenjang_id: number;
  nama_institusi: string;
  prodi: string;
  sumber_biaya: string;
  kota: string;
  lokasi: number;
  status_riwayat_belajar: number;
  tahun_mulai: string;
  tahun_selesai: string;
  document_uuid: string;
  document_name: string;
}

export default function BelajartForm(props: UploadFormProps) {
  const { open, setOpen, selectedId, onSuccess } = props;
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
    watch,
  } = useForm<FormState>();

  const { data } = useCommonApi<GetRiwayatBelajarDetailReq, RiwayatBelajarDetailData>(
    RiwayatBelajarAPI.GET_RIWAYAT_BELAJAR_DETAIl,
    { riwayat_id: Number(selectedId) },
    { method: 'GET' },
    { skipCall: !selectedId, revalidateOnMount: true }
  );

  React.useEffect(() => {
    if (data && data?.files[0]?.document_uuid) {
      setValue('file_id', data?.files[0]?.document_uuid);
      setValue('file_name', data?.files[0]?.document_name);
      setValue('jenis_belajar', String(data?.jenis_belajar));
      setValue('jenjang_id', data?.jenjang_id);
      setValue('nama_institusi', data?.nama_institusi);
      setValue('prodi', data?.prodi);
      setValue('sumber_biaya', data?.sumber_biaya);
      setValue('kota', data?.kota);
      setValue('lokasi', data?.lokasi);
      setValue('status_riwayat_belajar', data?.status_riwayat_belajar);
      setValue('tahun_mulai', data?.tahun_mulai);
      setValue('tahun_selesai', data?.tahun_selesai);
    }
  }, [data]);

  const submitHandler = async (formData: FormState) => {
    let resSubmit;
    if (selectedId) {
      resSubmit = await callAPI<PostRiwayatBelajarUpdateReq, PostRiwayatBelajarUpdateRes>(
        RiwayatBelajarAPI.POST_RIWAYAT_BELAJAR_UPDATE,
        {
          riwayat_id: Number(selectedId),
          pegawai_id: Number(personalData?.pegawai_id),
          jenis_belajar: Number(formData.jenis_belajar),
          jenjang_id: Number(formData.jenjang_id),
          nama_institusi: formData.nama_institusi,
          prodi: formData.prodi,
          sumber_biaya: formData.sumber_biaya,
          kota: formData.kota,
          lokasi: Number(formData.lokasi),
          status_riwayat_belajar: Number(formData.status_riwayat_belajar),
          tahun_mulai: formData.tahun_mulai,
          tahun_selesai: formData.tahun_selesai,
          files: [
            {
              document_uuid: formData.file_id,
              document_name: formData.file_name,
            },
          ],
        },
        { method: 'put' }
      );
    } else {
      resSubmit = await callAPI<PostRiwayatBelajarInsertReq, PostRiwayatBelajarInsertRes>(
        RiwayatBelajarAPI.POST_RIWAYAT_BELAJAR_INSERT,
        {
          pegawai_id: Number(personalData?.pegawai_id),
          jenis_belajar: Number(formData.jenis_belajar),
          jenjang_id: Number(formData.jenjang_id),
          nama_institusi: formData.nama_institusi,
          prodi: formData.prodi,
          sumber_biaya: formData.sumber_biaya,
          kota: formData.kota,
          lokasi: Number(formData.lokasi),
          status_riwayat_belajar: Number(formData.status_riwayat_belajar),
          tahun_mulai: formData.tahun_mulai,
          tahun_selesai: formData.tahun_selesai,
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
                  {selectedId ? 'Ubah' : 'Tambah'} Riwayat Belajar
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
                  <label className="block text-sm font-medium text-gray-700">Jenis Belajar</label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <select
                      {...register('jenis_belajar', { required: 'Silahkan pilih jenis belajar.' })}
                      name="jenis_belajar"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value={''}>Silahkan Pilih</option>
                      <option value={1}>Tugas Belajar</option>
                      <option value={2}>Izin Belajar</option>
                    </select>
                    {errors.jenis_belajar && (
                      <p className="mt-1 text-xs text-red-500">{errors.jenis_belajar.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Jenjang</label>
                  <select
                    {...register('jenjang_id', { required: 'Silahkan pilih jenjang pendidikan.' })}
                    name="jenjang_id"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value={''}>Silahkan Pilih</option>
                    <option value={'11'}>Profesi</option>
                    <option value={'1'}>S3</option>
                    <option value={'13'}>S3-Terapan</option>
                    <option value={'2'}>S2</option>
                    <option value={'12'}>S2-Terapan</option>
                    <option value={'3'}>S1</option>
                    <option value={'14'}>Sp-1</option>
                    <option value={'15'}>Sp-2</option>
                    <option value={'10'}>D4</option>
                    <option value={'4'}>D3</option>
                    <option value={'9'}>D2</option>
                    <option value={'6'}>D1</option>
                    <option value={'5'}>SMA</option>
                    <option value={'8'}>SMK</option>
                    <option value={'16'}>SMP</option>
                    <option value={'7'}>SD</option>
                  </select>
                  {errors.jenjang_id && <p className="mt-1 text-xs text-red-500">{errors.jenjang_id.message}</p>}
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Nama Institusi</label>
                  <div className="mt-1">
                    <input
                      {...register('nama_institusi', { required: 'Silahkan masukan nama institusi.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="nama_institusi"
                      type="text"
                    />
                    {errors.nama_institusi && (
                      <p className="mt-1 text-xs text-red-500">{errors.nama_institusi.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Prodi / Jurusan</label>
                  <div className="mt-1">
                    <input
                      {...register('prodi', { required: 'Silahkan masukan prodi/jurusan.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="prodi"
                      type="text"
                    />
                    {errors.prodi && <p className="mt-1 text-xs text-red-500">{errors.prodi.message}</p>}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Sumber Biaya</label>
                  <div className="mt-1">
                    <input
                      {...register('sumber_biaya', { required: 'Silahkan masukan sumber biaya.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="sumber_biaya"
                      type="text"
                    />
                    {errors.sumber_biaya && <p className="mt-1 text-xs text-red-500">{errors.sumber_biaya.message}</p>}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="kota" className="block text-sm font-medium text-gray-700">
                    Kota
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('kota', { required: 'Silahkan masukan kota.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="kota"
                      type="text"
                    />
                    {errors.kota && <p className="mt-1 text-xs text-red-500">{errors.kota.message}</p>}
                  </div>
                </div>

                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="lokasi" className="block text-sm font-medium text-gray-700">
                    Lokasi Pendidikan
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <select
                      {...register('lokasi', { required: 'Silahkan masukan lokasi pendidikan.' })}
                      name="lokasi"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value={''}>Silahkan Pilih</option>
                      <option value={1}>Dalam Negeri</option>
                      <option value={2}>Luar Negeri</option>
                    </select>
                    {errors.lokasi && <p className="mt-1 text-xs text-red-500">{errors.lokasi.message}</p>}
                  </div>
                </div>

                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="status_riwayat_belajar" className="block text-sm font-medium text-gray-700">
                    Baru / Perpanjangan
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <select
                      {...register('status_riwayat_belajar', { required: 'Silahkan pilih baru/perpanjangan.' })}
                      name="status_riwayat_belajar"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value={''}>Silahkan Pilih</option>
                      <option value={1}>Perpanjangan</option>
                      <option value={2}>Baru</option>
                    </select>
                    {errors.status_riwayat_belajar && (
                      <p className="mt-1 text-xs text-red-500">{errors.status_riwayat_belajar.message}</p>
                    )}
                  </div>
                </div>

                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="tahun_mulai" className="block text-sm font-medium text-gray-700">
                    Tanggal Awal
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('tahun_mulai', {
                        validate: {
                          required: value => {
                            if (value === '') {
                              return 'Silahkan masukan tanggal awal.';
                            } else if (watch('tahun_selesai') !== '') {
                              if (value > watch('tahun_selesai')) {
                                return 'Tanggal awal tidak boleh lebih besar dari tanggal akhir.';
                              }
                            } else {
                              return true;
                            }
                          },
                        },
                      })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="tahun_mulai"
                      type="date"
                    />
                    {errors.tahun_mulai && <p className="mt-1 text-xs text-red-500">{errors.tahun_mulai.message}</p>}
                  </div>
                </div>

                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="tahun_selesai" className="block text-sm font-medium text-gray-700">
                    Tanggal Akhir
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('tahun_selesai', {
                        validate: {
                          required: value => {
                            if (value === '') {
                              return 'Silahkan masukan tanggal akhir';
                            } else if (watch('tahun_mulai') !== '') {
                              if (value < watch('tahun_mulai')) {
                                return 'Tanggal akhir tidak boleh lebih kecil dari tanggal awal.';
                              }
                            } else {
                              return true;
                            }
                          },
                        },
                      })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="tahun_selesai"
                      type="date"
                    />
                    {errors.tahun_selesai && (
                      <p className="mt-1 text-xs text-red-500">{errors.tahun_selesai.message}</p>
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
                              <div className="text-sm text-gray-600">{value || 'Bukti SK'}</div>
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
                    {selectedId ? 'Ubah' : 'Tambah'} Riwayat Belajar
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
