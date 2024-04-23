import React from 'react';

import { GajiAPI } from '../../../constants/APIUrls';
import {
  GetGajiHariBermasalahReq,
  GetGajiHariBermasalahRes,
  GetGajiPegawaiReq,
  GetGajiPegawaiRes,
} from '../../../types/api/GajiAPI';
import useCommonApi from '../../shared/hooks/useCommonApi';
import usePersonalData from '../../shared/hooks/usePersonalData';
import formatRupiah from './shared/FormattedCurrency';

interface ID {
  id: string;
}

export default function ModalGajiPegawai(props: ID) {
  const personalPegawaiData = usePersonalData();
  const userId: number = personalPegawaiData?.user_id ?? 0;
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const params = {
    page: 1,
    per_page: 31,
    user_id: userId,
    bulan: month,
    tahun: year,
  };
  const { data: getGajiPegawai } = useCommonApi<GetGajiPegawaiReq, GetGajiPegawaiRes>(
    GajiAPI.GET_GAJI_DETAIL,
    params,
    { method: 'GET' },
    { skipCall: !userId }
  );

  const { data: getDetailHariBermasalah } = useCommonApi<GetGajiHariBermasalahReq, GetGajiHariBermasalahRes>(
    GajiAPI.GET_HARI_BERMASALAH_DETAIL,
    params,
    { method: 'GET' },
    { skipCall: !userId }
  );

  return (
    <>
      <div id={props.id}>
        <table className="min-w-full">
          <tbody className="bg-white">
            <tr>
              <td colSpan={2} className="px-6 py-4">
                <p className="text-lg font-bold text-gray-500">LAPORAN GAJI PPNPN</p>
              </td>
            </tr>
            {[
              { label: 'Nama', value: getGajiPegawai?.list?.[0]?.nama },
              { label: 'Nip', value: getGajiPegawai?.list?.[0]?.nip },
              { label: 'Jabatan', value: getGajiPegawai?.list?.[0]?.jabatan },
              { label: 'Unit Kerja', value: getGajiPegawai?.list?.[0]?.unit_kerja },
              { label: 'Tanggal Priode', value: getGajiPegawai?.list?.[0]?.periode },
              { label: 'Besaran Gaji', value: formatRupiah(getGajiPegawai?.list?.[0]?.jumlah_gaji_awal ?? 0) },
            ].map((each, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm font-medium text-[#6B7280]">{each.label}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{each.value}</td>
              </tr>
            ))}
            <tr>
              <td className="px-6 py-4 text-sm font-medium text-[#6B7280]"> Gaji bermasalah di bulan sebelumnya </td>
              <td>
                <span className="px-6 py-4 text-sm font-bold text-gray-500">
                  {`${formatRupiah(getGajiPegawai?.list?.[0]?.jumlah_gaji_awal ?? 0)} - 
                    ${formatRupiah(getGajiPegawai?.list?.[0]?.jumlah_potongan_gaji ?? 0)} = 
                    ${formatRupiah(getGajiPegawai?.list?.[0]?.jumlah_gaji_bulan_ini ?? 0)}`}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-10 rounded bg-white shadow-md">
          <table className="border-blac w-full table-auto rounded-lg">
            <caption className="caption-top text-xs text-gray-500">
              Detail Pemotongan Absensi Bulan {getGajiPegawai?.list?.[0]?.periode}
            </caption>
            <thead className="divide-y divide-gray-200 bg-gray-200 py-3">
              <tr className="text-sm uppercase leading-normal text-black">
                <th className="py-3 px-6 text-left">Hari</th>
                <th className="py-3 px-6 text-left">Tanggal</th>
                <th className="py-3 px-6 text-left">Status Hadir</th>
                <th className="py-3 px-6 text-left">Pengurangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white text-sm font-light text-gray-600">
              {(getDetailHariBermasalah?.list || []).map((data, dataIdx) => {
                return (
                  <tr key={dataIdx} className={'border-gray-200 hover:bg-gray-100'}>
                    <td className="whitespace-nowrap py-3 px-6 text-left text-sm text-gray-500">{data?.hari}</td>
                    <td className="whitespace-nowrap py-3 px-6 text-left text-sm text-gray-500">{data?.tanggal}</td>
                    <td className="whitespace-nowrap py-3 px-6 text-left text-sm text-gray-500">
                      {data?.status_kehadiran}
                    </td>
                    <td className="whitespace-nowrap py-3 px-6 text-left text-sm text-gray-500">
                      {formatRupiah(Number(data?.pengurangan) ?? 0)}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan={3} className="whitespace-nowrap px-6 text-left font-bold text-black">
                  Total
                </td>
                <td className="whitespace-nowrap py-3 px-6 text-left font-bold text-black">
                  {formatRupiah(getGajiPegawai?.list?.[0]?.jumlah_gaji_bulan_ini ?? 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
