import { PlusIcon } from '@heroicons/react/outline';
import React from 'react';

import ConfirmDialog from '../../../../shared/ConfirmDialog';
import KeluargaForm from './KeluargaForm';

type ListKeluargaProps = {
  onShowDetail: (id: number) => void;
};

export default function ListKeluarga(props: ListKeluargaProps) {
  const { onShowDetail } = props;
  const [confirmId, setConfirmId] = React.useState(0);

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

  return formModalState.open ? (
    <KeluargaForm
      open={formModalState.open}
      setOpen={(open: boolean) => handleShowForm(open)}
      selectedId={formModalState?.selectedId}
    />
  ) : (
    <>
      <div className="my-3 flex items-center">
        <div className="flex flex-1 pr-2 text-sm text-gray-500"></div>
        <button
          type="button"
          className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-indigo-200 disabled:text-gray-200"
          onClick={() => handleShowForm(!formModalState.open)}
        >
          <PlusIcon className="mr-1 h-4" />
          Tambah Anggota Keluarga
        </button>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
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
                Status Pasangan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Tanggal Menikah
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Status Pernikahan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Jumlah Anak
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
              <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">test</td>
              <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">test</td>
              <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">test</td>
              <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">test</td>
              <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">test</td>
              <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">
                <div className="whitespace-nowrap">test</div>
              </td>
              <td className="w-[220px] px-6 py-4 text-sm text-gray-500">
                <div className="flex justify-start">
                  <button
                    onClick={() => onShowDetail(1)}
                    type="button"
                    className="mr-2 inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200 disabled:text-gray-200"
                  >
                    Lihat
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
            {/* ))} */}
          </tbody>
        </table>
      </div>
      <ConfirmDialog
        open={!!confirmId}
        message="Anda yakin ingin menghapus data ini?"
        onClose={() => setConfirmId(0)}
        onConfirm={() => null}
      />
    </>
  );
}
