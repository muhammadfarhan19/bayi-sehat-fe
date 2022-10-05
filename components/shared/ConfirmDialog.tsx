import { Dialog, Transition } from '@headlessui/react';
import * as React from 'react';

interface ConfirmDialogProps {
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
}

export default function ConfirmDialog(props: ConfirmDialogProps) {
  const { message, onClose, onConfirm, open } = props;
  return (
    <>
      <Transition appear show={open} as={React.Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
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

            {/* This element is to trick the browser into centering the modal contents. */}
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
              <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Konfirmasi
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{message}</p>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-900 hover:bg-indigo-200"
                    onClick={onConfirm}
                  >
                    Lanjut
                  </button>
                  <button
                    type="button"
                    className="ml-2 inline-flex rounded border border-indigo-600 px-2.5 py-1.5 text-xs font-medium text-indigo-600 shadow-sm hover:border-indigo-700"
                    onClick={onClose}
                  >
                    Batal
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
