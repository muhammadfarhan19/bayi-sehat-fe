import { ChevronLeftIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React from 'react';

import { getQueryString } from '../../../utils/URLUtils';
import usePersonalData from '../../shared/hooks/usePersonalData';
import DinasCalendar from './DinasCalendar';
import JadwalDinas from './JadwalDinas';

export default function DetailDinas() {
  const { pegawai_id } = getQueryString<{ pegawai_id?: string }>();
  const [formModalState, setFormModalState] = React.useState(false);
  const personalPegawai = usePersonalData();

  return (
    <>
      <div className="overflow-hidden rounded-lg bg-white pb-6 shadow">
        {pegawai_id && (
          <Link href="/dinas/pegawai">
            <div className="mt-3 inline-flex cursor-pointer items-center px-7 pl-4 pr-6 font-semibold">
              <ChevronLeftIcon className="mr-0.5 h-8" />
              <span className="tracking-wide text-gray-600">Kembali</span>
            </div>
          </Link>
        )}
        <div className="my-4 px-7 py-1">
          <h3 className="text-xl font-semibold tracking-wider text-gray-700">
            {pegawai_id ? 'Data Dinas Pegawai' : 'Jadwal Pegawai'}
          </h3>
        </div>
        <div className="flex flex-row border-y-[1px] px-7 py-3">
          <div className="text-l basis-[200px] tracking-wider text-gray-700">NIP</div>
          <div className="text-l text-gray-700">{personalPegawai?.nip}</div>
        </div>
        <div className="flex flex-row border-b-[1px] px-7 py-3">
          <div className="text-l basis-[200px] tracking-wider text-gray-700">Nama</div>
          <div className="text-l text-gray-700">{personalPegawai?.nama}</div>
        </div>
        <div className="flex flex-row border-b-[1px] px-7 py-3">
          <div className="text-l basis-[200px] tracking-wider text-gray-700">Unit Kerja</div>
          <div className="text-l text-gray-700">{personalPegawai?.unit_kerja}</div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg bg-white shadow">
        <div className="flex flex-row items-center justify-between border-b-[1px] px-6 py-4">
          <h3 className=" text-xl font-semibold tracking-wider text-gray-700">Jadwal Dinas</h3>
          <button
            onClick={() => setFormModalState(!formModalState)}
            className="text-l rounded-[4px] bg-indigo-600 px-4   py-2 font-medium text-gray-50 focus:outline-none"
          >
            Download Jadwal Dinas
          </button>
        </div>
        <DinasCalendar />
      </div>
      {formModalState && <JadwalDinas open={formModalState} setOpen={() => setFormModalState(!formModalState)} />}
    </>
  );
}
