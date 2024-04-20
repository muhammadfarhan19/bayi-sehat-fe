import Link from 'next/link';
import React from 'react';

import { GajiAPI } from '../../../../constants/APIUrls';
import { GetGajiPegawaiReq, GetGajiPegawaiRes } from '../../../../types/api/GajiAPI';
import formatRupiah from '../../../Dashboard/DetailGajiPegawai/shared/FormattedCurrency';
import useCommonApi from '../../../shared/hooks/useCommonApi';
import usePersonalData from '../../../shared/hooks/usePersonalData';

export default function TotalGajiPegawai() {
  const personalPegawaiData = usePersonalData();
  const status_cpns = personalPegawaiData?.status_cpns;
  const userId: number = personalPegawaiData?.user_id ?? 0;
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const { data: getGajiPegawai } = useCommonApi<GetGajiPegawaiReq, GetGajiPegawaiRes>(
    GajiAPI.GET_GAJI_DETAIL,
    {
      page: 1,
      per_page: 1,
      user_id: userId,
      bulan: month,
      tahun: year,
    },
    { method: 'GET' },
    { skipCall: !userId }
  );
  return (
    <>
      {status_cpns === 2 && (
        <div className="mb-24px rounded-lg bg-white shadow ">
          <div className="my-4 px-7 py-1">
            <div className="my-2 flex items-center justify-between rounded-lg border bg-indigo-100 py-2">
              <aside className="ml-3">
                <p className="text-xl font-semibold text-indigo-700">
                  Total Gaji Periode {getGajiPegawai?.list?.[0]?.periode}
                </p>
                <p className="ml-3 text-2xl font-bold text-indigo-700 ">
                  {formatRupiah(getGajiPegawai?.list?.[0]?.jumlah_gaji_bulan_ini ?? 0)}
                </p>
                <p className="text-xs text-indigo-700">
                  {getGajiPegawai?.list?.[0]?.jumlah_hari_bermasalah ?? 0} Hari bermasalah di bulan sebelumnya
                </p>
              </aside>
              <Link href="/detail-gaji">
                <a className="mr-3 flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200">
                  Detail Gaji
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
