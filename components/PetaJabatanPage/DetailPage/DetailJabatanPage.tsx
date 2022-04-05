import React from 'react';

import { classNames } from '../../../utils/Components';

const tabs = [
  { name: 'Deskripsi Jabatan', href: '#' },
  { name: 'Pegawai', href: '#' },
  { name: 'Kompetensi', href: '#' },
  { name: 'Pendidikan', href: '#' },
];

export default function DetailJabatanPage() {
  const [selected, setSelected] = React.useState(tabs[0].name);

  function Deskripsi() {
    return (
      <div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead></thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {[
              { label: 'Nama Jabatan', value: 'Arsiparis Ahli Pertama' },
              { label: 'Kelas', value: '8' },
              { label: 'Tipe Jabatan', value: 'Jabatan Fungsional' },
            ].map((each, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.label}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{each.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="m-[24px] flex cursor-pointer flex-row gap-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="my-auto h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="my-auto text-[14px] font-normal" onClick={() => history.back()}>
              Kembali
            </p>
          </div>
        </div>
        <p className="ml-[24px] mb-[24px] text-[24px] font-[600] text-gray-900">Arsiparis Ahli Pertama</p>

        <div className="mt-[6px] rounded-[8px] bg-white px-[24px] pb-6 shadow">
          <div className="gap-x-[20px]">
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
          {selected === tabs[0].name ? <Deskripsi /> : null}
          {selected === tabs[1].name ? <Deskripsi /> : null}
          {selected === tabs[2].name ? <Deskripsi /> : null}
          {selected === tabs[3].name ? <Deskripsi /> : null}
        </div>
      </div>
    </>
  );
}
