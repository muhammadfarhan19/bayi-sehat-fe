import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';

import { Dinas } from '../../../types/api/KepegawaianAPI';
import { getQueryString } from '../../../utils/URLUtils';

interface Props {
  open: boolean;
  toggleOpen: (open: boolean) => void;
  info?: Dinas;
}

export const MapEventColor = {
  'DINAS NON SPPD': 'cyan',
  'DINAS SPPD': 'cyan',
};

export default function ModalEventInfo(props: Props) {
  const { info } = props;
  if (!info) {
    return null;
  }

  const { pegawai_id } = getQueryString<{ pegawai_id?: string }>();
  const redirectLink = [
    pegawai_id ? '/kepegawaian/rekap-dinas' : '/kepegawaian/rekap-dinas/detail',
    '?dinas_id=' + info?.dinas_id,
    pegawai_id ? '&pegawai_id=' + pegawai_id : '',
  ].join('');

  const statusColor = `text-${
    MapEventColor?.[info.jenis_dinas.toUpperCase() as keyof typeof MapEventColor] || 'gray'
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
            <div className="my-8 inline-block w-full max-w-lg transform space-y-4 rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                      <p className="text-lg font-medium leading-6 text-gray-900">{info.jenis_dinas}</p>
                      <dd className="text-sm text-gray-500">
                        {info.tgl_mulai} - {info.tgl_selesai}
                      </dd>
                    </div>
                  </dt>
                </div>
                <XIcon className="h-5 cursor-pointer" onClick={() => props.toggleOpen(false)} />
              </Dialog.Title>

              <div className="flex justify-between">
                <div className="relative">
                  <dt className="flex">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
                      />
                    </svg>
                    <p className="ml-9 text-base leading-6 text-gray-900">{info.isi_penugasan}</p>
                  </dt>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="relative">
                  <dt className="flex">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    <p className="ml-9 text-base leading-6 text-gray-900">{info.no_sp}</p>
                  </dt>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="relative">
                  <dt className="flex">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>

                    <p className="ml-9 text-base leading-6 text-gray-900">{info.lokasi}</p>
                  </dt>
                </div>
              </div>

              <Link href={redirectLink}>
                <button className="w-full rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Detail
                </button>
              </Link>
            </div>
          </Transition.Child>

          {/* precall tailwind class */}
          <div className="hidden">
            <div className="text-gray-500" />
            <div className="text-cyan-500" />
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
