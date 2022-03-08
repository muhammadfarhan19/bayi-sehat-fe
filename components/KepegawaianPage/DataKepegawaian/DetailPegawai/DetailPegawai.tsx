import React from 'react';

import { classNames } from '../../../../utils/Components';
import DataDiriPegawai from './DataDiriPegawai';

const tabs = [
  { name: 'Data Diri Pegawai', href: '#' },
  { name: 'Data Diri Pribadi', href: '#' },
  { name: 'Riwayat Pendidikan', href: '#' },
  { name: 'Riwayat Jabatan', href: '#' },
  { name: 'Arsip Digital', href: '#' },
  { name: 'Tanda Tangan Digital', href: '#' },
];

export default function DetailPegawai() {
  const [selected, setSelected] = React.useState(tabs[0].name);

  return (
    <>
      <div className="flex flex-row gap-x-[20px] rounded-[8px] bg-white py-6 px-[24px] shadow">
        <img src="../../../detail-pegawai/img.svg" className="h-[88px] w-[88px]" />
        <div className="my-auto flex flex-col">
          <p className="text-[24px] font-[700]">Widodo</p>
          <p className="text-[14px] font-[500] text-[#6B7280]">Analis Sumber Daya Manusia Aparatur Ahli Muda</p>
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
                      'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                    )}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        {selected === tabs[0].name ? <DataDiriPegawai /> : null}
        {selected === tabs[1].name ? <DataDiriPegawai /> : null}
        {selected === tabs[2].name ? <DataDiriPegawai /> : null}
        {selected === tabs[3].name ? <DataDiriPegawai /> : null}
        {selected === tabs[4].name ? <DataDiriPegawai /> : null}
        {selected === tabs[5].name ? <DataDiriPegawai /> : null}
      </div>
    </>
  );
}
