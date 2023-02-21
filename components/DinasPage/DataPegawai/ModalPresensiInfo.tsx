import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { ArrowRightIcon } from '@heroicons/react/solid';
import React from 'react';

import { Presensi } from '../../../types/api/KepegawaianAPI';

interface Props {
  open: boolean;
  toggleOpen: (open: boolean) => void;
  onClaimPresence: React.MouseEventHandler<HTMLButtonElement>;
  info?: Presensi;
}

export const MapPresensiColorText = {
  0: ['gray', '-', true],
  1: ['blue', 'Hadir', true],
  2: ['yellow', 'Terlambat', true],
  3: ['yellow', 'Pulang Sebelum Waktunya', true],
  4: ['orange', 'Terlambat dan Pulang Sebelum Waktunya', true],
  5: ['red', 'Tidak Hadir', false],
  6: ['blue', 'Dinas', true],
  7: ['gray', 'Akhir Pekan', false],
  8: ['green', 'Cuti', false],
  9: ['gray', 'Libur', false],
  10: ['green', 'Cuti Sakit', false],
};
// 1 - Masuk
// 2 - Terlambat
// 3 - Pulang Awal
// 4 - Terlambat & Pulang Awal
// 5 - Tidak Hadir
// 6 - Dinas
// 7 - Weekend
// 8 - Cuti
// 9 - Libur
// 10 - Sakit
//tidak hadir, pulang sebelum waktunya sama terlambat, terlambat dan pulang sebelum waktunya.
export default function ModalPresensiInfo(props: Props) {
  const { info, onClaimPresence } = props;
  const isKlaimKehadiranTidakHadir = info?.status === 5;
  const isKlaimKehadiranPulangSebelumWaktu = info?.status === 4;
  const isKlaimKehadiranPulangAwal = info?.status === 3;
  const isKlaimKehadiranAvailButton =
    isKlaimKehadiranTidakHadir || isKlaimKehadiranPulangSebelumWaktu || isKlaimKehadiranPulangAwal;

  if (!info) {
    return null;
  }

  const showPresensi = MapPresensiColorText[Number(info.status) as keyof typeof MapPresensiColorText]?.[2];
  const statusText = MapPresensiColorText[Number(info.status) as keyof typeof MapPresensiColorText]?.[1];
  const statusColor = `text-${
    MapPresensiColorText[Number(info.status) as keyof typeof MapPresensiColorText]?.[0] || 'gray'
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
                  <div className="flex">
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
                  </div>
                </div>
                <XIcon className="h-5 cursor-pointer" onClick={() => props.toggleOpen(false)} />
              </Dialog.Title>

              {showPresensi && (
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
              )}
              <div className="mt-5 ml-12">
                <span className="text-sm text-gray-500">Status: </span>
                <span className={`text-sm ${statusColor}`}>{statusText}</span>
              </div>
              {isKlaimKehadiranAvailButton ? (
                <button
                  onClick={onClaimPresence}
                  type="button"
                  className="mt-5 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200"
                >
                  Klaim Kehadiran
                </button>
              ) : null}
            </div>
          </Transition.Child>

          {/* precall tailwind class */}
          <div className="hidden">
            <div className="text-blue-500" />
            <div className="text-gray-500" />
            <div className="text-green-500" />
            <div className="text-orange-500" />
            <div className="text-red-500" />
            <div className="text-yellow-500" />
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
