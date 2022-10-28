import React from 'react';

import { PeningkatanKompAPI } from '../../constants/APIUrls';
import { GetPeningkatanReq, GetPeningkatanRes } from '../../types/api/PeningkatanKompetensiAPI';
import useCommonApi from '../shared/hooks/useCommonApi';
import usePersonalData from '../shared/hooks/usePersonalData';

function DetailPeningkatan() {
  const personalPegawai = usePersonalData();

  const { data: listKompetensi } = useCommonApi<GetPeningkatanReq, GetPeningkatanRes[]>(
    PeningkatanKompAPI.GET_PENINGKATAN_KOMP_LIST,
    { pegawai_id: Number(personalPegawai?.pegawai_id) },
    { method: 'GET' },
    { revalidateOnMount: true, skipCall: !personalPegawai?.pegawai_id }
  );

  return (
    <>
      <div className="overflow-hidden rounded-lg bg-white pb-6 shadow">
        <div className="my-4 px-7 py-1">
          <h3 className="text-xl font-semibold tracking-wider text-gray-700">Peningkatan Kompetensi</h3>
        </div>
        <div className="flex flex-row border-y-[1px] px-7 py-3">
          <div className="text-l basis-[200px] tracking-wider text-gray-700">Nama</div>
          <div className="text-l text-gray-700">{personalPegawai?.nama}</div>
        </div>
        <div className="flex flex-row border-b-[1px] px-7 py-3">
          <div className="text-l basis-[200px] tracking-wider text-gray-700">NIP</div>
          <div className="text-l text-gray-700">{personalPegawai?.nip}</div>
        </div>
      </div>
      <section aria-labelledby="section-1-title">
        <div className="overflow-hidden rounded-lg bg-white px-6 py-6 shadow">
          <div className="overflow-x-auto sm:mx-0 ">
            <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
              <div className="sm:rounded-lg">
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
                        className="w-12 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Tahun
                      </th>
                      <th
                        scope="col"
                        className="w-full px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Peningkatan Kompetensi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(listKompetensi || []).map((each, index) => (
                      <tr
                        key={each.id}
                        className={index % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}
                      >
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{each?.tahun}</td>
                        <td className="w-full cursor-pointer px-6 py-4 text-xs font-medium text-gray-900">
                          {each?.peningkatan_kompetensi}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DetailPeningkatan;
