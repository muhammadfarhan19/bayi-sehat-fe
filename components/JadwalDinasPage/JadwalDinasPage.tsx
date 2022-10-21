import React from 'react';

import { RekapDinasAPI } from '../../constants/APIUrls';
import { GetRekapPegawaiReq, RekapDataPegawai } from '../../types/api/RekapDinasAPI';
import { getQueryString } from '../../utils/URLUtils';
import useCommonApi from '../shared/hooks/useCommonApi';
import Loader from '../shared/Loader/Loader';

export default function JadwalDinasPage() {
  const { pegawai_id } = getQueryString<{ pegawai_id?: string }>();
  const { data: dataTable, isValidating } = useCommonApi<GetRekapPegawaiReq, RekapDataPegawai[]>(
    RekapDinasAPI.GET_DINAS_PEGAWAI_SCHEDULE,
    pegawai_id ? { pegawai_id: Number(pegawai_id) } : {},
    { method: 'GET' }
  );

  return (
    <>
      <div className="rounded-lg bg-white shadow">
        <div className="px-6">
          <div className="flex flex-row py-6">
            <p className="text-lg font-medium text-gray-900">Rekap Dinas</p>
          </div>
        </div>
        {isValidating ? (
          <div className="relative h-[150px] w-full divide-y divide-gray-200">
            <Loader />
          </div>
        ) : (
          <div className="flex">
            <div className="my-[24px] overflow-x-auto sm:mx-0 ">
              <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
                <div className=" sm:rounded-lg">
                  <table className="w-full table-auto overflow-auto rounded-lg bg-gray-100">
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
                          Surat Dinas
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
                          Tanggal Mulai
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Tanggal Selesai
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Jenis Dinas
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Isi Penugasan
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(dataTable || []).map((data, dataIdx) => (
                        <tr
                          key={dataIdx}
                          className={dataIdx % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}
                        >
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{dataIdx + 1}</td>
                          <td
                            className="cursor-pointer px-6 py-4 text-xs font-medium text-blue-900 underline underline-offset-1"
                            onClick={() => (window.location.href = `/notification/detail?dinas_id=${data.dinas_id}`)}
                          >
                            {data.no_sp}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.unit_kerja_str}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.tgl_mulai}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.tgl_selesai}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.jenis_dinas}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.isi_penugasan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
