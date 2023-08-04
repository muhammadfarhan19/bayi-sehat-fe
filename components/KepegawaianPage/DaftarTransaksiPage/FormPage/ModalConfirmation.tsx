import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React from 'react';

import { ModalProps } from '../../RekapPresensiPage/DetailPage/Shared/ModalResend';

interface ModalConfirmationProps {
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
}

function ModalConfirmation(props: ModalProps & ModalConfirmationProps) {
  const { open, setOpen, onSubmit, disabled } = props;

  const toggleModal = () => {
    setOpen(!open);
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
              <Dialog.Title as="div" className="flex justify-end">
                <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
              </Dialog.Title>
              <form>
                <p className="font-semi text-center text-xl">Yakin ingin Sync?</p>
                <p className="font-regular text-md mt-5 text-center text-gray-500">Apakah anda yakin ingin Sync?</p>
                <div className="mt-5 flex flex-row justify-center space-x-2">
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="w-full rounded border border-black px-2.5  py-1.5 text-center text-sm font-medium shadow-sm hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-black disabled:bg-gray-400"
                  >
                    Tidak
                  </button>
                  <button
                    disabled={disabled}
                    onClick={onSubmit}
                    type="button"
                    className="w-full rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
                  >
                    Ya
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

export default ModalConfirmation;
