import { Dialog, Transition } from '@headlessui/react';
import { UploadIcon, XIcon } from '@heroicons/react/outline';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { CutiAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import { PostCutiReq, PostCutiRes } from '../../../types/api/CutiAPI';
import { PegawaiData } from '../../../types/api/KepegawaianAPI';
import { Status } from '../../../types/Common';
import { classNames } from '../../../utils/Components';
import { callAPI } from '../../../utils/Fetchers';
import { PengajuanType } from '../../CutiSakitPage/Shared/_resource';
import { CircleProgress } from '../../shared/CircleProgress';
import UploadWrapper, { FileObject } from '../../shared/Input/UploadWrapper';
import { ContentLabelledItems } from '../DataKepegawaian/DetailPegawai/ProfileSummaryPegawai/Shared/PageComponents';
import {
  DropdownPicker,
  InputLabelled,
} from '../DataKepegawaian/DetailPegawai/RiwayatKeluarga/Shared/KeluargaComponents';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: PegawaiData;
}

interface FormState {
  pegawai_id: number;
  tanggal_klaim: string;
  jenis_pengajuan: number;
  catatan?: string;
  file_id: string;
  file_name: string;
  tanggal_selesai: string;
}

function JadwalCutiModal(props: ModalProps) {
  const { open, setOpen, data } = props;
  const dispatch = useDispatch();
  const timerHandleCloseModalOnFailed = 1_500;
  const {
    control,
    setValue,
    formState: { errors },
    register,
    resetField,
    handleSubmit,
  } = useForm<FormState>();
  const toggleModal = () => {
    setOpen(!open);
  };

  const submitHandler = async (formData: FormState) => {
    const resSubmit = await callAPI<PostCutiReq, PostCutiRes>(
      CutiAPI.POST_CUTI,
      {
        pegawai_id: Number(data?.pegawai_id),
        tanggal_klaim: formData?.tanggal_klaim,
        jenis_pengajuan: Number(formData?.jenis_pengajuan),
        tanggal_selesai: formData?.tanggal_selesai,
        catatan: formData?.catatan ?? '',
        unit_kerja_id: Number(data?.unit_kerja_id),
        files: [
          {
            document_name: formData?.file_name,
            document_uuid: formData?.file_id,
          },
        ],
      },
      { method: 'post' }
    );
    if (resSubmit.status === 200 && resSubmit?.data?.status === Status.OK) {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Data berhasil tersimpan.',
          type: SnackbarType.INFO,
        })
      );
      resetField('catatan');
      resetField('jenis_pengajuan');
      resetField('pegawai_id');
      resetField('tanggal_klaim');
      resetField('tanggal_selesai');
      resetField('file_id');
      resetField('file_name');
      toggleModal();
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal menyimpan data',
          type: SnackbarType.ERROR,
        })
      );
      setTimeout(() => {
        resetField('catatan');
        resetField('jenis_pengajuan');
        resetField('pegawai_id');
        resetField('tanggal_klaim');
        resetField('tanggal_selesai');
        resetField('file_id');
        resetField('file_name');
        toggleModal();
      }, timerHandleCloseModalOnFailed);
    }
  };

  return (
    <Transition appear show={props.open} as={React.Fragment}>
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
              <div className="flex flex-row items-center">
                <div className="flex w-full flex-row items-center justify-between">
                  <div>
                    <p className="text-gray-800">Klaim Jadwal Cuti</p>
                  </div>
                  <Dialog.Title as="div" className="flex">
                    <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
                  </Dialog.Title>
                </div>
              </div>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="mt-5 sm:col-span-6">
                  <ContentLabelledItems subtitle="Nama" value={`: ${data?.name ? data?.name : '-'}`} />
                </div>
                <div className="mt-5 sm:col-span-6">
                  <ContentLabelledItems subtitle="NIP" value={`: ${data?.nip ? data?.nip : '-'}`} />
                </div>
                <div className="mt-5 sm:col-span-6">
                  <ContentLabelledItems subtitle="Golongan" value={`: ${data?.golongan ? data?.golongan : '-'}`} />
                </div>
                <div className="mt-5 sm:col-span-6">
                  <ContentLabelledItems subtitle="Jabatan" value={`: ${data?.jabatan ? data?.jabatan : '-'}`} />
                </div>
                <div className="mt-5 sm:col-span-6">
                  <ContentLabelledItems
                    subtitle="Unit Kerja"
                    value={`: ${data?.unit_kerja ? data?.unit_kerja : '-'}`}
                  />
                </div>
                <div className="mt-5 sm:col-span-6">
                  <ContentLabelledItems subtitle="Kuota Cuti" value={`: ${data?.sisa_cuti ? data?.sisa_cuti : '-'}`} />
                </div>

                <InputLabelled
                  isError={errors.tanggal_klaim}
                  errorMessage={errors.tanggal_klaim?.message}
                  validation={{ ...register('tanggal_klaim', { required: 'Silahkan Pilih Tanggal Klaim' }) }}
                  name="tanggal_klaim"
                  type="date"
                  label="Tanggal Mulai"
                />
                <InputLabelled
                  isError={errors.tanggal_selesai}
                  errorMessage={errors.tanggal_selesai?.message}
                  validation={{ ...register('tanggal_selesai', { required: 'Silahkan Pilih Tanggal Selesai' }) }}
                  name="tanggal_selesai"
                  type="date"
                  label="Tanggal Selesai"
                />
                <DropdownPicker
                  isError={errors.jenis_pengajuan}
                  errorMessage={errors.jenis_pengajuan?.message}
                  validation={{ ...register('jenis_pengajuan', { required: 'Silahkan Pilih Jenis Pengajuan' }) }}
                  label="Jenis Pengajuan"
                  defaultOption="Silahkan Pilih"
                  firstValue={1}
                  firstOption="Cuti Tahunan"
                  secondValue={2}
                  secondOption="Cuti Sakit"
                  formVerification="jenis_pengajuan"
                  moreOptions={(PengajuanType || []).map(item => {
                    return (
                      <>
                        <option key={item.value} value={item.value}>
                          {item.text}
                        </option>
                      </>
                    );
                  })}
                />
                <div className="my-5">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Unggah Surat Dokter atau dokumen pendukung lainnya
                  </label>
                  <Controller
                    control={control}
                    name={'file_name'}
                    rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
                    render={({ field: { onChange, value } }) => (
                      <UploadWrapper
                        allowedTypes={['pdf']}
                        allowedSize={5_000_000}
                        handleUploadChange={(files: FileObject[]) => {
                          setValue('file_id', files[0].id);
                          onChange(files[0].name);
                        }}
                      >
                        {({ loading }) => (
                          <div
                            className={classNames(
                              'flex items-center justify-center space-x-2 rounded-md border-[1px] p-2',
                              errors.file_name ? 'border-red-500' : ''
                            )}
                          >
                            <div className="flex flex-1 flex-row items-center justify-center space-x-2 rounded-md bg-sky-100 px-2 py-2">
                              <div>
                                <div className="text-xs text-gray-400">
                                  {value || 'Masukan dokumen permohonan dalam bentuk PDF max 2mb'}
                                </div>
                              </div>
                              <button
                                disabled={loading}
                                type="button"
                                className="inline-flex items-center rounded border border-green-300 bg-white px-2.5 py-1.5 text-xs font-medium text-green-700 shadow-sm hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:text-gray-300"
                              >
                                {loading ? <CircleProgress /> : null}
                                <UploadIcon className="mr-1 h-2" />
                                Upload
                              </button>
                            </div>
                          </div>
                        )}
                      </UploadWrapper>
                    )}
                  />
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                    Alasan
                  </label>
                  <div className="mt-1">
                    <textarea
                      {...register('catatan', {
                        required: 'Silahkan Masukkan Alasan',
                      })}
                      className="inline-block h-24 w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                      name="catatan"
                    />
                    {errors.catatan && <p className="mt-1 text-xs text-red-500">{errors.catatan.message}</p>}
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-200 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                  >
                    Konfirmasi Status Pengajuan
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

export default JadwalCutiModal;
