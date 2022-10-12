import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';
import id from 'date-fns/locale/id';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { LogHarianAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import { PostLogHarianInsert, PostLogHarianRes } from '../../../types/api/LogHarianAPI';
import { Status } from '../../../types/Common';
import { callAPI } from '../../../utils/Fetchers';
import usePersonalData from '../../shared/hooks/usePersonalData';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedId: any;
  onSuccess: () => void;
}

interface FormState {
  peg_id: number;
  date: string;
  summary: string[];
}

function FormLogHarianPPNPN(props: ModalProps) {
  const { open, setOpen, selectedId, onSuccess } = props;
  const toggleModal = () => {
    setOpen(!open);
  };
  const dispatch = useDispatch();
  const personalPegawaiData = usePersonalData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>();

  const submitHandler = async (formData: FormState) => {
    const resSubmit = await callAPI<PostLogHarianInsert, PostLogHarianRes>(
      LogHarianAPI.POST_LOG_HARIAN_INSERT,
      {
        peg_id: Number(personalPegawaiData?.pegawai_id),
        date: format(new Date(selectedId), 'yyyy-MM-dd', { locale: id }),
        summary: Array(formData?.summary),
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
      setOpen(!open);
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
            <div className="my-8 inline-block w-full max-w-lg transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="div" className="flex justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Form Pengisian Log Harian</h3>
                <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
              </Dialog.Title>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    {format(selectedId, 'EEEE, dd MMMM yyyy', { locale: id })}
                  </label>
                  <div className="mt-5 sm:col-span-6">
                    <label htmlFor="nama" className="block text-xs font-medium text-gray-700">
                      Isi Log / Jurnal Harian
                    </label>
                    <div className="mt-1">
                      <input
                        {...register('summary', {
                          required: 'Silahkan masukkan Log Harian',
                        })}
                        className="inline-block h-24 w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                        name="summary"
                        type="text"
                      />
                      {errors.summary && <p className="mt-1 text-xs text-red-500">{errors.summary.message}</p>}
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Simpan
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

export default FormLogHarianPPNPN;
