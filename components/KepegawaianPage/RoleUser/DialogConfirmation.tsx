import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';
import React from 'react';

import { DialogConfirmation } from './Shared/types';

function DialogConfirmation(props: DialogConfirmation) {
  const { message, onClose, onConfirm, open, leftButtonTitle, rightButtonTitle, label } = props;

  return (
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
              <div className="flex justify-end">
                <XIcon className="h-5 cursor-pointer" onClick={onClose} />
              </div>
              <Dialog.Title as="h3" className="text-center text-[20px] font-medium leading-6 text-gray-900">
                {label}
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-center text-[14px] text-gray-500">{message}</p>
              </div>
              <div className="mt-8 mb-2 flex flex-row justify-center space-x-5">
                <button
                  type="button"
                  className="inline-flex flex-1 justify-center rounded border border-indigo-600 px-2.5 py-1.5 text-[14px] font-medium shadow-sm hover:border-indigo-200 hover:bg-indigo-200 hover:text-white"
                  onClick={onClose}
                >
                  {leftButtonTitle}
                </button>
                <button
                  type="button"
                  className="inline-flex flex-1 justify-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-[14px] font-medium text-white hover:bg-indigo-200"
                  onClick={onConfirm}
                >
                  {rightButtonTitle}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default DialogConfirmation;
