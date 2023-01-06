import { ChevronLeftIcon } from '@heroicons/react/solid';
import Link from 'next/link';

import { StatusPembayaranText } from '../../../constants/Resource';
import { getQueryString } from '../../../utils/URLUtils';
import DinasSection from './DinasSection';
import ExternalSection from './ExternalSection';
import FormBukti from './FormBukti';
import FormPembayaran from './FormPembayaran';
import PegawaiSection from './PegawaiSection';

function DetailDinasPegawaiData() {
  const { status } = getQueryString<{ status: string }>();
  const statusPembayaranId = Number(status);

  return (
    <>
      <div className="flex flex-col flex-nowrap justify-between gap-y-2 rounded-lg bg-white py-4 shadow">
        <Link href="/keuangan/daftar-dinas">
          <a className="flex flex-row items-center gap-x-2 px-4">
            <ChevronLeftIcon className="h-8 w-8" />
            <span className="text-sm">Kembali</span>
          </a>
        </Link>
        <div className="px-6">
          <div className="flex flex-row justify-between">
            <p className="text-lg font-medium text-gray-900">Data Dinas</p>
            {[2, 3, 4].includes(statusPembayaranId) ? (
              <div className="flex h-auto items-center rounded-md bg-green-500 px-2 text-xs text-white">
                {StatusPembayaranText[statusPembayaranId]}
              </div>
            ) : (
              <div className="flex h-auto items-center rounded-md bg-blue-500 px-2 text-xs text-white">
                {StatusPembayaranText[statusPembayaranId]}
              </div>
            )}
          </div>
        </div>
      </div>

      {[0, 1].includes(statusPembayaranId) && <FormPembayaran />}
      {[2, 3].includes(statusPembayaranId) && <FormBukti />}

      <DinasSection />
      <PegawaiSection />
      <ExternalSection />

      <div className="flex flex-col items-end gap-y-2 rounded-lg bg-white py-4 shadow">
        <div className="flex items-center gap-x-2 px-6">
          <Link href="/kepegawaian">
            <button className="rounded border border-transparent bg-gray-300 p-2 text-sm font-medium text-white shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-500 disabled:text-gray-200">
              Kembali
            </button>
          </Link>
          <button className="rounded border border-transparent bg-indigo-600 p-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200">
            Ajukan Pembayaran
          </button>
        </div>
      </div>
    </>
  );
}

export default DetailDinasPegawaiData;
