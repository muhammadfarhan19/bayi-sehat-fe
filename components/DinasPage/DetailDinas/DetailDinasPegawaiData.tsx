import { ChevronLeftIcon } from '@heroicons/react/solid';
import Link from 'next/link';

import { StatusPembayaranText } from '../../../constants/Resource';
import { getQueryString } from '../../../utils/URLUtils';
import { withErrorBoundary } from '../../shared/hocs/ErrorBoundary';
import DinasSection from './DinasSection';
import ExternalSection from './ExternalSection';
import FormBukti from './FormBukti';
import FormPembayaran from './FormPembayaran';
import PegawaiSection from './PegawaiSection';
import RincianSection from './RincianSection';
import useUpdateStatus from './useUpdateStatus';

function DetailDinasPegawaiData() {
  const { status } = getQueryString<{ status: string }>();
  const { updateStatus } = useUpdateStatus();

  const statusPembayaranId = Number(status);
  const bgColor =
    statusPembayaranId === 4
      ? 'bg-green-500'
      : statusPembayaranId === 3
      ? 'bg-blue-300'
      : statusPembayaranId === 2
      ? 'bg-orange-400'
      : statusPembayaranId === 1
      ? 'bg-yellow-400'
      : 'bg-blue-600';

  const handleAjukanPembayaran = () => {
    updateStatus(statusPembayaranId + 1);
  };

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
            <div className={`flex h-auto items-center rounded-md ${bgColor} px-2 text-xs text-white`}>
              {StatusPembayaranText[statusPembayaranId]}
            </div>
          </div>
        </div>
      </div>

      {[0, 1].includes(statusPembayaranId) && <FormPembayaran />}
      {[2, 3].includes(statusPembayaranId) && <FormBukti />}

      <RincianSection />
      <DinasSection />
      <PegawaiSection />
      <ExternalSection />

      {[0, 1].includes(statusPembayaranId) && (
        <div className="flex flex-col items-end gap-y-2 rounded-lg bg-white py-4 shadow">
          <div className="flex items-center gap-x-2 px-6">
            <Link href="/keuangan/daftar-dinas">
              <button className="rounded border border-transparent bg-gray-300 p-2 text-sm font-medium text-white shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-500 disabled:text-gray-200">
                Kembali
              </button>
            </Link>
            <button
              onClick={handleAjukanPembayaran}
              className="rounded border border-transparent bg-indigo-600 p-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200"
            >
              Ajukan Pembayaran
            </button>
          </div>
        </div>
      )}

      {/* Preload colors class */}
      <span className={'hidden bg-green-500'} />
      <span className={'hidden bg-blue-300'} />
      <span className={'hidden bg-orange-400'} />
      <span className={'hidden bg-yellow-400'} />
      <span className={'hidden bg-blue-600'} />
    </>
  );
}

export default withErrorBoundary(DetailDinasPegawaiData);
