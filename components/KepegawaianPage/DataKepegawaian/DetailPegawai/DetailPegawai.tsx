import { UserCircleIcon } from '@heroicons/react/solid';
import React from 'react';

import { classNames } from '../../../../utils/Components';
import { withErrorBoundary } from '../../../shared/hocs/ErrorBoundary';
import usePersonalData from '../../../shared/hooks/usePersonalData';
import InProgressState from '../../../shared/InProgressState';
import Loader from '../../../shared/Loader/Loader';
import ArsipDigital from './ArsipDigital';
import DataDiriPegawai from './DataDiriPegawai';
import DataDiriPribadi from './DataDiriPribadi';
import RiwayatDiklat from './RiwayatDiklat';
import RiwayatPendidikan from './RiwayatPendidikan';

const tabs = [
  { name: 'Data Diri Pegawai', href: '#' },
  { name: 'Data Diri Pribadi', href: '#' },
  { name: 'Riwayat Pendidikan', href: '#' },
  { name: 'Riwayat Diklat', href: '#' },
  { name: 'Arsip Digital', href: '#' },
  { name: 'Riwayat Jabatan', href: '#' },
  { name: 'Tanda Tangan Digital', href: '#' },
];

function DetailPegawai() {
  const [selected, setSelected] = React.useState(tabs[0].name);
  const personalPegawaiData = usePersonalData();

  if (!personalPegawaiData) {
    return (
      <div className="relative h-[150px] w-full divide-y divide-gray-200">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row gap-x-[20px] rounded-[8px] bg-white py-6 px-[24px] shadow">
        <UserCircleIcon className="h-[88px] w-[88px] fill-indigo-500" />
        <div className="my-auto flex flex-col">
          <p className="text-[24px] font-[700]">{personalPegawaiData?.nama}</p>
          <p className="text-[14px] font-[500] text-[#6B7280]">{personalPegawaiData?.jabatan}</p>
        </div>
      </div>
      <div className="mt-[12px] rounded-[8px] bg-white py-6 px-[24px] shadow">
        <div className="flex flex-row gap-x-[20px] overflow-auto">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Pilih tab
            </label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              defaultValue={tabs[0].name}
              onChange={event => {
                setSelected(event.target.value);
              }}
            >
              {tabs.map(tab => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map(tab => (
                  <a
                    key={tab.name}
                    href={tab.href}
                    onClick={() => setSelected(tab.name)}
                    className={classNames(
                      tab.name === selected
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'whitespace-nowrap border-b-2 py-4 px-1 text-xs font-medium'
                    )}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="overflow-auto">
          {selected === tabs[0].name ? <DataDiriPegawai /> : null}
          {selected === tabs[1].name ? <DataDiriPribadi /> : null}
          {selected === tabs[2].name ? <RiwayatPendidikan /> : null}
          {selected === tabs[3].name ? <RiwayatDiklat /> : null}
          {selected === tabs[4].name ? <ArsipDigital /> : null}
          {selected === tabs[5].name ? <InProgressState /> : null}
          {selected === tabs[6].name ? <InProgressState /> : null}
        </div>
      </div>
    </>
  );
}

export default withErrorBoundary(DetailPegawai);
