import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { CutiAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import { DelCutiReq, PostCutiRes } from '../../../types/api/CutiAPI';
import { Status } from '../../../types/Common';
import { callAPI } from '../../../utils/Fetchers';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  selectedId?: number;
  name?: string;
  date?: string;
}

interface FormState {
  id: number;
  status: number;
  alasan: string;
}

function BatalModal(props: ModalProps) {
  const { open, setOpen, selectedId, onSuccess, name, date} = props;
  const toggleModal = () => {
    setOpen(!open);
  };

  const dispatch = useDispatch();

  const {
    handleSubmit,
  } = useForm<FormState>();

  const submitHandler = async () => {
    const resSubmit = await callAPI<DelCutiReq, PostCutiRes>(
      CutiAPI.DEL_CUTI,
      {
        id: Number(selectedId),
      },
      { method: 'post' }
    );
    if (resSubmit.status === 200 && resSubmit.data?.status === Status.OK) {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Data berhasil diproses.',
          type: SnackbarType.INFO,
        })
      );
      setOpen(!open);
      onSuccess();
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal memroses data. Mohon coba beberapa saat lagi.',
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
                <h3 className="text-lg font-medium leading-6 text-gray-900">Batalkan Cuti</h3>
                <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
              </Dialog.Title>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="mt-5">
                    <p className='p-2 text-sm'>Anda yakin membatalkan cuti pegawai atas nama <b>{name}</b> pada tanggal <b>{date}</b> ?</p>
                    <br />
                  <button
                    type="submit"
                    className="w-full rounded border border-transparent bg-rose-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Yakin
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

export default BatalModal;
