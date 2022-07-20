import { ChevronLeftIcon } from '@heroicons/react/outline';
import React from 'react';

import { PDFIcon } from '../../../../shared/icons/PDFIcon';

type DetailPenghargaanProps = {
  riwayatAnakId?: number;
  onBack: () => void;
};

export default function DetailPenghargaan(props: DetailPenghargaanProps) {
  const { onBack } = props;

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="my-3 inline-flex cursor-pointer items-center" onClick={onBack}>
          <ChevronLeftIcon className="mr-1 h-5" />
          <span className="tracking-wide text-gray-600">Kembali</span>
        </div>
      </div>
      <div>
        <span className="mb-2 text-[24px] font-[600]">Data Anak</span>
        <table className="min-w-full divide-y divide-gray-200">
          <thead></thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {[
              { label: 'Nama', value: 'Teguh Bintang' },
              { label: 'Tempat Lahir', value: 'Pekanbaru' },
              { label: 'Tanggal Lahir', value: '23 July 2022' },
              { label: 'Jenis Kelamin', value: 'Laki-laki' },
              { label: 'Agama', value: 'Islam' },
              { label: 'No Hp', value: '081287778xxx' },
              { label: 'NIK', value: '14728908876' },
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
            ].map((each, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.label}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{each.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
