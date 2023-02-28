import { ChevronLeftIcon } from '@heroicons/react/solid';
import React from 'react';

import { classNames } from '../../../../utils/Components';
import { getQueryString } from '../../../../utils/URLUtils';
import { withErrorBoundary } from '../../../shared/hocs/ErrorBoundary';
import InProgressState from '../../../shared/InProgressState';
import DaftarPegawai from './DaftarPegawai';
import DeskripsiJabatan from './DeskripsiJabatan';

const tabs = [
  { name: 'Deskripsi Jabatan', href: '#' },
  { name: 'Pegawai', href: '#' },
  { name: 'Kompetensi', href: '#' },
  { name: 'Pendidikan', href: '#' },
];

function DetailJabatan() {
  const [selected, setSelected] = React.useState(tabs[0].name);
  const { name } = getQueryString<{ name: string }>();

  return (
    <>
      <a href="/kepegawaian/peta-jabatan" className="flex flex-row items-center gap-x-2 py-6 px-6">
        <ChevronLeftIcon className="h-8 w-8" />
        <div>Kembali</div>
      </a>
      <div className="rounded-[8px] bg-white px-6 pb-6 shadow">
        <div className="text-xl font-semibold tracking-wide">{name}</div>
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
                      'border-b-2 py-4 px-1 text-sm font-medium'
                    )}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        {selected === tabs[0].name ? <DeskripsiJabatan /> : null}
        {selected === tabs[1].name ? <DaftarPegawai /> : null}
        {selected === tabs[2].name ? <InProgressState /> : null}
        {selected === tabs[3].name ? <InProgressState /> : null}
      </div>
    </>
  );
}

export default withErrorBoundary(DetailJabatan);
