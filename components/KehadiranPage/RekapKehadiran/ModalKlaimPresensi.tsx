import { Dialog, Transition } from '@headlessui/react';
import { UploadIcon, XIcon } from '@heroicons/react/outline';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { KlaimKehadiranList } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import { PostKehadiranData, PostKehadiranReqData } from '../../../types/api/KlaimKehadiranAPI';
import { Status } from '../../../types/Common';
import { classNames } from '../../../utils/Components';
import { callAPI } from '../../../utils/Fetchers';
import {
  DropdownPicker,
  InputLabelled,
} from '../../KepegawaianPage/DataKepegawaian/DetailPegawai/RiwayatKeluarga/Shared/KeluargaComponents';
import { CircleProgress } from '../../shared/CircleProgress';
import UploadWrapper, { FileObject } from '../../shared/Input/UploadWrapper';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  selectedId?: number;
  pegId?: number;
  selectedDate?: string;
  pegawaiName?: string;
}

interface FormState {
  user_id: number;
  unit_kerja_id: number;
  tanggal_klaim: string;
  jenis_pengajuan: string;
  alasan_klaim: string;
  file_id: string;
  file_name: string;
}

function ModalKlaimPresensi(props: ModalProps) {
  const { open, setOpen, onSuccess, pegId, selectedDate, pegawaiName } = props;

  const dispatch = useDispatch();

  const toggleModal = () => {
    setOpen(!open);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormState>();

  React.useEffect(() => {
    setValue('tanggal_klaim', String(selectedDate));
  }, [open]);

  const submitHandler = async (formData: FormState) => {
    const resSubmit = await callAPI<PostKehadiranData, PostKehadiranReqData>(
      KlaimKehadiranList.POST_KLAIM_KEHADIRAN_POST,
      {
        peg_id: Number(pegId),
        tanggal_klaim: String(selectedDate),
        alasan_klaim: formData?.alasan_klaim,
        jenis_pengajuan: formData?.jenis_pengajuan,
        files: [
          {
            document_uuid: formData.file_id,
            document_name: formData.file_name,
          },
        ],
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
      onSuccess();
      window.location.reload();
    } else if (resSubmit.status === 400 && resSubmit.data?.status === 'KLAIM_REACH_LIMIT') {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal menyimpan data. Klaim melebihi Kuota',
          type: SnackbarType.ERROR,
        })
      );
      setTimeout(() => window.location.reload(), 3000);
    } else if (resSubmit.status === 400 && resSubmit.data?.status === 'KLAIM_SUDAH_MELEWATI_BATAS_WAKTU') {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal menyimpan data. Klaim melebihi Batas Waktu',
          type: SnackbarType.ERROR,
        })
      );
      setTimeout(() => window.location.reload(), 3000);
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal menyimpan data. mohon coba beberapa saat lagi.',
          type: SnackbarType.ERROR,
        })
      );
      setTimeout(() => window.location.reload(), 3000);
    }
  };

  return (
    <>
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
              <div className="my-8 inline-block w-full max-w-lg transform rounded-2xl bg-white p-6 text-left align-middle shadow-sm transition-all">
                <Dialog.Title as="div" className="flex justify-between">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Klaim Kehadiran</h3>
                  <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
                </Dialog.Title>
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className="overflow-hidden rounded-lg bg-white py-1">
                    <InputLabelled
                      isError={null}
                      isUneditable={true}
                      errorMessage={null}
                      validation={null}
                      name="nama"
                      value={pegawaiName}
                      type="text"
                      label="Nama"
                    />

                    <InputLabelled
                      isError={errors.tanggal_klaim}
                      onChange={e => alert(e)}
                      errorMessage={errors.tanggal_klaim?.message}
                      validation={{
                        ...register('tanggal_klaim', { required: 'Silahkan Pilih Tanggal Klaim Kehadiran' }),
                      }}
                      name="tanggal_klaim"
                      type="date"
                      label="Tanggal Klaim"
                    />

                    <DropdownPicker
                      isError={errors.jenis_pengajuan}
                      errorMessage={errors.jenis_pengajuan?.message}
                      validation={{ ...register('jenis_pengajuan', { required: 'Silahkan Pilih Jenis Pengajuan' }) }}
                      label="Jenis Pengajuan"
                      defaultOption="Silahkan Pilih"
                      firstValue={'Jam Kerja Masuk'}
                      secondValue={'Jam Kerja Pulang'}
                      firstOption="Jam Kerja Masuk"
                      secondOption="Jam Kerja Pulang"
                      formVerification="jenis_pengajuan"
                    />
                    <InputLabelled
                      isError={errors.alasan_klaim}
                      errorMessage={errors.alasan_klaim?.message}
                      validation={{ ...register('alasan_klaim', { required: 'Silahkan Masukkan Alasan Klaim' }) }}
                      name="alasan_klaim"
                      type="text"
                      label="Alasan"
                    />
                    <div className="mt-5 sm:col-span-6">
                      <label className="mb-2 block text-sm font-medium text-gray-700">Unggah Berkas Presensi</label>
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
                                  'flex items-center justify-center space-x-2 rounded-md border-[1px] p-2',
                                  errors.file_name ? 'border-red-500' : ''
                                )}
                              >
                                <div className="flex flex-1 flex-row items-center justify-center space-x-3 rounded-md bg-sky-100 py-2">
                                  <div>
                                    <div className="text-xs text-gray-400">
                                      {value || 'Masukan dokumen permohonan dalam bentuk PDF max 2mb'}
                                    </div>
                                  </div>
                                  <button
                                    disabled={loading}
                                    type="button"
                                    className="inline-flex items-center rounded border border-green-300 bg-white px-2 py-1 text-xs font-medium text-green-700 shadow-sm hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:text-gray-300"
                                  >
                                    {loading ? <CircleProgress /> : null}
                                    <UploadIcon className="mr-1 h-4" />
                                    Upload
                                  </button>
                                </div>
                              </div>
                            )}
                          </UploadWrapper>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <button
                      type="submit"
                      className="w-full rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Klaim
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default ModalKlaimPresensi;
