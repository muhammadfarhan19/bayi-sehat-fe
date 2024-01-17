import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../action/CommonAction';
import { SummaryAPI } from '../../../../constants/APIUrls';
import { SnackbarType } from '../../../../reducer/CommonReducer';
import { DaftarTransaksi } from '../../../../types/api/DaftarTransaksiAPI';
import { SummaryDownloadRangedMonthReq, SummaryDownloadRes } from '../../../../types/api/SummaryAPI';
import { callAPI } from '../../../../utils/Fetchers';
import { ModalProps } from '../../RekapPresensiPage/DetailPage/Shared/ModalResend';

interface SummaryMonthlyModal {
  formMonthAndYearValue: string;
  selectedMonth?: number;
  selectedYear?: number;
  onSuccess: () => void;
}

function SummaryMonthlyModal(props: ModalProps & SummaryMonthlyModal) {
  const { open, setOpen } = props;
  //const [isLoading, setIsLoading] = React.useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };
  const dispatch = useDispatch();
  const { handleSubmit } = useForm<DaftarTransaksi.PostRequest>();

  const submitHandler = async () => {
    //setIsLoading(true);
    const callApiDownload = await callAPI<SummaryDownloadRangedMonthReq, SummaryDownloadRes>(
      SummaryAPI.GET_SUMMARY_EXPORT,
      {
        start_date: '2023-01-01',
        end_date: '2023-12-31',
        kode_transaksi: 'XXXXXX',
        type: 'ppnpn',
      },
      { method: 'GET', isBlob: true, timeout: 120000 }
    );

    if (callApiDownload.status === 200 && callApiDownload.data instanceof Blob) {
      let url = '';
      url = window.URL.createObjectURL(callApiDownload.data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Summary Data Ranged Month' + '.xlsx');
      document.body.appendChild(link);
      link.click();
      dispatch(
        setSnackbar({
          show: true,
          message: 'Data berhasil di Download.',
          type: SnackbarType.INFO,
        })
      );
      //setIsLoading(false);
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: `[${callApiDownload.status}] - Gagal Download data. Mohon coba beberapa saat lagi.`,
          type: SnackbarType.ERROR,
        })
      );
      //setIsLoading(false);
    }
    return;
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
                <h3 className="text-lg font-medium leading-6 text-gray-900">Cetak Summary Keseluruhan</h3>
                <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
              </Dialog.Title>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
                  >
                    Download summary satu tahun
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

export default SummaryMonthlyModal;
