import { AdjustmentsIcon } from '@heroicons/react/outline';
import React from 'react';

import Pagination from '../../shared/Pagination';

const MOCK_USER = [
  {
    id: 1,
    no_surat: '4070/E1/TI.02.00/2021',
    isi_penugasan: 'Rapat Sosialisasi PKKM',
    unit_kerja: 'Sekretariat Direktorat Jenderal Pendidikan Tinggi',
    tgl_dinas: '13-14 Juni 2022',
    pic_bpp: 'Sutikno',
    pic_pumk: 'Ipong',
    status: 'Menunggu PUMK Memproses',
  },
  {
    id: 2,
    no_surat: '4070/E1/TI.02.00/2021',
    isi_penugasan: 'Rapat Sosialisasi PKKM',
    unit_kerja: 'Direktorat Kelembagaan',
    tgl_dinas: '18-24 Juni 2022',
    pic_bpp: 'Sutikno',
    pic_pumk: 'Ipong',
    status: 'Selesai',
  },
  {
    id: 3,
    no_surat: '4070/E1/TI.02.00/2021',
    isi_penugasan: 'Rapat Sosialisasi PKKM',
    unit_kerja: 'Direktorat Riset Teknologi dan Pengabdian Masyarakat',
    tgl_dinas: '13-17 Juni 2022',
    pic_bpp: 'Sutikno',
    pic_pumk: 'Ipong',
    status: 'Diajukan PUMK Kepada BPP',
  },
];

function ListDaftarDinas() {
  const [showAdvancedFilter, setshowAdvancedFilter] = React.useState(true);

  const toggleAdvancedFilter = () => {
    setshowAdvancedFilter(!showAdvancedFilter);
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-6">
        <div className="flex flex-row py-6">
          <p className="text-lg font-medium text-gray-900">Daftar Dinas</p>
          <div className="ml-auto flex">
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Cari..."
              // onChange={e => search('nama', e.target.value)}
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
                <option value="">Semua</option>
              </select>
            </div>
            <div className="w-[202px] pb-2">
              <p className="mb-[4px] text-[14px] font-normal">Dari Tanggal</p>
              <select className="block w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                <option value="">Semua</option>
              </select>
            </div>
            <div className="w-[202px] pb-2">
              <p className="mb-[4px] text-[14px] font-normal">Sampai Tanggal</p>
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Nama Jabatan"
              />
            </div>
            <div className="w-[202px] pb-2">
              <p className="mb-[4px] text-[14px] font-normal">PUMK</p>
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="PUMK"
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex">
        <div className="my-[24px] w-full overflow-x-auto sm:mx-0">
          <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
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
                    SURAT DINAS
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    ISI PENUGASAN
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    UNIT KERJA
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    TANGGAL DINAS
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    PIC BPP
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    PIC PUMK
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody>
                {(MOCK_USER || []).map((data, dataIdx) => (
                  <tr
                    key={dataIdx}
                    className={dataIdx % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}
                  >
                    <td className="px-6 py-4 text-xs font-medium text-gray-900">{dataIdx + 1}</td>
                    <td className="cursor-pointer px-6 py-4 text-xs font-medium text-indigo-800 underline">
                      {data.no_surat}
                    </td>
                    <td className="px-6 text-xs font-medium text-gray-900">{data?.isi_penugasan}</td>
                    <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.unit_kerja}</td>
                    <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.tgl_dinas}</td>
                    <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.pic_bpp}</td>
                    <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.pic_pumk}</td>
                    <td className="px-6 py-4 text-center text-[10px] font-medium text-gray-900">
                      <div
                        className={`rounded-md px-8 py-1 text-white ${
                          data?.id === 1 ? 'bg-[#248DDA]' : data?.id === 2 ? 'bg-[#9EDE73]' : 'bg-[#FB923C]'
                        }`}
                      >
                        {data?.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              onChange={() => {
                return null;
              }}
              totalData={3}
              perPage={3}
              page={1}
            />
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

export default ListDaftarDinas;
