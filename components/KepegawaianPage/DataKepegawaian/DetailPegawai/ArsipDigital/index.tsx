import { PlusIcon } from '@heroicons/react/outline';
import React from 'react';

import { withErrorBoundary } from '../../../../shared/hocs/ErrorBoundary';
import UploadForm from './UploadForm';

function ArsipDigital() {
  const [formModalState, setFormModalState] = React.useState<{ open: boolean; selectedId?: string }>({
    open: false,
    selectedId: undefined,
  });

  const handleShowForm = (open: boolean, selectedId?: string) => {
    setFormModalState({
      open,
      selectedId,
    });
  };

  return (
    <>
      <div className="my-3 flex items-center">
        <div className="flex flex-1 pr-2 text-sm text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, Praesent vulputate, est quis iaculis tempus.
        </div>
        <button
          type="button"
          className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200 disabled:text-gray-200"
          onClick={() => handleShowForm(!formModalState.open)}
        >
          <PlusIcon className="mr-1 h-4" />
          Tambah Arsip Digital
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              No
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Nama Berkas
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Diunggah Pada
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {[{ label: 'KTP' }].map((each, index) => (
            <tr key={index}>
              <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{index + 1}</td>
              <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.label}</td>
              <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.label}</td>
              <td className="w-[220px] px-6 py-4 text-sm text-gray-500">
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200 disabled:text-gray-200"
                  >
                    Lihat
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center rounded border border-indigo-600 px-2.5 py-1.5 text-xs font-medium text-indigo-600 shadow-sm hover:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:border-indigo-200 disabled:text-indigo-200"
                    onClick={() => handleShowForm(!formModalState.open, String(index + 1))} // TODO: Change this to real index
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
          ))}
        </tbody>
      </table>
      {formModalState.open ? (
        <UploadForm
          open={formModalState.open}
          setOpen={(open: boolean) => handleShowForm(open)}
          selectedId={formModalState?.selectedId}
        />
      ) : null}
    </>
  );
}

export default withErrorBoundary<typeof ArsipDigital, unknown>(ArsipDigital);
