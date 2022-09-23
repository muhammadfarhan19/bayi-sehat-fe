import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { KlaimKehadiranList } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import { PostKehadiranReqData, PostUpdatePengajuanReq } from '../../../types/api/KlaimKehadiranAPI';
import { Status } from '../../../types/Common';
import { callAPI } from '../../../utils/Fetchers';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedId?: number;
}

interface FormState {
  id: number;
  status_klaim: number;
  alasan_tolak: string;
}

function KlaimModal(props: ModalProps) {
  const { open, setOpen, selectedId } = props;
  const toggleModal = () => {
    setOpen(!open);
  };

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormState>();

  const submitHandler = async (formData: FormState) => {
    const resSubmit = await callAPI<PostUpdatePengajuanReq, PostKehadiranReqData>(
      KlaimKehadiranList.POST_KLAIM_KEHADIRAN_UPDATE,
      {
        id: Number(selectedId),
        status_klaim: Number(formData?.status_klaim),
        alasan_tolak: formData?.alasan_tolak,
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
      setOpen(!open);
      setTimeout(() => window.location.reload(), 1500);
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal menyimpan data. Mohon coba beberapa saat lagi.',
          type: SnackbarType.ERROR,
        })
      );
      setOpen(!open);
      setTimeout(() => window.location.reload(), 2000);
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
                <h3 className="text-lg font-medium leading-6 text-gray-900">Klaim Pengajuan Kehadiran</h3>
                <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
              </Dialog.Title>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <select
                      {...register('status_klaim', { required: 'Silahkan Pilih Status Klaim' })}
                      name="status_klaim"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value={''}>Silahkan Pilih</option>
                      <option value={2}>Disetujui</option>
                      <option value={3}>Ditolak</option>
                    </select>
                    {errors.status_klaim && <p className="mt-1 text-xs text-red-500">{errors.status_klaim.message}</p>}
                  </div>
                  <div className="mt-5 sm:col-span-6">
                    <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                      Alasan
                    </label>
                    <div className="mt-1">
                      <input
                        {...register('alasan_tolak', {
                          required: watch('status_klaim') == 3 ? 'Silahkan Masukkan Alasan tolak' : false,
                        })}
                        className="inline-block h-24 w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                        name="alasan_tolak"
                        type="text"
                      />
                      {errors.alasan_tolak && (
                        <p className="mt-1 text-xs text-red-500">{errors.alasan_tolak.message}</p>
                      )}
                    </div>
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
  );
}

export default KlaimModal;
