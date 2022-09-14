import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { ArrowRightIcon } from '@heroicons/react/solid';
import React from 'react';

interface Props {
  open: boolean;
  toggleOpen: (open: boolean) => void;
  info?: {
    date: string;
    check_in: string;
    check_out: string;
    status: string;
  };
}

export const MapPresensiColor = {
  MASUK: 'green',
  TERLAMBAT: 'red',
};

export default function ModalPresensiInfo(props: Props) {
  const { info } = props;
  if (!info) {
    return null;
  }

  const statusColor = `text-${
    MapPresensiColor?.[info.status.toUpperCase() as keyof typeof MapPresensiColor] || 'gray'
  }-500`;

  return (
    <Transition appear show={props.open} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => props.toggleOpen(false)}>
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
            <div className="my-8 inline-block w-full max-w-lg transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="div" className="flex justify-between">
                <div className="relative">
                  <dt className="flex">
                    <svg viewBox="0 0 24 24" fill="currentColor" className={`h-6 w-6 ${statusColor}`}>
                      <path
                        fillRule="evenodd"
                        d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="ml-9">
                      <p className="text-lg font-medium leading-6 text-gray-900">Presensi</p>
                      <dd className="text-sm text-gray-500">{info.date}</dd>
                    </div>
                  </dt>
                </div>
                <XIcon className="h-5 cursor-pointer" onClick={() => props.toggleOpen(false)} />
              </Dialog.Title>

              <div className="mx-12 mt-2 flex items-center justify-between">
                <div className="flex h-24 flex-col items-center justify-around">
                  <div className="text-base text-gray-600">Presensi Masuk</div>
                  <div className="text-base text-indigo-600">{info.check_in.split(' ')?.[1] || '~'}</div>
                </div>
                <ArrowRightIcon className="h-5 " />
                <div className="flex h-24 flex-col items-center justify-around">
                  <div className="text-base text-gray-600">Presensi Keluar</div>
                  <div className="text-base text-indigo-600">{info.check_out.split(' ')?.[1] || '~'}</div>
                </div>
              </div>

              <div className="mt-5 ml-12">
                <span className="text-sm text-gray-500">Status: </span>
                <span className={`text-sm ${statusColor}`}>{info.status}</span>
              </div>
            </div>
          </Transition.Child>

          {/* precall tailwind class */}
          <div className="hidden">
            <div className="text-green-500" />
            <div className="text-red-500" />
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
