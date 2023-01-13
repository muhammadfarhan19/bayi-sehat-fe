import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { CutiAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import { PostCutiRes, PutCutiReq } from '../../../types/api/CutiAPI';
import { Status } from '../../../types/Common';
import { callAPI } from '../../../utils/Fetchers';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  selectedId?: number;
}

interface FormState {
  id: number;
  status: number;
  alasan: string;
}

function KlaimModal(props: ModalProps) {
  const { open, setOpen, selectedId, onSuccess } = props;
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
    const resSubmit = await callAPI<PutCutiReq, PostCutiRes>(
      CutiAPI.PUT_CUTI,
      {
        id: Number(selectedId),
        status: Number(formData?.status),
        alasan: formData?.alasan,
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
      onSuccess();
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal menyimpan data. Mohon coba beberapa saat lagi.',
          type: SnackbarType.ERROR,
        })
      );
      setOpen(!open);
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
            <div className="my-8 inline-block w-full max-w-lg transform rounded-2xl bg-white p-6 text-left align-middle shadow-sm transition-all">
              <Dialog.Title as="div" className="flex justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Klaim Pengajuan Cuti dan Sakit</h3>
                <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
              </Dialog.Title>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <select
                      {...register('status', { required: 'Silahkan Pilih Status Klaim' })}
                      name="status"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value={''}>Silahkan Pilih</option>
                      <option value={2}>Disetujui</option>
                      <option value={-1}>Ditolak</option>
                    </select>
                    {errors.status && <p className="mt-1 text-xs text-red-500">{errors.status.message}</p>}
                  </div>
                  <div className="mt-5 sm:col-span-6">
                    <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                      Alasan
                    </label>
                    <div className="mt-1">
                      <textarea
                        {...register('alasan', {
                          required: watch('status') == -1 ? 'Silahkan Masukkan Alasan tolak' : false,
                        })}
                        className="inline-block h-24 w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                        name="alasan"
                      />
                      {errors.alasan && <p className="mt-1 text-xs text-red-500">{errors.alasan.message}</p>}
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
