import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../action/CommonAction';
import { DaftarTransaksiAPI } from '../../../../constants/APIUrls';
import { SnackbarType } from '../../../../reducer/CommonReducer';
import { DaftarTransaksi } from '../../../../types/api/DaftarTransaksiAPI';
import { Status } from '../../../../types/Common';
import { callAPI } from '../../../../utils/Fetchers';
import { generateUniqueString } from '../../../../utils/StringUtil';
import { InputLabelled } from '../../DataKepegawaian/DetailPegawai/RiwayatKeluarga/Shared/KeluargaComponents';
import { ModalProps } from '../../RekapPresensiPage/DetailPage/Shared/ModalResend';

interface PengirimanUlangForm {
  formMonthAndYearValue: string;
  selectedMonth?: number;
  selectedYear?: number;
}

function PengirimanUlangForm(props: ModalProps & PengirimanUlangForm) {
  const { open, setOpen, formMonthAndYearValue = '' } = props;
  const toggleModal = () => {
    setOpen(!open);
  };
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<DaftarTransaksi.PostRequest>();

  const submitHandler = async (formData: DaftarTransaksi.PostRequest) => {
    if (props.selectedMonth && props.selectedYear) {
      const resSubmit = await callAPI<DaftarTransaksi.PostRequest, DaftarTransaksi.PostResponse>(
        DaftarTransaksiAPI.POST_TRANSAKSI,
        {
          kode: formData.kode,
          month: props.selectedMonth,
          year: props.selectedYear,
        },
        { method: 'post' }
      );
      if (resSubmit.status === 200 && resSubmit.data?.status === Status.OK) {
        dispatch(
          setSnackbar({
            show: true,
            message: `${resSubmit?.data?.data} .`,
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
    }
    return;
  };

  React.useEffect(() => {
    if (open) {
      setValue('kode', generateUniqueString());
    }
  }, [open]);

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
                <h3 className="text-lg font-medium leading-6 text-gray-900">Pengiriman Ulang Kehadiran</h3>
                <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
              </Dialog.Title>
              <form onSubmit={handleSubmit(submitHandler)}>
                <InputLabelled
                  isError={null}
                  errorMessage={null}
                  validation={null}
                  name="bulanDanTahun"
                  type="text"
                  value={formMonthAndYearValue}
                  label="Bulan dan Tahun"
                  isUneditable
                />
                <InputLabelled
                  isError={errors.kode}
                  maxLength={9}
                  errorMessage={errors.kode?.message}
                  validation={{ ...register('kode', { required: 'Silahkan Masukkan Kode', minLength: 9 }) }}
                  name="kode"
                  type="text"
                  label="Kode"
                  isUneditable
                />
                <div className="mt-5 sm:col-span-6"></div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
                  >
                    Buat Transaksi Sekarang
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

export default PengirimanUlangForm;
