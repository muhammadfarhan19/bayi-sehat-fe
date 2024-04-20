import React from 'react';

import { GajiAPI } from '../../../constants/APIUrls';
import {
  GetGajiHariBermasalahReq,
  GetGajiHariBermasalahRes,
  GetGajiPegawaiReq,
  GetGajiPegawaiRes,
} from '../../../types/api/GajiAPI';
import {
  ContentLabelledItems,
  HeaderComponents,
  LabelledRowsItem,
} from '../../KepegawaianPage/DataKepegawaian/DetailPegawai/ProfileSummaryPegawai/Shared/PageComponents';
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
    <div id={props.id}>
      <HeaderComponents name="LAPORAN GAJI PPNPN" />
      <LabelledRowsItem separatorTop="mt-5 mb-2" title="Data Diri Pegawai" />
      <ContentLabelledItems subtitle="Nama" value={getGajiPegawai?.list?.[0]?.nama} />
      <ContentLabelledItems subtitle="Nip" value={getGajiPegawai?.list?.[0]?.nip} />
      <ContentLabelledItems subtitle="Jabatan" value={getGajiPegawai?.list?.[0]?.jabatan} />
      <ContentLabelledItems subtitle="Unit Kerja" value={getGajiPegawai?.list?.[0]?.unit_kerja} />
      <ContentLabelledItems subtitle="Tanggal Priode" value={getGajiPegawai?.list?.[0]?.periode} />
      <ContentLabelledItems
        subtitle="Besaran Gaji"
        value={formatRupiah(getGajiPegawai?.list?.[0]?.jumlah_gaji_awal ?? 0)}
      />

      <div className="flex flex-row ">
        <span className="pr-11 text-xs">Gaji bermasalah di bulan sebelumnya</span>
        <span className="text-xs font-bold">
          {formatRupiah(getGajiPegawai?.list?.[0]?.jumlah_gaji_awal ?? 0) +
            ' - ' +
            formatRupiah(getGajiPegawai?.list?.[0]?.jumlah_potongan_gaji ?? 0) +
            ' = ' +
            formatRupiah(getGajiPegawai?.list?.[0]?.jumlah_gaji_bulan_ini ?? 0)}
        </span>
      </div>

      <div className="mt-10 rounded bg-white shadow-md">
        <table className="border-blac w-full table-auto rounded-lg">
          <caption className="caption-top text-xs">
            Detail Pemotongan Absensi Bulan {getGajiPegawai?.list?.[0]?.periode}
          </caption>
          <thead className="bg-gray-700">
            <tr className="bg-gray-200 text-sm  leading-normal text-black">
              <th className="py-3 px-6 text-left">Hari</th>
              <th className="py-3 px-6 text-left">Tanggal</th>
              <th className="py-3 px-6 text-left">Status Hadir</th>
              <th className="py-3 px-6 text-left">Pengurangan</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light text-gray-600">
            {(getDetailHariBermasalah?.list || []).map((data, dataIdx) => {
              return (
                <tr key={dataIdx} className={'border-b border-gray-200 hover:bg-gray-100'}>
                  <td className="whitespace-nowrap py-3 px-6 text-left text-black">{data?.hari}</td>
                  <td className="whitespace-nowrap py-3 px-6 text-left text-black">{data?.tanggal}</td>
                  <td className="whitespace-nowrap py-3 px-6 text-left text-black">{data?.status_kehadiran}</td>
                  <td className="whitespace-nowrap py-3 px-6 text-left text-black">
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
  );
}
