import React from 'react';

import { classNames } from '../../../../utils/Components';

export default function DetailPegawai() {
  const tabs = [
    { name: 'Data Diri Pegawai', href: '#' },
    { name: 'Data Diri Pribadi', href: '#' },
    { name: 'Riwayat Pendidikan', href: '#' },
    { name: 'Riwayat Jabatan', href: '#' },
    { name: 'Arsip Digital', href: '#' },
    { name: 'Tanda Tangan Digital', href: '#' },
  ];

  const [selected, setSelected] = React.useState('Data Diri Pegawai');

  return (
    <>
      <div className="flex flex-row gap-x-[20px] rounded-[8px] bg-white py-6 px-[24px] shadow">
        <img src="../../../detail-pegawai/img.svg" className="h-[88px] w-[88px]" />
        <div className="my-auto flex flex-col">
          <p className="text-[24px] font-[700]">Widodo</p>
          <p className="text-[14px] font-[500] text-[#6B7280]">Analis Sumber Daya Manusia Aparatur Ahli Muda</p>
        </div>
      </div>
      <div className="mt-[12px] flex flex-row gap-x-[20px] overflow-auto rounded-[8px] bg-white py-6 px-[24px] shadow">
        <div>
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              defaultValue={tabs.find(tab => tab.name)}
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
                    aria-current={tab.current ? 'page' : undefined}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead></thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#6B7280]">Unit Kerja</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">-</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#6B7280]">NIP/NIP Lama</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">-</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#6B7280]">
                    Tempat, Tanggal Lahir
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">-</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#6B7280]">TMT CPNS</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">-</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#6B7280]">Status CPNS/PNS</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">-</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#6B7280]">Jabatan</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">-</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#6B7280]">Golongan</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">-</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#6B7280]">TMT Golongan</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">-</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#6B7280]">Pangkat</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">-</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#6B7280]">Masa Kerja</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">-</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#6B7280]">Status</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">-</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#6B7280]">Karpeg</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
