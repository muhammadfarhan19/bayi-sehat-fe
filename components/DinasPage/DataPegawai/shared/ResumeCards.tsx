import Link from 'next/link';
import * as React from 'react';

import { KepegawaianAPI } from '../../../../constants/APIUrls';
import { GetPresensiPegawaiSummaryReq, GetPresensiPegawaiSummaryRes } from '../../../../types/api/KepegawaianAPI';
import { Status } from '../../../../types/Common';
import { callAPI } from '../../../../utils/Fetchers';
import { getPegawai } from '../../../shared/hooks/usePersonalData';
import MonthPicker from '../DatePicker';

//type SummaryKey = keyof GetPresensiPegawaiSummaryRes['data'];
//const Cards = [
//  { field: 'masuk', text: 'Kehadiran' },
//  { field: 'terlambat', text: 'Keterlambatan' },
//  { field: 'tidak_hadir', text: 'Tidak Hadir' },
//  { field: 'pulang_terlambat', text: 'PSW' },
//  { field: 'terlambat_pulang_awal', text: 'TPSW' },
//  { field: 'total_presentase_pengurang_kehadiran', text: 'Pemotongan Nilai Presensi' },
//] as { field: SummaryKey; text: string }[];

export function ResumeCards() {
  function formatRupiah(angka: number): string {
    const reverse: string = angka.toString().split('').reverse().join('');
    const ribuan: RegExpMatchArray | null = reverse.match(/\d{1,3}/g);
    const formatted: string = ribuan ? ribuan.join('.').split('').reverse().join('') : '';
    return `Rp ${formatted}`;
  }
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [statusCpns, setStatusCpns] = React.useState<number | undefined>(0);
  const [summaryPersonal, setSummaryPersonal] = React.useState<GetPresensiPegawaiSummaryRes['data']>();

  React.useEffect(() => {
    (async () => {
      const month = selectedDate?.getMonth();
      const year = selectedDate?.getFullYear();

      if (month == undefined || year == undefined) {
        return;
      }

      const pegawai = await getPegawai();
      const statusCpns = pegawai?.status_cpns;
      setStatusCpns(statusCpns);

      const personalSummRaw = await callAPI<GetPresensiPegawaiSummaryReq, GetPresensiPegawaiSummaryRes>(
        KepegawaianAPI.GET_PEGAWAI_PRESENSI_SUMMARY,
        {
          month: selectedDate?.getMonth() === undefined ? 1 : selectedDate.getMonth() + 1,
          pegawai_id: pegawai?.pegawai_id,
          year: selectedDate?.getFullYear(),
        },
        { method: 'post' }
      );

      if (personalSummRaw.status === 200 && personalSummRaw.data?.status === Status.OK) {
        setSummaryPersonal(personalSummRaw.data.data);
      }
    })();
  }, [selectedDate]);

  return (
    <>
      <div className="mb-[24px] overflow-hidden rounded-lg bg-white shadow">
        <div className="my-4 px-7 py-1">
          <div className="mb-4 flex flex-row justify-between">
            <h3 className="inline-flex text-xl font-semibold tracking-wider text-gray-700">Resume Data Kehadiran</h3>
            <MonthPicker onChange={date => setSelectedDate(date)} type="oke" />
            <Link href="/kehadiran">
              <a className="flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200">
                Klaim Kehadiran
              </a>
            </Link>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-3">
              <div className="w-full items-center rounded-md border border-transparent bg-indigo-100 px-5 py-3">
                <div className="text-base font-medium text-indigo-700">
                  {summaryPersonal?.masuk == '' ? 0 : summaryPersonal?.masuk} Kehadiran
                </div>
                <div className="text-base font-medium text-gray-500">&nbsp;</div>
              </div>

              <div className="w-full items-center rounded-md border border-transparent bg-indigo-100 px-5 py-3">
                <div className="text-base font-medium text-indigo-700">
                  {summaryPersonal?.total_kali_tk == '' ? 0 : summaryPersonal?.total_kali_tk} Tanpa Keterangan
                </div>
                <div className="text-base font-medium text-gray-500">&nbsp;</div>
              </div>

              <div className="w-full items-center rounded-md border border-transparent bg-indigo-100 px-5 py-3">
                <div className="text-base font-medium text-indigo-700">
                  {summaryPersonal?.total_kali_terlambat == '' ? 0 : summaryPersonal?.total_kali_terlambat}{' '}
                  Keterlambatan
                </div>
                <div className="text-base font-medium text-gray-500">
                  {summaryPersonal?.total_menit_terlambat == '' ? 0 : summaryPersonal?.total_menit_terlambat} Menit
                  Terlambat
                </div>
              </div>

              <div className="w-full items-center rounded-md border border-transparent bg-indigo-100 px-5 py-3">
                <div className="text-base font-medium text-indigo-700">
                  {summaryPersonal?.total_kali_psw == '' ? 0 : summaryPersonal?.total_kali_psw} Pulang Sebelum Waktunya
                </div>
                <div className="text-base font-medium text-gray-500">
                  {summaryPersonal?.total_menit_psw == '' ? 0 : summaryPersonal?.total_menit_psw} Menit PSW
                </div>
              </div>

              <div className="w-full items-center rounded-md border border-transparent bg-indigo-100 px-5 py-3">
                <div className="text-base font-medium text-indigo-700">
                  {summaryPersonal?.total_kali_lupa_absen_datang == ''
                    ? 0
                    : summaryPersonal?.total_kali_lupa_absen_datang}{' '}
                  Lupa Absen Datang
                </div>
                <div className="text-base font-medium text-gray-500">
                  {summaryPersonal?.total_kali_lupa_absen_pulang == ''
                    ? 0
                    : summaryPersonal?.total_kali_lupa_absen_pulang}{' '}
                  Lupa Absen Pulang
                </div>
              </div>

              <div className="w-full items-center rounded-md border border-transparent bg-indigo-100 px-5 py-3">
                <div className="text-base font-medium text-indigo-700">Pemotongan Nilai Presensi</div>
                <div className="text-base font-medium text-gray-500">
                  {statusCpns === 2
                    ? formatRupiah(
                        summaryPersonal?.total_jumlah_potongan_ppnpn === undefined
                          ? 0
                          : summaryPersonal?.total_jumlah_potongan_ppnpn
                      )
                    : summaryPersonal?.total_presentase_pengurang_kehadiran == undefined
                    ? 0
                    : summaryPersonal?.total_presentase_pengurang_kehadiran}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
