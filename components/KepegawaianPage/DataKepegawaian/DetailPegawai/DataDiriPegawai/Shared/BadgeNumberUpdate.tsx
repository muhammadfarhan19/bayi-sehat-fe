import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../../action/CommonAction';
import { UserAPI } from '../../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../../reducer/CommonReducer';
import { MasterBadgeNumber } from '../../../../../../types/api/MasterAPI';
import { Status } from '../../../../../../types/Common';
import { callAPI } from '../../../../../../utils/Fetchers';
import { ContentLabelledItems } from '../../ProfileSummaryPegawai/Shared/PageComponents';
import { InputLabelled } from '../../RiwayatKeluarga/Shared/KeluargaComponents';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedPegawai?: number;
  pegawaiName?: string;
  pegawaiNip?: string;
  badgeNumberValue?: string;
}

function BadgeNumberUpdate(props: ModalProps) {
  const { open, setOpen, selectedPegawai, pegawaiName, pegawaiNip, badgeNumberValue } = props;
  const dispatch = useDispatch();

  const {
    formState: { errors },
    register,
    handleSubmit,
    setFocus,
    setValue,
  } = useForm<MasterBadgeNumber.Request>();

  React.useEffect(() => {
    if (open) {
      setFocus('badge_number');
    }
  }, [open]);

  React.useEffect(() => {
    if (open && badgeNumberValue) {
      setValue('badge_number', badgeNumberValue);
    }
  }, [open, badgeNumberValue]);

  const toggleModal = () => {
    setOpen(!open);
  };

  const submitHandler = async (formData: MasterBadgeNumber.Request) => {
    const resSubmit = await callAPI<MasterBadgeNumber.Request, MasterBadgeNumber.Response>(
      UserAPI.PUT_BADGE_NUMBER_USER,
      {
        peg_id: Number(selectedPegawai),
        badge_number: formData?.badge_number,
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
      setTimeout(() => window.location.reload(), 200);
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
              <div className="my-8 inline-block w-full max-w-lg transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="div" className="flex justify-between">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Update Badge Number</h3>
                  <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
                </Dialog.Title>
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className="mt-5 sm:col-span-6">
                    <ContentLabelledItems subtitle="Nama Pegawai" value={`: ${pegawaiName}`} />
                  </div>
                  <div className="mt-5 sm:col-span-6">
                    <ContentLabelledItems subtitle="NIP" value={`: ${pegawaiNip}`} />
                  </div>
                  <InputLabelled
                    name="badge_number"
                    type="text"
                    label="Badge Number"
                    isError={errors.badge_number}
                    errorMessage={errors.badge_number?.message}
                    validation={{ ...register('badge_number', { required: 'Silahkan Masukkan Badge Number Pegawai' }) }}
                  />
                  <div className="mt-5">
                    <div className="mt-5 flex flex-row space-x-5">
                      <button
                        onClick={toggleModal}
                        className="flex-1 rounded border border-red-600 bg-white px-2.5 py-1.5 text-center text-sm font-medium text-red-600 shadow-sm hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="flex-1 rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Update
                      </button>
                    </div>
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

export default BadgeNumberUpdate;
