import { ChevronLeftIcon, PlusIcon } from '@heroicons/react/outline';
import React from 'react';

import ConfirmDialog from '../../../../shared/ConfirmDialog';
import { PDFIcon } from '../../../../shared/icons/PDFIcon';
import AnakForm from './AnakForm';

type DetailPenghargaanProps = {
  riwayatKeluargaId?: number;
  onBack: () => void;
  onShowDetail: (id: number) => void;
};

export default function DetailPenghargaan(props: DetailPenghargaanProps) {
  const { onBack, onShowDetail } = props;
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
    <AnakForm
      open={formModalState.open}
      setOpen={(open: boolean) => handleShowForm(open)}
      selectedId={formModalState?.selectedId}
    />
  ) : (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="my-3 inline-flex cursor-pointer items-center" onClick={onBack}>
          <ChevronLeftIcon className="mr-1 h-5" />
          <span className="tracking-wide text-gray-600">Kembali</span>
        </div>
        <button
          onClick={() => handleShowForm(!formModalState.open)}
          type="button"
          className="mt-5 inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-indigo-200 disabled:text-gray-200"
        >
          <PlusIcon className="mr-1 h-4" />
          Tambah Anak
        </button>
      </div>
      <div>
        <span className="mb-2 text-[24px] font-[600]">Data Pasangan</span>
        <table className="min-w-full divide-y divide-gray-200">
          <thead></thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {[
              { label: 'Nama', value: 'Zaqi Akbar' },
              { label: 'Tempat Lahir', value: 'Merauke' },
              { label: 'Tanggal Lahir', value: '22 July 2022' },
              { label: 'Jenis Kelamin', value: 'Laki-laki' },
              { label: 'Agama', value: 'Islam' },
              { label: 'No Hp', value: '08128777889' },
              {
                label: 'Kartu Identitas',
                value: (
                  <div className="flex flex-row items-center space-x-2">
                    <PDFIcon />
                    <h6>KTP.pdf</h6>
                  </div>
                ),
              },
              { label: 'Alamat', value: 'Jalan Jalan' },
              { label: 'Nomor Akta Kelahiran', value: '22222-9999' },
              {
                label: 'Akta Kelahiran',
                value: (
                  <div className="flex flex-row items-center space-x-2">
                    <PDFIcon />
                    <h6>Akta Kelahiran.pdf</h6>
                  </div>
                ),
              },
              { label: 'Status Hidup', value: 'Hidup' },
              { label: 'Nomer NPWP', value: '1111-000-111' },
              { label: 'Status Pasangan', value: 'Masih' },
              { label: 'Status PNS', value: 'PNS' },
              { label: 'Tanggal Menikah', value: '21-July-2022' },
              { label: 'Nomer Akta Nikah', value: '222-999-000' },
              {
                label: 'Akta Nikah',
                value: (
                  <div className="flex flex-row items-center space-x-2">
                    <PDFIcon />
                    <h6>Akta Nikah.pdf</h6>
                  </div>
                ),
              },
              { label: 'Tanggal Meninggal', value: '-' },
              { label: 'Nomer Akta Meninggal', value: '-' },
              { label: 'Akta Meninggal', value: '-' },
              { label: 'Tanggal Cerai', value: '-' },
              { label: 'No Akta Cerai', value: '-' },
              { label: 'Akta Cerai', value: '-' },
              { label: 'No Kartu Suami/Istri', value: '00012702/AKTANIKAH TK.IV/LAN-NIKAH/2018' },
              {
                label: 'Kartu Suami/Istri',
                value: (
                  <div className="flex flex-row items-center space-x-2">
                    <PDFIcon />
                    <h6>Kartu Suami Istri.pdf</h6>
                  </div>
                ),
              },
              { label: 'Status Pernikahan', value: 'Menikah' },
              { label: 'Jumlah Anak', value: '2 Anak' },
            ].map((each, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.label}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{each.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 overflow-auto">
        <span className="text-[24px] font-[600]">Data Anak</span>
        <table className="mt-2 min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                No
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Nama
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Status Hubungan Anak
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Tanggal Lahir
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Status Hidup
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
              <td className="px-2 py-4 text-sm font-medium text-[#6B7280]">1</td>
              <td className="px-2 py-4 text-sm font-medium text-[#111827]">Teguh Bintang</td>
              <td className="px-2 py-4 text-sm font-medium text-[#6B7280]">Anak Angkat</td>
              <td className="px-2 py-4 text-sm font-medium text-[#111827]">14 Mey 1975</td>
              <td className="px-2 py-4 text-sm font-medium text-[#6B7280]">
                <div className="whitespace-nowrap">Hidup</div>
              </td>
              <td className="w-[220px] px-6 py-4 text-sm text-gray-500">
                <div className="flex justify-start">
                  <button
                    onClick={() => onShowDetail(2)}
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
          </tbody>
        </table>
      </div>
      <ConfirmDialog
        open={false}
        message="Anda yakin ingin menghapus data ini?"
        onClose={() => null}
        onConfirm={() => null}
      />
    </>
  );
}
