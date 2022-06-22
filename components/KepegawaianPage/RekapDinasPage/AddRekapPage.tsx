import { ChevronLeftIcon } from '@heroicons/react/outline';
import React from 'react';

import { classNames } from '../../../utils/Components';

function AddRekapPage(props: any) {
  console.log(props)

  return (
    <>
      <div className="rounded-lg bg-white shadow">
        {props?.type === 'edit' &&
          <a href="/kepegawaian/rekap-dinas?id=1" className="flex flex-row items-center gap-x-2 py-6 px-6">
            <ChevronLeftIcon className="h-5 w-5" />
            <div>Kembali</div>
          </a>
        }
        <div className={classNames(props?.type === 'add' ? "py-6":"pb-6","px-6")}>
          <div className="flex flex-col">
            <p className="text-[24px] font-medium text-gray-900">{props?.type === 'add' ? 'Pendataan Dinas' : 'Data Dinas'}</p>
            <p className="text-[16px] font-[400] text-[#6B7280]">
              Isi data dibawah ini berdasarkan informasi yang tercantum pada surat tugas
            </p>
          </div>

          <div className="mt-[32px] w-full">
            <form>
              <div className="mt-5 sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">Unit Organisasi</label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <select
                    name="jenis_diklat_id"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value={''}>Silahkan Pilih</option>
                    <option value={1}>Lorem Ipsum</option>
                    <option value={2}>Lorem Ipsum</option>
                  </select>
                </div>
              </div>

              <div className="mt-[27px]">
                <label htmlFor="nosp" className="block text-sm font-medium text-gray-700">
                  Nomor SP
                </label>
                <div className="mt-1">
                  <input
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="nosp"
                    type="text"
                  />
                </div>
              </div>

              <div className="mt-[27px]">
                <label htmlFor="tgl_surat" className="block text-sm font-medium text-gray-700">
                  Tanggal Surat
                </label>
                <div className="mt-1">
                  <input
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="nosp"
                    type="date"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700">Jenis Dinas</label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <select
                    name="jenis_diklat_id"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value={''}>Silahkan Pilih</option>
                    <option value={1}>Lorem Ipsum</option>
                    <option value={2}>Lorem Ipsum</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tanggal Mulai Dinas</label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                      name="tgl_mulai"
                      type="date"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tanggal Selesai Dinas</label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                      name="tgl_selesai"
                      type="date"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700">Lokasi Dinas</label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="lokasi_dinas"
                    type="text"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700">Isi Penugasan</label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <textarea
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="lokasi_dinas"
                  />
                </div>
              </div>

              <div className="mt-5">
                <div className="h-[1px] w-full bg-[#D1D5DB]"></div>
              </div>

              <div className="mt-5">
                <label htmlFor="surtug" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Unggah Surat Tugas
                </label>
                <div className="mt-1">
                  <div className="flex w-full justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-white shadow">
        <div className="p-6 px-6 pb-[51px]">
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">Pegawai</label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <select
                name="jenis_diklat_id"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value={''}></option>
              </select>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex w-full flex-row">
              <div>
                <p className="px-2 text-[16px]">1</p>
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <p className="px-2 text-[16px]">Widodo Arjuna - 198607122010121007</p>
                <p className="px-2 text-[14px] font-[400] text-[#6B7280]">Direktorat Kelembagaan</p>
                <div className="flex flex-row">
                  <p className="px-2 text-[16px] font-[500] text-[#10B981]">Available,</p>
                  <p className="text-[16px] font-[500]"> 13 Juni 2022 - 16 Juni 2022 </p>
                </div>
              </div>
              <div className="ml-auto">
                <div className="flex flex-row gap-x-[12px]">
                  <button
                    type="button"
                    className="rounded-[6px] bg-[#9CA3AF] py-[9px] px-[17px] text-[14px] text-gray-50"
                  >
                    Hapus
                  </button>
                  <button
                    type="button"
                    className="rounded-[6px] bg-[#4F46E5] py-[9px] px-[17px] text-[14px] text-gray-50"
                  >
                    Edit Tanggal
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-[11px] mb-[28px] h-[1px] w-full bg-[#E6E6E6]"></div>

            <div className="flex w-full flex-row">
              <div>
                <p className="px-2 text-[16px]">2</p>
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <p className="px-2 text-[16px]">Muhammad Muaz Ramadhan - 198607122010121007 </p>
                <p className="px-2 text-[14px] font-[400] text-[#6B7280]">Direktorat Sumber Daya</p>
                <div className="flex flex-row">
                  <p className="px-2 text-[16px] font-[500] text-[#DC2626]">Not Available, </p>
                  <p className="text-[16px] font-[500]"> 13 Juni 2022 - 15 Juni 2022 </p>
                </div>
              </div>
              <div className="ml-auto">
                <div className="flex flex-row gap-x-[12px]">
                  <button
                    type="button"
                    className="rounded-[6px] bg-[#9CA3AF] py-[9px] px-[17px] text-[14px] text-gray-50"
                  >
                    Hapus
                  </button>
                  <button
                    type="button"
                    className="rounded-[6px] bg-[#4F46E5] py-[9px] px-[17px] text-[14px] text-gray-50"
                  >
                    Edit Tanggal
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-[11px] mb-[28px] h-[1px] w-full bg-[#E6E6E6]"></div>
          </div>

          <div className="mt-[3rem] flex w-full">
            <div className="ml-auto flex flex-row gap-x-[12px]">
              <button
                type="button"
                className="rounded-[6px] bg-[#9CA3AF] py-[9px] px-[17px] text-[14px] text-gray-50"
                onClick={() => (window.location.href = '/kepegawaian/rekap-dinas')}
              >
                Batal
              </button>
              <button type="button" className="rounded-[6px] bg-[#4F46E5] py-[9px] px-[17px] text-[14px] text-gray-50">
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddRekapPage