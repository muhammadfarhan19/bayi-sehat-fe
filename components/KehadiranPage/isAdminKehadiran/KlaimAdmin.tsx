import { AdjustmentsIcon } from '@heroicons/react/outline';
import React from 'react';


import { withErrorBoundary } from '../../shared/hocs/ErrorBoundary';
import AutoComplete from '../../shared/Input/ComboBox';
import Pagination from '../../shared/Pagination';

function KlaimAdmin() {
  return (
    <section aria-labelledby="section-1-title">
      <div className="overflow-hidden rounded-lg bg-white px-6 py-6 shadow">
        <div className="mb-5 flex flex-row items-center">
          <h3 className="text-xl font-medium leading-6 text-gray-900">Data Klaim Kehadiran</h3>
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

        <div className="flex w-full flex-row gap-x-[16px]">
          <div className="w-[202px] pb-2">
            <p className="text-sm font-medium text-gray-700">Dari Tanggal</p>
            <input
              type="date"
              className="mt-1 w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              onChange={() => null}
            />
          </div>
          <div className="w-[202px] pb-2">
            <p className="text-sm font-medium text-gray-700">Sampai Tanggal</p>
            <input
              type="date"
              className="mt-1 w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              onChange={() => null}
            />
          </div>

          <div className="w-[202px] pb-2">
            <AutoComplete
              label={'Status Jabatan'}
              onChange={() => null}
              defaultValue={{ text: 'Semua', value: '*' }}
              options={['*', 'Diterima', 'Ditolak'].map(each => ({
                text: each === '*' ? 'Semua' : each === 'Diterima' ? 'Diterima' : 'Ditolak',
                value: String(each),
              }))}
            />
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
                      className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Tanggal
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Jenis Pengajuan
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Alasan
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Dokumen
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={'bg-white hover:bg-gray-100'}>
                  <tr
                    className={
                      'bg-white hover:bg-gray-100'
                    }
                  >

                    <td className="px-6 py-4 text-xs font-medium text-gray-900">1</td>
                    <td className="cursor-pointer px-6 py-4 text-xs font-medium text-blue-900" onClick={() => null}>
                      {'1'}
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-gray-900">{'2'}</td>
                    <td className="px-6 py-4 text-xs font-medium text-gray-900">{'3'}</td>
                    <td className="px-6 py-4 text-xs font-medium text-gray-900">{'4'}</td>
                  </tr>
                </tbody>
              </table>
              <Pagination onChange={() => 1} totalData={20} perPage={1} page={20} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default withErrorBoundary(KlaimAdmin);
