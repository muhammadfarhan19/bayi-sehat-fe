import React from 'react';

import ConfirmDialog from '../../../shared/ConfirmDialog';
import { withErrorBoundary } from '../../../shared/hocs/ErrorBoundary';
import ShiftPnsForm from '../ShiftPNS/ShiftPnsForm';

function DetailPegawai() {
  const [confirmId, setConfirmId] = React.useState(0);

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

  const table = [
    {
      riwayat_id: 1,
      tanggal: '11-06-2021',
      shift: 'WFH',
      jam_masuk: '08:00',
      jam_keluar: '16:30',
    },
    {
      riwayat_id: 2,
      tanggal: '11-06-2021',
      shift: 'WFO',
      jam_masuk: '08:00',
      jam_keluar: '16:30',
    },
  ];

  return (
    <>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="px-6">
          <div className="flex flex-row py-6">
            <p className="text-lg font-medium text-gray-900">Daftar Shift Pegawai</p>
          </div>

          <div className="flex flex-col gap-y-[8px]">
            <div>
              <label className="block text-sm font-medium text-gray-700">Unit Kerja</label>
              <div className="pt-1 sm:col-span-2 sm:mt-0">
                <input
                  disabled
                  className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  name="unit kerja"
                  type="text"
                  value={'Sekretariat Direktorat Jenderal Pendidikan Tinggi'}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Pegawai</label>
              <div className="pt-1 sm:col-span-2 sm:mt-0">
                <input
                  disabled
                  className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  name="unit kerja"
                  type="text"
                  value={'Aan Sriwidayati, S.E.'}
                />
              </div>
            </div>

            <label className="block text-sm font-medium text-gray-700">Jadwal Shift</label>
            <div className="mt-[10px] flex flex-row gap-x-[8px]">
              <div className="flex flex-col gap-y-[8px]">
                <label className="block text-sm font-medium text-gray-700">Tanggal Awal</label>
                <input className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" type={'date'} />
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <label className="block text-sm font-medium text-gray-700">Tanggal Akhir</label>
                <input className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" type={'date'} />
              </div>
            </div>
          </div>
        </div>

        <table className="mt-[8px] w-full table-auto rounded-lg bg-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                TANGGAL
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                SHIFT
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                JAM MASUK
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                JAM KELUAR
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                AKSI
              </th>
            </tr>
          </thead>
          <tbody>
            {table.map((each, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}>
                <td className="px-6 py-4 text-center text-xs font-medium text-gray-900">{each.tanggal}</td>
                <td className="px-6 py-4 text-center text-xs font-medium text-gray-900">{each.shift}</td>
                <td className="px-6 py-4 text-center text-xs font-medium text-gray-900">{each.jam_masuk}</td>
                <td className="px-6 py-4 text-center text-xs font-medium text-gray-900">{each.jam_keluar}</td>
                <td className="px-6 py-4 text-center text-xs font-medium text-gray-900">
                  <button
                    type="button"
                    className="mr-[8px] rounded-md bg-[#DC2626] px-[11px] py-[7px] text-xs font-medium text-white hover:bg-red-700 focus:outline-none"
                    onClick={() => setConfirmId(each.riwayat_id)}
                  >
                    Hapus
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-[#4F46E5] px-[11px] py-[7px] text-xs font-medium text-white hover:bg-indigo-700 focus:outline-none"
                    onClick={() => handleShowForm(!formModalState.open, String(each.riwayat_id))}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {formModalState.open ? (
        <ShiftPnsForm
          onSuccess={() => null}
          open={formModalState.open}
          setOpen={(open: boolean) => handleShowForm(open)}
          selectedId={formModalState?.selectedId}
        />
      ) : null}
      <ConfirmDialog
        open={!!confirmId}
        message="Anda yakin ingin menghapus data ini?"
        onClose={() => setConfirmId(0)}
        onConfirm={() => setConfirmId(0)}
      />
    </>
  );
}

export default withErrorBoundary(DetailPegawai);
