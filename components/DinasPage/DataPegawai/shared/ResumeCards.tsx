import { format } from 'date-fns';
import id from 'date-fns/locale/id';
import Link from 'next/link';

import { KepegawaianAPI } from '../../../../constants/APIUrls';
import { GetPresensiPegawaiSummaryReq, GetPresensiPegawaiSummaryRes } from '../../../../types/api/KepegawaianAPI';
import useCommonApi from '../../../shared/hooks/useCommonApi';
import usePersonalData from '../../../shared/hooks/usePersonalData';

const now = new Date();
now.setDate(0);
const bulanText = format(now, 'MMMM', { locale: id });

type SummaryKey = keyof GetPresensiPegawaiSummaryRes['data'];
const Cards = [
  { field: 'masuk', text: 'Kehadiran' },
  { field: 'terlambat', text: 'Keterlambatan' },
  { field: 'tidak_hadir', text: 'Tidak Hadir' },
  { field: 'pulang_terlambat', text: 'PSW' },
  { field: 'terlambat_pulang_awal', text: 'TPSW' },
  { field: 'dinas', text: 'Dinas' },
] as { field: SummaryKey; text: string }[];

export function ResumeCards() {
  const pegawai = usePersonalData();
  const { data, isValidating } = useCommonApi<GetPresensiPegawaiSummaryReq, GetPresensiPegawaiSummaryRes['data']>(
    KepegawaianAPI.GET_PEGAWAI_PRESENSI_SUMMARY,
    {
      month: now.getMonth() + 1,
      pegawai_id: pegawai?.pegawai_id || 0,
      year: now.getFullYear(),
    },
    { method: 'POST' }
  );

  if (isValidating) {
    return null;
  }

  return (
    <div className="mb-[24px] overflow-hidden rounded-lg bg-white shadow">
      <div className="my-4 px-7 py-1">
        <div className="mb-4 flex flex-row justify-between">
          <h3 className="inline-flex text-xl font-semibold tracking-wider text-gray-700">
            Resume Data Kehadiran Bulan {bulanText}
          </h3>
          <Link href="/kehadiran">
            <a className="flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200">
              Klaim Kehadiran
            </a>
          </Link>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-3">
            {Cards.map((each, index) => (
              <div
                key={`cards-${index}`}
                className="w-full items-center rounded-md border border-transparent bg-indigo-100 px-5 py-3"
              >
                <div className="text-base font-medium text-indigo-700">
                  {data?.[each.field] || 0} {each.text}
                </div>
                <div className="text-base font-medium text-gray-500">Bulan {bulanText}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
