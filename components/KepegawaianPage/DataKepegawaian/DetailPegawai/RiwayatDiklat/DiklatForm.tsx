import { Dialog, Transition } from '@headlessui/react';
import { UploadIcon, XIcon } from '@heroicons/react/outline';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { RiwayatDiklatAPI } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import {
  GetRiwayatDiklatDetailReq,
  PostRiwayatDiklatInsertReq,
  PostRiwayatDiklatInsertRes,
  PostRiwayatDiklatUpdateReq,
  PostRiwayatDiklatUpdateRes,
  RiwayatDiklatDetailData,
} from '../../../../../types/api/RiwayatDiklatAPI';
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
  jenis_diklat_id: number;
  nama_diklat: string;
  penyelenggara: string;
  no_sertifikat: string;
  lokasi: string;
  keterangan: string;
  tgl_awal_acara: string;
  tgl_akhir_acara: string;
  document_uuid: string;
  document_name: string;
  tgl_sertifikat: string;
}

export default function DiklatForm(props: UploadFormProps) {
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
  } = useForm<FormState>();

  const { data } = useCommonApi<GetRiwayatDiklatDetailReq, RiwayatDiklatDetailData>(
    RiwayatDiklatAPI.GET_RIWAYAT_DIKLAT_DETAIL,
    { id: Number(selectedId) },
    { method: 'GET' },
    { skipCall: !selectedId, revalidateOnMount: true }
  );

  React.useEffect(() => {
    if (data && data?.files[0]?.document_uuid) {
      setValue('file_id', data.files[0].document_uuid);
      setValue('file_name', data.files[0].document_uuid);
      setValue('jenis_diklat_id', data.jenis_diklat_id);
      setValue('nama_diklat', data.nama_diklat);
      setValue('penyelenggara', data.penyelenggara);
      setValue('no_sertifikat', data.no_sertifikat);
      setValue('lokasi', data.lokasi);
      setValue('tgl_awal_acara', data.tgl_awal_acara);
      setValue('tgl_akhir_acara', data.tgl_akhir_acara);
      setValue('tgl_sertifikat', data?.tgl_sertifikat);
      setValue('keterangan', data.keterangan);
    }
  }, [data]);

  const submitHandler = async (formData: FormState) => {
    let resSubmit;
    if (selectedId) {
      resSubmit = await callAPI<PostRiwayatDiklatUpdateReq, PostRiwayatDiklatUpdateRes>(
        RiwayatDiklatAPI.POST_RIWAYAT_DIKLAT_UPDATE,
        {
          riwayat_id: Number(selectedId),
          pegawai_id: Number(personalData?.pegawai_id),
          jenis_diklat_id: Number(formData.jenis_diklat_id),
          nama_diklat: formData.nama_diklat,
          penyelenggara: formData.penyelenggara,
          no_sertifikat: formData.no_sertifikat,
          lokasi: formData.lokasi,
          keterangan: formData.keterangan,
          tgl_awal_acara: formData.tgl_awal_acara,
          tgl_akhir_acara: formData.tgl_akhir_acara,
          files: [
            {
              document_uuid: formData.file_id,
              document_name: formData.file_name,
            },
          ],
          tgl_sertifikat: formData?.tgl_sertifikat,
        },
        { method: 'put' }
      );
    } else {
      resSubmit = await callAPI<PostRiwayatDiklatInsertReq, PostRiwayatDiklatInsertRes>(
        RiwayatDiklatAPI.POST_RIWAYAT_DIKLAT_INSERT,
        {
          pegawai_id: Number(personalData?.pegawai_id),
          jenis_diklat_id: Number(formData.jenis_diklat_id),
          nama_diklat: formData.nama_diklat,
          penyelenggara: formData.penyelenggara,
          no_sertifikat: formData.no_sertifikat,
          lokasi: formData.lokasi,
          keterangan: formData.keterangan,
          tgl_awal_acara: formData.tgl_awal_acara,
          tgl_akhir_acara: formData.tgl_akhir_acara,
          files: [
            {
              document_uuid: formData.file_id,
              document_name: formData.file_name,
            },
          ],
          tgl_sertifikat: '2022-09-10',
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
                  {selectedId ? 'Ubah' : 'Tambah'} Riwayat Pelatihan/ Diklat
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
                  <label className="block text-sm font-medium text-gray-700">Jenis Diklat/Pelatihan</label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <select
                      {...register('jenis_diklat_id', { required: 'Silahkan pilih jenis diklat.' })}
                      name="jenis_diklat_id"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value={''}>Silahkan Pilih</option>
                      <option value={1}>DIKLAT TEKNIS</option>
                      <option value={2}>DIKLAT FUNGSIONAL</option>
                      <option value={3}>DIKLAT JABATAN</option>
                    </select>
                    {errors.jenis_diklat_id && (
                      <p className="mt-1 text-xs text-red-500">{errors.jenis_diklat_id.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Nama Diklat/Pelatihan/Seminar</label>
                  <div className="mt-1">
                    <input
                      {...register('nama_diklat', { required: 'Silahkan masukan nama diklat.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="nama_diklat"
                      type="text"
                    />
                    {errors.nama_diklat && <p className="mt-1 text-xs text-red-500">{errors.nama_diklat.message}</p>}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Penyelenggara</label>
                  <div className="mt-1">
                    <input
                      {...register('penyelenggara', { required: 'Silahkan masukan nama penyelenggara.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="penyelenggara"
                      type="text"
                    />
                    {errors.penyelenggara && (
                      <p className="mt-1 text-xs text-red-500">{errors.penyelenggara.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">No Sertifikat</label>
                  <div className="mt-1">
                    <input
                      {...register('no_sertifikat', { required: 'Silahkan masukan nomor sertifikat.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="no_sertifikat"
                      type="text"
                    />
                    {errors.no_sertifikat && (
                      <p className="mt-1 text-xs text-red-500">{errors.no_sertifikat.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Lokasi</label>
                  <div className="mt-1">
                    <input
                      {...register('lokasi', { required: 'Silahkan masukan lokasi.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="lokasi"
                      type="text"
                    />
                    {errors.lokasi && <p className="mt-1 text-xs text-red-500">{errors.lokasi.message}</p>}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="tgl_awal_acara" className="block text-sm font-medium text-gray-700">
                    Tanggal Awal Acara
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('tgl_awal_acara', { required: 'Silahkan masukan tanggal awal acara.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="tgl_awal_acara"
                      type="date"
                    />
                    {errors.tgl_awal_acara && (
                      <p className="mt-1 text-xs text-red-500">{errors.tgl_awal_acara.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="tgl_akhir_acara" className="block text-sm font-medium text-gray-700">
                    Tanggal Akhir Acara
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('tgl_akhir_acara', { required: 'Silahkan masukan tanggal akhir acara.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="tgl_akhir_acara"
                      type="date"
                    />
                    {errors.tgl_akhir_acara && (
                      <p className="mt-1 text-xs text-red-500">{errors.tgl_akhir_acara.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="tgl_awal_acara" className="block text-sm font-medium text-gray-700">
                    Tanggal Sertifikat
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('tgl_sertifikat', { required: 'Silahkan masukan tanggal sertifikat.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="tgl_sertifikat"
                      type="date"
                    />
                    {errors.tgl_sertifikat && (
                      <p className="mt-1 text-xs text-red-500">{errors.tgl_sertifikat.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700">
                    Keterangan
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('keterangan', { required: 'Silahkan masukan keterangan.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="keterangan"
                      type="text"
                    />
                    {errors.keterangan && <p className="mt-1 text-xs text-red-500">{errors.keterangan.message}</p>}
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
                    {selectedId ? 'Ubah' : 'Tambah'} Riwayat Pelatihan/ Diklat
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
