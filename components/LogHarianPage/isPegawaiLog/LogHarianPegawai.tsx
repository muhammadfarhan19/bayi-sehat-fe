import { AdjustmentsIcon, ExclamationCircleIcon } from '@heroicons/react/outline';
import React from 'react';

import usePersonalData from '../../shared/hooks/usePersonalData';
import LogHarianPegPPNPNDetail from './LogHarianPegPPNPNDetail';

function LogHarianPegawai() {
  const [isShownEachDetailPage, setIsShownEachDetailPage] = React.useState(false);

  const personalPegawaiData = usePersonalData();

  const toggleDetailPage = () => {
    setIsShownEachDetailPage(!isShownEachDetailPage);
  };

  return (
    <>
      {isShownEachDetailPage ? (
        <LogHarianPegPPNPNDetail onBack={toggleDetailPage} />
      ) : (
        <section aria-labelledby="section-1-title">
          <div className="overflow-hidden rounded-lg bg-white px-6 py-6 shadow">
            <div className="mb-5 flex flex-row items-center">
              <h3 className="text-xl font-medium leading-6 text-gray-900">Log Harian</h3>
              <div className="ml-auto flex">
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Cari..."
                  onChange={() => null}
                />
                <button
                  className="ml-1 rounded-md border border-gray-300 p-2 focus:bg-gray-50 focus:outline-none"
                  onClick={() => null}
                >
                  <AdjustmentsIcon className="h-5  w-5 animate-pulse text-gray-400" />
                </button>
              </div>
            </div>
            {personalPegawaiData?.status_cpns === 1 ? (
              <div className="mb-5 mt-2 flex flex-row items-center space-x-2">
                <ExclamationCircleIcon width={20} height={20} color="#FBBF24" />
                <div className="flex flex-row items-center space-x-1">
                  <p className="text-[16px] font-normal">Mohon isi log harian di web</p>
                  <a
                    href="http://skp.sdm.kemdikbud.go.id/skp/site/login.jsp"
                    className="text-[16px] font-normal text-indigo-600 underline"
                  >
                    {` http://skp.sdm.kemdikbud.go.id/skp/site/login.jsp`}
                  </a>
                </div>
              </div>
            ) : null}
            <div className="flex w-full flex-row gap-x-[16px]">
              <div className="w-[202px] pb-2">
                <p className="mb-[4px] text-[14px] font-normal">Tahun</p>
                <select
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  //   onChange={e => search('unit_kerja_id', e.target.value)}
                >
                  <option value="">Semua</option>
                  {/* {(unitKerjaList || []).map((item, index) => (
                  <option key={`options-${index}`} value={item?.unit_kerja_id}>
                    {item?.name}
                  </option>
                ))} */}
                </select>
              </div>
            </div>
            <div className="my-[24px] overflow-x-auto sm:mx-0 ">
              <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
                <div className="sm:rounded-lg">
                  <table className="w-full table-auto overflow-auto rounded-lg bg-gray-100">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="w-30 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          BULAN-KE
                        </th>

                        <th
                          scope="col"
                          className="w-30 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          BULAN
                        </th>
                        <th
                          scope="col"
                          className="w-30 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          ISIAN LOG HARIAN
                        </th>
                        <th
                          scope="col"
                          className="w-30 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          NILAI
                        </th>
                        <th
                          scope="col"
                          className="w-50 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {(pegawaiList?.list || []).map((data, dataIdx) => ( */}
                      <tr className={'bg-white hover:bg-gray-100'}>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{'data'}</td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{'data'}</td>
                        <td className="cursor-pointer px-6 py-4 text-xs font-medium text-blue-900" onClick={() => null}>
                          {'data'}
                        </td>
                        <td className="cursor-pointer px-6 py-4 text-xs font-medium text-blue-900" onClick={() => null}>
                          {'data'}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium">
                          <button
                            onClick={toggleDetailPage}
                            type="button"
                            className="inline-flex w-full items-center justify-center rounded border border-indigo-600 px-2.5 py-2 text-center text-xs font-medium text-indigo-600 shadow-sm hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-500 disabled:text-gray-200"
                          >
                            Lihat Detail
                          </button>
                        </td>
                      </tr>
                      {/* ))} */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default LogHarianPegawai;
