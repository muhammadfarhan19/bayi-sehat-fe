import { Dialog, Transition } from '@headlessui/react';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import React from 'react';

import { GajiAPI } from '../../../constants/APIUrls';
import { GetGajiPegawaiReq, GetGajiPegawaiRes } from '../../../types/api/GajiAPI';
import { withErrorBoundary } from '../../shared/hocs/ErrorBoundary';
import useCommonApi from '../../shared/hooks/useCommonApi';
import usePersonalData from '../../shared/hooks/usePersonalData';
import ModalGajiPegawai from './ModalGajiPegawai';
import FormattedCurrency from './shared/FormattedCurrency';

function DetailGajiPegawai() {
  const [showComponent, setShowComponent] = React.useState(false);
  const personalPegawaiData = usePersonalData();
  const status_cpns = personalPegawaiData?.status_cpns;
  const userId: number = personalPegawaiData?.user_id ?? 0;
  // Date
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
        <>
          <div className="flex flex-row gap-x-[20px] rounded-[8px] bg-white py-6 px-[24px] shadow">
            <div className="flex w-full flex-col gap-y-2 lg:flex-row">
              <div className="my-auto ml-2 flex flex-col">
                <a href="/" className="flex flex-row items-center gap-x-2 ">
                  <ChevronLeftIcon className="h-8 w-8" />
                  <div>Kembali</div>
                </a>
                <h3 className="my-2 mx-2 text-xl font-medium text-gray-900">Detail Gaji Pegawai</h3>
              </div>
              <div className="my-auto ml-2 lg:ml-auto">
                <button
                  onClick={() => {
                    setShowComponent(!showComponent);
                  }}
                  type="button"
                  className="mr-2 mb-2 inline-flex w-fit items-center rounded border border-transparent bg-green-600 py-1.5 px-2.5 text-xs font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-200 disabled:text-gray-200"
                >
                  Download Detail Gaji
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="my-3 px-7 py-1">
              <h4 className="ml-2 text-lg font-semibold tracking-wider text-gray-900">Detail Gaji</h4>
            </div>
            <div className="flex flex-row border-y-[1px] px-7 py-3">
              <div className="text-l ml-2 basis-[300px] tracking-wider text-gray-700">Nama</div>
              <div className="text-l text-gray-700">{getGajiPegawai?.list?.[0]?.nama}</div>
            </div>
            <div className="flex flex-row border-b-[1px] px-7 py-3">
              <div className="text-l ml-2 basis-[300px] tracking-wider text-gray-700">Nip</div>
              <div className="text-l text-gray-700">{getGajiPegawai?.list?.[0]?.nip}</div>
            </div>
            <div className="flex flex-row border-b-[1px] px-7 py-3">
              <div className="text-l ml-2 basis-[300px] tracking-wider text-gray-700">Unit Kerja</div>
              <div className="text-l text-gray-700">{getGajiPegawai?.list?.[0]?.unit_kerja}</div>
            </div>
            <div className="flex flex-row border-b-[1px] px-7 py-3">
              <div className="text-l ml-2 basis-[300px] tracking-wider text-gray-700">Jabatan</div>
              <div className="text-l text-gray-700">{getGajiPegawai?.list?.[0]?.jabatan}</div>
            </div>
            <div className="flex flex-row border-b-[1px] px-7 py-3">
              <div className="text-l ml-2 basis-[300px] tracking-wider text-gray-700">Tanggal Priode</div>
              <div className="text-l text-gray-700">{getGajiPegawai?.list?.[0]?.periode}</div>
            </div>
            <div className="flex flex-row border-b-[1px] px-7 py-3">
              <div className="text-l ml-2 basis-[300px] tracking-wider text-gray-700">Besaran Gaji</div>
              <div className="text-l text-gray-700">
                {FormattedCurrency(getGajiPegawai?.list?.[0]?.jumlah_gaji_awal ?? 0)}
              </div>
            </div>
            <div className="flex flex-row border-b-[1px] px-7 py-3">
              <div className="text-l ml-2 basis-[300px] tracking-wider text-gray-700">
                Pengurangan Gaji Bulan Sebelumnya
              </div>
              <div className="text-l text-gray-700">
                {FormattedCurrency(getGajiPegawai?.list?.[0]?.jumlah_potongan_gaji ?? 0)}
              </div>
            </div>
            <div className="flex flex-row border-b-[1px] px-7 py-3">
              <div className="text-l ml-2 basis-[300px] tracking-wider text-gray-700">Total Gaji</div>
              <div className="text-l font-bold text-gray-700">
                {FormattedCurrency(getGajiPegawai?.list?.[0]?.jumlah_gaji_bulan_ini ?? 0)}
              </div>
            </div>
          </div>
        </>
      )}
      {showComponent && (
        <Transition appear show={showComponent} as={React.Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={() => setShowComponent(!showComponent)}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 backdrop-brightness-50" />
              </Transition.Child>
              <span className="inline-block h-screen align-middle" aria-hidden="true">
                &#8203;
              </span>
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="my-8 inline-block w-full max-w-2xl transform rounded-2xl bg-white text-left align-middle shadow-xl transition-all marker:p-6">
                  <Dialog.Title as="div" className="flex justify-center">
                    {/* <XIcon className="h-5 cursor-pointer " onClick={() => setShowComponent(!showComponent)} /> */}
                    <div className="self-end">
                      <ModalGajiPegawai id="PDF Gaji Pegawai" />
                    </div>
                  </Dialog.Title>

                  <button
                    onClick={() => {
                      const printContents = document.getElementById('PDF Gaji Pegawai')?.outerHTML;
                      document.body.outerHTML = String(printContents);
                      window.print();
                      window.location.href = '/detail-gaji';
                    }}
                    type="submit"
                    className="mt-5 w-full items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Download Detail gaji
                  </button>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
}
export default withErrorBoundary(DetailGajiPegawai);
