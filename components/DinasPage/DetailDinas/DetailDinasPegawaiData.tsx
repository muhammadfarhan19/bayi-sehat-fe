import { Disclosure } from '@headlessui/react';
import { ChevronLeftIcon, ChevronUpIcon, UploadIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import * as React from 'react';

import { classNames } from '../../../utils/Components';
import { CircleProgress } from '../../shared/CircleProgress';
import UploadWrapper, { FileObject } from '../../shared/Input/UploadWrapper';

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

      <Disclosure defaultOpen={true} as="div" className="rounded-lg bg-white py-4 shadow">
        {({ open }) => (
          <>
            <Disclosure.Button as="div" className="flex cursor-pointer flex-row items-center justify-between px-6">
              <span className="text-lg font-medium text-gray-900">Detail Dinas</span>
              <ChevronUpIcon
                className={classNames(
                  open ? 'rotate-180 text-indigo-700' : 'text-indigo-600',
                  'h-6 w-6 transform transition-colors duration-150 ease-in-out group-hover:text-indigo-700'
                )}
              />
            </Disclosure.Button>
            <Disclosure.Panel as="div" className="flex flex-col flex-nowrap space-y-2 pt-6">
              {[
                { label: 'Unit Kerja', content: <>Sekretariat Diektorat Jenderal Pendidikan Tinggi</> },
                {
                  label: 'Nomor Surat',
                  content: <span className="cursor-pointer text-indigo-600 underline">4070/E1/TI.02.00/2021</span>,
                },
                { label: 'Tanggal Surat', content: <>13 Juni 2022</> },
                { label: 'Tanggal Dinas', content: <>13 Juni 2022 16 Juni 2022</> },
                { label: 'Jenis Dinas', content: <>Dinas SPPD</> },
                { label: 'Lokasi Dinas', content: <>Margo Depok</> },
                { label: 'PIC BP', content: <>Sutikno</> },
                { label: 'PIC PUMK', content: <>Ipong</> },
                { label: 'PIC Kegiatan', content: <>Widodo Arjuna</> },
                { label: 'Isi Penugasan', content: <>Flow Reminder Dinas untuk Pegawai Intradikti</> },
                {
                  label: 'Surat Tugas',
                  content: (
                    <>
                      4070/E1/T1.02.00/2021 <span className="cursor-pointer text-indigo-600 underline">Lihat</span>
                    </>
                  ),
                },
              ].map((each, index, collections) => (
                <React.Fragment key={`content${index}`}>
                  <div className="flex px-6">
                    <span className="shrink grow basis-5/12 text-gray-700 sm:basis-3/12">{each.label}</span>
                    <div className="grow basis-7/12 sm:basis-9/12">{each.content}</div>
                  </div>
                  {collections.length - 1 !== index && <div className="border-t-[1px] border-solid" />}
                </React.Fragment>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure defaultOpen={true} as="div" className="rounded-lg bg-white py-4 shadow">
        {({ open }) => (
          <>
            <Disclosure.Button as="div" className="flex cursor-pointer flex-row items-center justify-between px-6">
              <p className="text-lg font-medium text-gray-900">Detail Pegawai</p>
              <ChevronUpIcon
                className={classNames(
                  open ? 'rotate-180 text-indigo-700' : 'text-indigo-600',
                  'h-6 w-6 transform transition-colors duration-150 ease-in-out group-hover:text-indigo-700'
                )}
              />
            </Disclosure.Button>
            <Disclosure.Panel as="div" className="flex flex-col flex-nowrap space-y-2 pt-6">
              <div className="flex px-6">
                <span className="shrink grow basis-5/12 text-gray-700 sm:basis-3/12">Pegawai</span>
                <div className="flex grow basis-7/12 flex-col gap-y-2 sm:basis-9/12">
                  {[
                    {
                      name: 'Widodo Arjuna - 198607122010121007',
                      position: 'Direktorat Kelembagaan',
                      status: 'Available',
                      date: '13 Juni 2022 - 16 Juni 2022',
                    },
                    {
                      name: 'Muhammad Muaz Ramadhan - 198607122010121007',
                      position: 'Direktorat Kelembagaan',
                      status: 'Available',
                      date: '16 Juni 2022',
                    },
                    {
                      name: 'Diago Dwi Yulianda - 198607122010121007	',
                      position: 'Direktorat Kelembagaan',
                      status: 'Available',
                      date: '13 Juni 2022 - 16 Juni 2022',
                    },
                  ].map((each, index) => (
                    <div key={`pegawai${index}`} className="flex">
                      <div className="shrink grow basis-1">{index + 1}.</div>
                      <div className="flex grow basis-11/12 flex-col">
                        <div className="text-base">{each.name}</div>
                        <div className="text-sm text-gray-500">{each.position}</div>
                        <div>
                          <span className="text-green-500">{each.status}</span>, {each.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure defaultOpen={true} as="div" className="rounded-lg bg-white py-4 shadow">
        {({ open }) => (
          <>
            <Disclosure.Button as="div" className="flex cursor-pointer flex-row items-center justify-between px-6">
              <span className="text-lg font-medium text-gray-900">Detail Tim Eksternal</span>
              <ChevronUpIcon
                className={classNames(
                  open ? 'rotate-180 text-indigo-700' : 'text-indigo-600',
                  'h-6 w-6 transform transition-colors duration-150 ease-in-out group-hover:text-indigo-700'
                )}
              />
            </Disclosure.Button>
            <Disclosure.Panel as="div" className="flex flex-col flex-nowrap space-y-2 pt-6">
              <div className="flex px-6">
                <span className="shrink grow basis-5/12 text-gray-700 sm:basis-3/12">Tim Eksternal</span>
                <div className="flex grow basis-7/12 flex-col gap-y-2 sm:basis-9/12">
                  {[
                    {
                      name: 'Widodo Arjuna - 198607122010121007',
                      position: 'Direktorat Kelembagaan',
                    },
                    {
                      name: 'Muhammad Muaz Ramadhan - 198607122010121007',
                      position: 'Direktorat Kelembagaan',
                    },
                    {
                      name: 'Diago Dwi Yulianda - 198607122010121007	',
                      position: 'Direktorat Kelembagaan',
                    },
                  ].map((each, index) => (
                    <div key={`pegawai${index}`} className="flex">
                      <div className="shrink grow basis-1">{index + 1}.</div>
                      <div className="flex grow basis-11/12 flex-col">
                        <div className="text-base">{each.name}</div>
                        <div className="text-sm text-gray-500">{each.position}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
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
