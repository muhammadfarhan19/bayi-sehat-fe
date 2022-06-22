import { ChevronLeftIcon } from '@heroicons/react/outline';
import React from 'react';

import { withErrorBoundary } from '../../shared/hocs/ErrorBoundary';

function DetailRekapPage() {
  return (
    <>
      <div className="rounded-lg bg-white shadow">
        <a href="/kepegawaian/rekap-dinas" className="flex flex-row items-center gap-x-2 py-6 px-6">
          <ChevronLeftIcon className="h-5 w-5" />
          <div>Kembali</div>
        </a>
        <div className="px-6 pb-6">

          <div className="flex flex-col">
            <p className="text-[24px] font-medium text-gray-900">Pendataan Dinas</p>
            <p className="text-[16px] font-[400] text-[#6B7280]">
              Isi data dibawah ini berdasarkan informasi yang tercantum pada surat tugas
            </p>
          </div>

          <div className="mt-[32px] w-full">
            <div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead></thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {[
                    { label: 'Unit Kerja', value: 'Sekretariat Diektorat Jenderal Pendidikan Tinggi' },
                    { label: 'Nomor Surat ', value: '4070/E1/TI.02.00/2021' },
                    { label: 'Tanggal Surat', value: '13 Juni 2022' },
                    { label: 'Tanggal Dinas', value: '13 Juni 2022 - 16 Juni 2022' },
                    { label: 'Jenis Dinas', value: 'Dinas SPPD' },
                    { label: 'Lokasi Dinas', value: 'Margo Depok' },
                    { label: 'Isi Penugasan', value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sagittis semper in.' },
                  ].map((each, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.label}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{each.value}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">Pegawai</td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-y-[8px]">
                        <p className="px-2 text-[16px]">Widodo Arjuna - 198607122010121007</p>
                        <p className="px-2 text-[14px] font-[400] text-[#6B7280]">Direktorat Kelembagaan</p>
                        <div className="flex flex-row">
                          <p className="px-2 text-[16px] font-[500] text-[#10B981]">Available,</p>
                          <p className="text-[16px] font-[500]"> 13 Juni 2022 - 16 Juni 2022 </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-[3rem] flex w-full">
            <div className="ml-auto flex flex-row gap-x-[12px]">
              <button
                type="button"
                className="rounded-[6px] bg-[#9CA3AF] py-[9px] px-[17px] text-[14px] text-gray-50"
                onClick={() => (window.location.href = '/kepegawaian/rekap-dinas')}
              >
                Hapus
              </button>
              <button
                type="button"
                className="rounded-[6px] bg-[#4F46E5] py-[9px] px-[17px] text-[14px] text-gray-50"
                onClick={() => (window.location.href = '/kepegawaian/rekap-dinas?id=1&type=edit')}
              >
                Edit
              </button>
            </div>
          </div>
        </div>

      </div>


    </>
  );
}

export default withErrorBoundary(DetailRekapPage);
