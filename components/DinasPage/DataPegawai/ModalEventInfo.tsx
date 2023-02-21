import { Dialog, Transition } from '@headlessui/react';
import { CalendarIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';

import { Dinas } from '../../../types/api/KepegawaianAPI';
import { startEndDateString } from '../../../utils/DateUtil';
import { getQueryString } from '../../../utils/URLUtils';

interface Props {
  open: boolean;
  toggleOpen: (open: boolean) => void;
  infos?: Dinas[];
}

export const MapEventColor = {
  'DINAS NON SPPD': 'blue',
  'DINAS SPPD': 'blue',
};

export default function ModalEventInfo(props: Props) {
  const { infos } = props;
  if (!(infos && infos.length)) {
    return null;
  }

  const { pegawai_id } = getQueryString<{ pegawai_id?: string }>();
  const kepegawaianLink = pegawai_id
    ? '/kepegawaian/rekap-dinas?pegawai_id=' + pegawai_id
    : '/kepegawaian/rekap-dinas/detail?';

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
            <div className="my-8 inline-block w-full max-w-lg transform space-y-4 rounded-2xl bg-slate-50 p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="div" className="flex justify-between">
                <div className="text-lg font-medium leading-6 text-gray-900">Jadwal Dinas</div>
                <XIcon className="h-5 cursor-pointer" onClick={() => props.toggleOpen(false)} />
              </Dialog.Title>

              <div className="space-y-2">
                {infos.map(info => {
                  const redirectLink = kepegawaianLink + '&dinas_id=' + info?.dinas_id;
                  const dateString = startEndDateString(info.tgl_mulai, info.tgl_selesai);

                  return (
                    <div className="space-y-1 bg-white p-4 shadow">
                      <div className="flex justify-between">
                        <div className="relative">
                          <dt className="flex items-center">
                            <div className="w-5">
                              <CalendarIcon strokeWidth={1.5} className="w-full text-gray-500" />
                            </div>
                            <p className="ml-4 text-base leading-6 text-gray-900">{dateString}</p>
                          </dt>
                        </div>
                      </div>
                      <div>
                        <Link href={redirectLink}>
                          <a className="cursor-pointer font-medium leading-6 text-indigo-600 underline">
                            {info.jenis_dinas}
                          </a>
                        </Link>
                        {info?.isi_penugasan ? (
                          <p className="py-1 text-[14px] font-medium">{info?.isi_penugasan}</p>
                        ) : null}
                      </div>
                      <div className="flex justify-between">
                        <div className="relative">
                          <dt className="flex items-center">
                            <div className="w-5">
                              <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-full text-gray-400"
                              >
                                <path
                                  fill="rgb(156 163 175)"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                />
                                <path
                                  fill="#fff"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </div>
                            <p className="ml-4 text-base leading-6 text-gray-900">{info.lokasi}</p>
                          </dt>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
