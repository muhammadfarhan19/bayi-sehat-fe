import { Dialog, Transition } from '@headlessui/react';
import React from 'react';

interface ModalResetPasswordProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function ModalResetPassword(props: ModalResetPasswordProps) {
  const { open, setOpen } = props;

  return (
    <>
      <Transition appear show={open} as={React.Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => setOpen(false)}>
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
              <div className="my-8 inline-block w-full max-w-lg transform rounded-2xl bg-white p-10 text-center align-middle shadow-xl transition-all">
                <Dialog.Title as="div" className="mb-6 flex justify-center">
                  <h3 className="text-center text-2xl font-bold leading-6 text-gray-900">Reset Kata Sandi</h3>
                </Dialog.Title>
                <Dialog.Description as="div" className="mb-6 text-sm text-gray-500">
                  Reset Kata Sandi hanya dapat dilakukan oleh admin. <br />
                  Silahkan hubungi admin
                </Dialog.Description>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-4/5 justify-center rounded-md border border-transparent bg-[#4F46E5] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#554cf7] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2 sm:text-sm"
                >
                  Kembali
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
