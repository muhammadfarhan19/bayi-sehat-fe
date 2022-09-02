import { Dialog, Transition } from '@headlessui/react';
import { UploadIcon, XIcon } from '@heroicons/react/outline';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { RiwayatPenghargaan } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import { PostArsipDigitalUpdateRes } from '../../../../../types/api/ArsipDigitalAPI';
import {
  PenghargaanList,
  PostPenghargaanInsertReq,
  PostPenghargaanInsertRes,
  PostPenghargaanUpdateReq,
} from '../../../../../types/api/RiwayatPenghargaanAPI';
import { Status } from '../../../../../types/Common';
import { classNames } from '../../../../../utils/Components';
import { callAPI } from '../../../../../utils/Fetchers';
import { CircleProgress } from '../../../../shared/CircleProgress';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import UploadWrapper, { FileObject } from '../../../../shared/Input/UploadWrapper';

interface UploadFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedId?: number;
  onSuccess: () => void;
  data: PenghargaanList[] | undefined | null;
}

interface FormState {
  pegawai_id: number;
  nama_penghargaan: string;
  tingkat_penghargaan: string;
  penyelenggara: string;
  keterangan: string;
  no_penghargaan: string;
  tgl_penghargaan: string;
  document_uuid: string;
  file_id: string;
  file_name: string;
}

export default function PendidikanForm(props: UploadFormProps) {
  const { open, setOpen, selectedId, onSuccess, data } = props;
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

  const submitHandler = async (formData: FormState) => {
    let resSubmit;
    if (selectedId) {
      resSubmit = await callAPI<PostPenghargaanUpdateReq, PostArsipDigitalUpdateRes>(
        RiwayatPenghargaan.POST_RIWAYAT_PENGHARGAAN_UPDATE,
        {
          riwayat_id: Number(selectedId),
          pegawai_id: Number(personalData?.pegawai_id),
          nama_penghargaan: formData.nama_penghargaan,
          tingkat_penghargaan: formData.tingkat_penghargaan,
          penyelenggara: formData.penyelenggara,
          keterangan: formData.keterangan,
          no_penghargaan: formData.no_penghargaan,
          tgl_penghargaan: formData.tgl_penghargaan,
          bukti_penghargaan: [
            {
              document_uuid: formData.file_id,
              document_name: formData.file_name,
            },
          ],
        },
        { method: 'post' }
      );
    } else {
      resSubmit = await callAPI<PostPenghargaanInsertReq, PostPenghargaanInsertRes>(
        RiwayatPenghargaan.POST_RIWAYAT_PENGHARGAAN_INSERT,
        {
          pegawai_id: Number(personalData?.pegawai_id),
          nama_penghargaan: formData.nama_penghargaan,
          tingkat_penghargaan: formData.tingkat_penghargaan,
          penyelenggara: formData.penyelenggara,
          keterangan: formData.keterangan,
          no_penghargaan: formData.no_penghargaan,
          tgl_penghargaan: formData.tgl_penghargaan,
          bukti_penghargaan: [
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
                  {selectedId ? 'Ubah' : 'Tambah'} Riwayat Penghargaan
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
                  <label className="block text-sm font-medium text-gray-700">Tingkat Penghargaan</label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <select
                      defaultValue={selectedId ? data?.map(data => data.tingkat_penghargaan) : undefined}
                      {...register('tingkat_penghargaan', { required: 'Silahkan Pilih tingkat penghargaan' })}
                      name="tingkat_penghargaan"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value={''}>Silahkan Pilih</option>
                      <option value={'Internasional'}>Internasional</option>
                      <option value={'Nasional'}>Nasional</option>
                      <option value={'Kementerian'}>Kementerian</option>
                      <option value={'Provinsi'}>Provinsi</option>
                      <option value={'Kabupaten/Kota'}>Kabupaten/Kota</option>
                      <option value={'Unit Kerja'}>Unit Kerja</option>
                      <option value={'Lainnya'}>Lainnya</option>
                    </select>
                    {errors.tingkat_penghargaan && (
                      <p className="mt-1 text-xs text-red-500">{errors.tingkat_penghargaan.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Nama Penghargaaan</label>
                  <div className="mt-1">
                    <input
                      {...register('nama_penghargaan', { required: 'Silahkan masukan nama penghargaan' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="nama_penghargaan"
                      type="text"
                      defaultValue={selectedId ? data?.map(data => data.nama_penghargaan) : undefined}
                    />
                    {errors.nama_penghargaan && (
                      <p className="mt-1 text-xs text-red-500">{errors.nama_penghargaan.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Penyelenggara</label>
                  <div className="mt-1">
                    <input
                      defaultValue={selectedId ? data?.map(data => data.penyelenggara) : undefined}
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
                  <label className="block text-sm font-medium text-gray-700">Keterangan</label>
                  <div className="mt-1">
                    <input
                      defaultValue={selectedId ? data?.map(data => data.keterangan) : undefined}
                      {...register('keterangan', { required: 'Silahkan masukan keterangan.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="keterangan"
                      type="text"
                    />
                    {errors.keterangan && <p className="mt-1 text-xs text-red-500">{errors.keterangan.message}</p>}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Nomor Penghargaan</label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      defaultValue={selectedId ? data?.map(data => data.no_penghargaan) : undefined}
                      {...register('no_penghargaan', { required: 'Silahkan masukan nomor penghargaan.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="no_penghargaan"
                      type="text"
                    />
                    {errors.no_penghargaan && (
                      <p className="mt-1 text-xs text-red-500">{errors.no_penghargaan.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="tgl_lulus" className="block text-sm font-medium text-gray-700">
                    Tanggal Penghargaan
                  </label>
                  <div className="mt-1">
                    <input
                      defaultValue={selectedId ? data?.map(data => data.tgl_penghargaan) : undefined}
                      {...register('tgl_penghargaan', { required: 'Silahkan masukan tanggal penghargaan.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="tgl_penghargaan"
                      type="date"
                    />
                    {errors.tgl_penghargaan && (
                      <p className="mt-1 text-xs text-red-500">{errors.tgl_penghargaan.message}</p>
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
                              <div className="text-sm text-gray-600">{value || 'Bukti Penghargaan'}</div>
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
                    {selectedId ? 'Ubah' : 'Tambah'} Riwayat Penghargaan
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
