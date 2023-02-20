import React from 'react';

import { DinasPegawaiKalenderData } from '../../../types/api/KepegawaianAPI';

interface DateProps {
  start: Date;
  end: Date;
}

type DetailRekapProps = {
  detail?: DinasPegawaiKalenderData;
  dates?: DateProps;
  onBack: () => void;
};

function RekapDetail(props: DetailRekapProps) {
  const { detail } = props;
  return (
    <>
      <section aria-labelledby="section-1-title">
        <div className="mt-5 overflow-hidden rounded-lg bg-white px-6 py-6 shadow">
          <div className="mb-5 flex flex-row items-center">
            <h3 className="text-xl font-medium leading-6 text-gray-900">Daftar Transaksi</h3>
          </div>
          <div className="my-[24px] overflow-x-auto sm:mx-0">
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
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Tanggal
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        BULAN
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        TANGGAL AWAL BULAN
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        TANGGAL AKHIR BULAN
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        AKSI
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(detail?.list_presensi || []).map((data, dataIdx) => {
                      return (
                        <tr key={dataIdx} className={'bg-white hover:bg-gray-100'}>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{dataIdx + 1}</td>
                          <td className="cursor-pointer px-6 py-4 text-xs font-medium text-gray-900">{'-'}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{'-'}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{'-'}</td>
                          <td className="px-6 py-4 text-xs font-medium text-blue-900">{'-'}</td>
                          <td className="cursor-pointer px-6 py-4 text-xs font-medium text-green-700"></td>
                        </tr>
                      );
                    })}
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

export default RekapDetail;
