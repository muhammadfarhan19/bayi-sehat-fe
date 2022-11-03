import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import React from 'react';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  status: 'success' | 'failed';
  message: string;
}

export default function ModalDetail(props: ModalProps) {
  const { open, setOpen, status, message } = props;
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
              <div className="flex flex-row items-center">
                {status === 'failed' && <XCircleIcon className="h-[73px] w-[73px] text-red-700" />}
                {status === 'success' && <CheckCircleIcon className="h-[73px] w-[73px] text-green-700" />}
                <div className="ml-4 flex w-full flex-col">
                  <Dialog.Title as="div" className="flex justify-between">
                    {status === 'failed' && <h3 className="text-lg font-medium leading-6 text-red-700">Ditolak</h3>}
                    {status === 'success' && (
                      <h3 className="text-lg font-medium leading-6 text-green-700">Disetujui</h3>
                    )}
                    <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-gray-800">{message}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="w-full justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                  onClick={toggleModal}
                >
                  Keluar
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
