import { PlusIcon } from '@heroicons/react/outline';
import React from 'react';

import PenghargaanForm from './PenghargaanForm';

type ListPenghargaanProps = {
  onShowDetail: (id: number) => void;
  userId?: number;
};

export default function ListPenghargaan(props: ListPenghargaanProps) {
  const { onShowDetail } = props;
  const [formModalState, setFormModalState] = React.useState<{ open: boolean; selectedId?: number }>({
    open: false,
    selectedId: 0,
  });

  const handleShowForm = (open: boolean, selectedId?: number) => {
    setFormModalState({
      open,
      selectedId,
    });
  };

  return (
    <>
      <div className="my-3 flex items-center">
        <div className="flex flex-1 pr-2 text-sm text-gray-500"></div>
        <button
          type="button"
          className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-indigo-200 disabled:text-gray-200"
          onClick={() => {
            setFormModalState({
              open: true,
              selectedId: 2,
            });
          }}
        >
          <PlusIcon className="mr-1 h-4" />
          Tambah Riwayat Penghargaan
        </button>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
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
                Penghargaan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Tingkat
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Penyelenggara
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                TGL Penghargaan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Keterangan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                No Penghargaan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
              <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">01</td>
              <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">Juara 2</td>
              <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">Internasional</td>
              <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">Kemenristek</td>
              <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">
                <div className="whitespace-nowrap">Feb, 27 2018</div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">Sains</td>
              <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">111-00-99</td>
              <td className="w-[220px] px-6 py-4 text-sm text-gray-500">
                <div className="flex justify-between">
                  <button
                    onClick={() => onShowDetail(Number(formModalState.selectedId))}
                    type="button"
                    className="mr-2 inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200 disabled:text-gray-200"
                  >
                    Lihat
                  </button>

                  <button
                    type="button"
                    className="mr-2 inline-flex items-center rounded border border-indigo-600 px-2.5 py-1.5 text-xs font-medium text-indigo-600 shadow-sm hover:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:border-indigo-200 disabled:text-indigo-200"
                    onClick={() => handleShowForm(!formModalState.open)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center rounded border border-transparent bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-200 disabled:text-gray-200"
                    onClick={() => prompt('Are you sure?, Please type your name to confirm deletion')}
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {formModalState.open && (
        <PenghargaanForm
          open={formModalState.open}
          setOpen={(open: boolean) => handleShowForm(open)}
          selectedId={formModalState?.selectedId}
        />
      )}
    </>
  );
}
