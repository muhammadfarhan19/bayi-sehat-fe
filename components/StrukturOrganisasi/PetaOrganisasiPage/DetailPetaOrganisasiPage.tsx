import { ChevronLeftIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';

import { StrukturOrganisasiAPI } from '../../../constants/APIUrls';
import { DetailStrukturData, GetDetailStrukturReq } from '../../../types/api/StrukturOrganisasiAPI';
import { getQueryString } from '../../../utils/URLUtils';
import useCommonApi from '../../shared/hooks/useCommonApi';
import Loader from '../../shared/Loader/Loader';

function DetailPetaOrganisasiPage() {
  const { id } = getQueryString<{ id: number }>();

  const { data: dataTable, isValidating } = useCommonApi<GetDetailStrukturReq, DetailStrukturData>(
    StrukturOrganisasiAPI.GET_STRUKTUR_ORGANISASI_VIEW,
    { id },
    { method: 'GET' }
  );

  return (
    <>
      <div className="rounded-lg bg-white shadow">
        <Link href={'/struktur-organisasi/peta-organisasi'}>
          <span className="flex cursor-pointer flex-row items-center gap-x-2 py-6 px-6">
            <ChevronLeftIcon className="h-5 w-5" />
            <div>Kembali</div>
          </span>
        </Link>
        <div className="px-6">
          <div className="flex flex-row py-6">
            <p className="text-lg font-medium text-gray-900">{dataTable?.divisi}</p>
          </div>
        </div>
        {isValidating ? (
          <div className="relative h-[150px] w-full divide-y divide-gray-200">
            <Loader />
          </div>
        ) : (
          <div className="flex">
            <div className="my-[24px] w-full overflow-x-auto  sm:mx-0">
              <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
                <div className="sm:rounded-lg">
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
                          Unit Kerja
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Judul SubKoordinator
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(dataTable?.list_anggota || []).map((data, dataIdx) => (
                        <tr
                          key={dataIdx}
                          className={dataIdx % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}
                        >
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{dataIdx + 1}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.nama}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.unit_kerja_str}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data.divisi}</td>
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

export default DetailPetaOrganisasiPage;
