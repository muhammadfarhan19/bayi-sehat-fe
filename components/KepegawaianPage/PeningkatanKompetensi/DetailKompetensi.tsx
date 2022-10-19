import { ChevronLeftIcon } from '@heroicons/react/outline';
import React from 'react';

import FormTambahUpdateKomp from './FormTambahUpdateKomp';

interface DetailLogHarianProps {
  onBack?: () => void;
  pegawai_nip: string;
  pegawai_nama: string;
}

function DetailKompetensi(props: DetailLogHarianProps) {
  const { onBack, pegawai_nama, pegawai_nip } = props;

  const [formModalState, setFormModalState] = React.useState<{ open: boolean; selectedId?: number }>({
    open: false,
    selectedId: undefined,
  });

  const handleShowForm = (open: boolean, selectedId?: number) => {
    setFormModalState({
      open,
      selectedId,
    });
  };

  return (
    <>
      {formModalState?.open ? (
        <FormTambahUpdateKomp
          open={formModalState?.open}
          setOpen={(open: boolean) => handleShowForm(open)}
          selectedId={formModalState?.selectedId}
        />
      ) : (
        <>
          <div className="overflow-hidden rounded-lg bg-white pb-6 shadow">
            <div className="my-3 ml-3 inline-flex cursor-pointer items-center bg-white" onClick={onBack}>
              <ChevronLeftIcon className="mr-1 h-5" />
              <span className="bg-white tracking-wide text-gray-600">Kembali</span>
            </div>
            <div className="flex flex-row justify-between">
              <div className="mb-2 px-5 py-1">
                <h3 className="text-xl font-semibold tracking-wider text-gray-700">Peningkatan Kompetensi</h3>
              </div>
              <div className="mr-5 mb-5 flex">
                <button
                  className="ml-1 inline-flex w-[220px] items-center justify-center rounded-md border border-indigo-600 bg-indigo-600 p-2 px-3 text-sm text-white hover:bg-indigo-700 focus:outline-none"
                  onClick={() => handleShowForm(!formModalState?.open)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Peningkatan Kompetensi
                </button>
              </div>
            </div>
            <div className="flex flex-row border-y-[1px] px-7 py-3">
              <div className="text-l basis-[200px] tracking-wider text-gray-700">Nama</div>
              <div className="text-l text-gray-700">{pegawai_nama}</div>
            </div>
            <div className="flex flex-row border-b-[1px] px-7 py-3">
              <div className="text-l basis-[200px] tracking-wider text-gray-700">NIP</div>
              <div className="text-l text-gray-700">{pegawai_nip}</div>
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
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            Peningkatan Kompetensi
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            Tanggal Upload
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
                        <tr className={'bg-white hover:bg-gray-100'}>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{'1'}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{'2023'}</td>
                          <td className="cursor-pointer px-6 py-4 text-xs font-medium text-gray-900">
                            {'Manajemen Perencanaan Anggaran, Pengadaan Barang dan Jasa'}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{'2022/04/12'}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            <div className="flex justify-between">
                              <button
                                type="button"
                                className="mr-2 inline-flex items-center rounded border border-indigo-600 bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:border-indigo-200 disabled:text-indigo-200"
                                onClick={() => handleShowForm(!formModalState?.open, 1)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="inline-flex items-center rounded border border-transparent bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-200 disabled:text-gray-200"
                              >
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default DetailKompetensi;
