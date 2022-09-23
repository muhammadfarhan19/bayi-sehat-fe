import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React from 'react';

import { ContentLabelledItems } from '../KepegawaianPage/DataKepegawaian/DetailPegawai/ProfileSummaryPegawai/Shared/PageComponents';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedId?: number;
  onSuccess?: () => void;
  handleSubmission?: () => void;
  name?: string;
  nip?: string | number;
  tanggal?: string;
  jenisPengajuan?: string;
  alasan?: string;
  dokumen?: string;
  pegawaiID?: number;
}

function ModalKehadiran(props: ModalProps) {
  const { open, setOpen, handleSubmission, name, nip, tanggal, jenisPengajuan, alasan, dokumen } = props;
  const toggleModal = () => {
    setOpen(!open);
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
                <h3 className="text-lg font-medium leading-6 text-gray-900">Klaim Kehadiran</h3>
                <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
              </Dialog.Title>
              <form onSubmit={handleSubmission}>
                <div className="mt-5 sm:col-span-6">
                  <ContentLabelledItems subtitle="Nama" value={name} />
                </div>
                <div className="mt-5 sm:col-span-6">
                  <ContentLabelledItems subtitle="NIP" value={nip} />
                </div>
                <div className="mt-5 sm:col-span-6">
                  <ContentLabelledItems subtitle="Tanggal" value={tanggal} />
                </div>
                <div className="mt-5 sm:col-span-6">
                  <ContentLabelledItems subtitle="Jenis Pengajuan" value={jenisPengajuan} />
                </div>
                <div className="mt-5 sm:col-span-6">
                  <ContentLabelledItems subtitle="Alasan" value={alasan} />
                </div>
                <div className="mt-5 sm:col-span-6">
                  <ContentLabelledItems subtitle="Dokumen" value={dokumen} />
                </div>

                <div className="mt-5 flex flex-row items-center space-x-2 sm:col-span-6">
                  <input type="checkbox" />
                  <p className="text-xs font-medium">Apakah Anda yakin untuk mengklaim kehadiran</p>
                </div>
                <div className="mt-5 sm:col-span-6"></div>
                <div className="mt-5">
                  <div className="mt-5 flex flex-row space-x-5">
                    <button
                      onClick={toggleModal}
                      className="flex-1 rounded border border-black bg-white px-2.5 py-1.5 text-center text-sm font-medium text-black shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Setuju
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ModalKehadiran;
