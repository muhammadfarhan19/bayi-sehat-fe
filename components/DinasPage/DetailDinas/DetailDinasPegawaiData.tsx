import { ChevronLeftIcon, UploadIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import * as React from 'react';

import { CircleProgress } from '../../shared/CircleProgress';
import UploadWrapper, { FileObject } from '../../shared/Input/UploadWrapper';
import DinasSection from './DinasSection';
import ExternalSection from './ExternalSection';
import PegawaiSection from './PegawaiSection';

function DetailDinasPegawaiData() {
  const [fileName, setFileName] = React.useState('');

  return (
    <>
      <div className="flex flex-col flex-nowrap justify-between gap-y-2 rounded-lg bg-white py-4 shadow">
        <Link href="/kepegawaian">
          <a className="flex flex-row items-center gap-x-2 px-4">
            <ChevronLeftIcon className="h-8 w-8" />
            <span className="text-sm">Kembali</span>
          </a>
        </Link>
        <div className="px-6">
          <div className="flex flex-row justify-between">
            <p className="text-lg font-medium text-gray-900">Data Dinas</p>
            <div className="flex h-auto items-center rounded-md bg-blue-500 px-2 text-xs text-white">
              Menunggu PUMK Memproses
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-nowrap justify-between rounded-lg bg-white p-6 py-4 shadow">
        <p className="text-lg font-medium text-gray-900">Form Pembayaran</p>
        <p className="text-xs text-gray-900">
          Download <span className="cursor-pointer text-indigo-600 underline">Template</span>. Masukan dokumen
          permohonan dalam bentuk CSV max 2mb
        </p>
        <div className="my-4 flex w-full max-w-[400px] shrink grow flex-col self-center">
          <UploadWrapper
            allowedTypes={['pdf']}
            handleUploadChange={(files: FileObject[]) => {
              setFileName(files[0].name);
            }}
          >
            {({ loading }) => (
              <div className="flex flex-col items-center space-y-2 rounded-md border-2 border-dashed border-blue-800 bg-slate-100 py-4">
                {loading ? <CircleProgress /> : null}
                {fileName ? (
                  <span className="text-base">{fileName}</span>
                ) : (
                  <>
                    <UploadIcon className="h-10 w-10 text-slate-400" />
                    <span className="text-base">Drag and Drop your File Here or</span>
                  </>
                )}
                <button className="rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Browse file
                </button>
              </div>
            )}
          </UploadWrapper>
        </div>
      </div>

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
