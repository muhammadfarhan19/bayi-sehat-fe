import { AdjustmentsIcon } from '@heroicons/react/solid';
import React from 'react';

export default function DaftarPetaJabatan() {
  const [showAdvancedFilter, setshowAdvancedFilter] = React.useState(true);
  const toggleAdvancedFilter = () => {
    setshowAdvancedFilter(!showAdvancedFilter);
  };

  const dataTable = [
    {
      kelas: '8',
      nama_jabatan: 'Arsiparis Ahli Pertama',
      keterisian: '12',
      kebutuhan: '13',
      selisih: '-1',
    },
    {
      kelas: '8',
      nama_jabatan: 'Arsiparis Ahli Pertama',
      keterisian: '12',
      kebutuhan: '13',
      selisih: '-1',
    },
    {
      kelas: '8',
      nama_jabatan: 'Arsiparis Ahli Pertama',
      keterisian: '12',
      kebutuhan: '13',
      selisih: '-1',
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

      <div className="mt-[24px] overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
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
                Kelas
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Nama Jabatan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Keterisian
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Kebutuhan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Selisih
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
                <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">{data.kelas}</td>
                <td
                  className="cursor-pointer whitespace-nowrap px-6 text-xs font-medium text-indigo-800"
                  onClick={() => (window.location.href = `/kepegawaian/peta-jabatan?jabatanId=${dataIdx + 1}`)}
                >
                  {data.nama_jabatan}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">{data.keterisian}</td>
                <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">{data.kebutuhan}</td>
                <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">{data.selisih}</td>
                <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">
                  <button
                    type="button"
                    className="rounded-md bg-[#4F46E5] px-[11px] py-[7px] text-xs font-medium text-white hover:bg-indigo-700 focus:outline-none"
                    onClick={() => (window.location.href = `/kepegawaian/peta-jabatan/detail?jabatanId=${dataIdx + 1}`)}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
