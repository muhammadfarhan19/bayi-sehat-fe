import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { RekapPresensiAPI } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import { type ResendLogPresensi } from '../../../../../types/api/RekapPresensiAPI';
import { Status } from '../../../../../types/Common';
import { callAPI } from '../../../../../utils/Fetchers';
import { InputLabelled } from '../../../DataKepegawaian/DetailPegawai/RiwayatKeluarga/Shared/KeluargaComponents';

export interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface FormState {
  date: string;
}

function ModalResend(props: ModalProps) {
  const { open, setOpen } = props;
  const dispatch = useDispatch();
  const toggleModal = () => {
    setOpen(!open);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormState>();

  const submitHandler = async (formData: FormState) => {
    const resSubmit = await callAPI<ResendLogPresensi.Request, ResendLogPresensi.Response>(
      RekapPresensiAPI.POST_RESEND_LOG,
      {
        date: formData.date,
      },
      { method: 'post' }
    );
    if (resSubmit.status === 200 && resSubmit.data?.status === Status.OK) {
      dispatch(
        setSnackbar({
          show: true,
          message: `Data berhasil dikirim sejumlah ${resSubmit?.data?.data?.total_data} data .`,
          type: SnackbarType.INFO,
        })
      );
      setOpen(!open);
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal mengirim data. Mohon coba beberapa saat lagi.',
          type: SnackbarType.ERROR,
        })
      );
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
              <Dialog.Title as="div" className="flex justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Pengiriman Ulang Kehadiran</h3>
                <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
              </Dialog.Title>
              <form onSubmit={handleSubmit(submitHandler)}>
                <InputLabelled
                  isError={errors.date}
                  errorMessage={errors.date?.message}
                  validation={{ ...register('date', { required: 'Silahkan Pilih Tanggal' }) }}
                  name="date"
                  type="date"
                  label="tanggal"
                />
                <div className="mt-5 sm:col-span-6"></div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
                  >
                    Kirim
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

export default ModalResend;
