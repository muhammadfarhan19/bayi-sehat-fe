import { AdjustmentsIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React from 'react';

export default function MasterPns() {
  const router = useRouter();
  const [showAdvancedFilter, setshowAdvancedFilter] = React.useState(true);
  const toggleAdvancedFilter = () => {
    setshowAdvancedFilter(!showAdvancedFilter);
  };

  const dataTable = [
    {
      nama: 'Widodo Arjuna',
      nip: '196601211986012001',
      unit_kerja: 'DIREKTORAT SUMBER DAYA',
      jabatan: 'Jabatan Fungsional',
      disiplin: 'Tidak di hukum',
      aktif: 'Aktif',
      kum: '1',
    },
    {
      nama: 'Widodo Arjuna',
      nip: '196601211986012001',
      unit_kerja: 'DIREKTORAT SUMBER DAYA',
      jabatan: 'Jabatan Fungsional',
      disiplin: 'Tidak di hukum',
      aktif: 'Aktif',
      kum: '1',
    },
    {
      nama: 'Widodo Arjuna',
      nip: '196601211986012001',
      unit_kerja: 'DIREKTORAT SUMBER DAYA',
      jabatan: 'Jabatan Fungsional',
      disiplin: 'Tidak di hukum',
      aktif: 'Aktif',
      kum: '1',
    },
  ];

  return (
    <>
      <div className="px-6">
        <div className="flex flex-row py-6">
          <p className="text-lg font-medium text-gray-900">Data Pegawai</p>
          <div className="ml-auto flex">
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Cari..."
            />
            <button
              className="ml-1 rounded-md border border-gray-300 p-2 focus:bg-gray-50 focus:outline-none"
              onClick={toggleAdvancedFilter}
            >
              <AdjustmentsIcon className="h-5  w-5 animate-pulse text-gray-400" />
            </button>
            <div className="flex">
              <button className="ml-1 inline-flex items-center rounded-md border border-indigo-600 bg-indigo-600 p-2 px-3 text-sm text-white hover:bg-indigo-700 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Pegawai
              </button>
            </div>
          </div>
        </div>

        {showAdvancedFilter && (
          <div className="flex w-full flex-row gap-x-[16px]">
            <div className="w-[202px] pb-2">
              <p className="mb-[4px] text-[14px] font-normal">Unit Kerja</p>
              <select className="block w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                <option value="10">Semua</option>
                <option value="20">Lorem Ipsum</option>
                <option value="30">Lorem Ipsum</option>
              </select>
            </div>
            <div className="w-[202px] pb-2">
              <p className="mb-[4px] text-[14px] font-normal">Nama</p>
              <select className="block w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                <option value="10">Semua</option>
                <option value="20">Lorem Ipsum</option>
                <option value="30">Lorem Ipsum</option>
              </select>
            </div>
            <div className="w-[202px] pb-2">
              <p className="mb-[4px] text-[14px] font-normal">Tipe Jabatan</p>
              <select className="block w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                <option value="10">Semua</option>
                <option value="20">Lorem Ipsum</option>
                <option value="30">Lorem Ipsum</option>
              </select>
            </div>
            <div className="w-[202px] pb-2">
              <p className="mb-[4px] text-[14px] font-normal">Nama Jabatan</p>
              <select className="block w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                <option value="10">Semua</option>
                <option value="20">Lorem Ipsum</option>
                <option value="30">Lorem Ipsum</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="flex">
        <div className="my-[24px] overflow-x-auto sm:mx-0 ">
          <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="w-full table-auto rounded-lg bg-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Nama
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      NIP
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Unit Kerja
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Jabatan
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Disiplin
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Aktif
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      KUM
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataTable.map((data, dataIdx) => (
                    <tr
                      key={dataIdx}
                      className={dataIdx % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">{dataIdx + 1}</td>
                      <td
                        className="cursor-pointer whitespace-nowrap px-6 py-4 text-xs font-medium text-indigo-800"
                        onClick={() => router.push(`/kepegawaian/data-pegawai?userId=${data.nip}`)}
                      >
                        {data.nama}
                      </td>
                      <td className="whitespace-nowrap px-6 text-xs font-medium text-gray-900">{data.nip}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">
                        {data.unit_kerja}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">{data.jabatan}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">{data.disiplin}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">{data?.aktif}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">{data?.kum}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">
                        <button
                          type="button"
                          className="text-xs font-medium text-indigo-500 hover:text-indigo-700 focus:outline-none"
                        >
                          Lihat
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
