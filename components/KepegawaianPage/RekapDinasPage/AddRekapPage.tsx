import { ChevronLeftIcon, UploadIcon } from '@heroicons/react/outline';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { UnitKerjaAPI } from '../../../constants/APIUrls';
import { GetUnitKerjaData } from '../../../types/api/UnitKerjaAPI';
import { classNames } from '../../../utils/Components';
import { CircleProgress } from '../../shared/CircleProgress';
import useCommonApi from '../../shared/hooks/useCommonApi';
import UploadWrapper, { FileObject } from '../../shared/Input/UploadWrapper';

interface FormProps {
  type: string;
  dinas_id: string;
}

interface FormState {
  no_sp: string;
  unit_kerja_id: number;
  tgl_surat: string;
  jenis_dinas: number;
  tgl_mulai: string;
  tgl_selesai: string;
  lokasi: string;
  isi_penugasan: string;
  file_id: string;
  file_name: string;
  jenis_diklat_id: number;
  no_sertifikat: string;
  keterangan: string;
  document_uuid: string;
  document_name: string;
  pegawai_id: number;
  nip: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
}

function AddRekapPage(props: FormProps) {
  // console.log(props);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormState>();

  const { data: unitKerjaList } = useCommonApi<null, GetUnitKerjaData[]>(
    UnitKerjaAPI.GET_UNIT_KERJA_LIST_DIREKTORAT,
    null,
    { method: 'GET' }
  );

  const submitHandler = async (formData: FormState) => {
    // let resSubmit;
    console.log(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="rounded-lg bg-white shadow">
          {props?.type === 'edit' && (
            <a href="/kepegawaian/rekap-dinas?id=1" className="flex flex-row items-center gap-x-2 py-6 px-6">
              <ChevronLeftIcon className="h-5 w-5" />
              <div>Kembali</div>
            </a>
          )}
          <div className={classNames(props?.type === 'add' ? 'py-6' : 'pb-6', 'px-6')}>
            <div className="flex flex-col">
              <p className="text-[24px] font-medium text-gray-900">
                {props?.type === 'add' ? 'Pendataan Dinas' : 'Data Dinas'}
              </p>
              <p className="text-[16px] font-[400] text-[#6B7280]">
                Isi data dibawah ini berdasarkan informasi yang tercantum pada surat tugas
              </p>
            </div>

            <div className="mt-[32px] w-full">
              <div className="mt-5 sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">Unit Organisasi</label>
                <div className="pt-1 sm:col-span-2 sm:mt-0">
                  <select
                    className="w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register('unit_kerja_id', { required: 'Silahkan masukan nama diklat.' })}
                  >
                    <option value="">Semua</option>
                    {(unitKerjaList || []).map((item, index) => (
                      <option key={`options-${index}`} value={item?.unit_kerja_id}>
                        {item?.name}
                      </option>
                    ))}
                  </select>
                  {errors.unit_kerja_id && <p className="mt-1 text-xs text-red-500">{errors.unit_kerja_id.message}</p>}
                </div>
              </div>

              <div className="mt-[27px]">
                <label htmlFor="no_sp" className="block text-sm font-medium text-gray-700">
                  Nomor SP
                </label>
                <div className="pt-1">
                  <input
                    {...register('no_sp', { required: 'Silahkan masukan nomor surat.' })}
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="no_sp"
                    type="text"
                  />
                  {errors.no_sp && <p className="mt-1 text-xs text-red-500">{errors.no_sp.message}</p>}
                </div>
              </div>

              <div className="mt-[27px]">
                <label htmlFor="tgl_surat" className="block text-sm font-medium text-gray-700">
                  Tanggal Surat
                </label>
                <div className="pt-1">
                  <input
                    {...register('tgl_surat', { required: 'Silahkan masukan tanggal surat.' })}
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="tgl_surat"
                    type="date"
                  />
                  {errors.tgl_surat && <p className="mt-1 text-xs text-red-500">{errors.tgl_surat.message}</p>}
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700">Jenis Dinas</label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <select
                    {...register('jenis_dinas', { required: 'Silahkan masukan nama diklat.' })}
                    name="jenis_dinas"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value={''}>Silahkan Pilih</option>
                    <option value={1}>Lorem Ipsum</option>
                    <option value={2}>Lorem Ipsum</option>
                  </select>
                  {errors.jenis_dinas && <p className="mt-1 text-xs text-red-500">{errors.jenis_dinas.message}</p>}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tanggal Mulai Dinas</label>
                  <div className="pt-1 sm:col-span-2 sm:mt-0">
                    <input
                      {...register('tgl_mulai', { required: 'Silahkan masukan tanggal mulai dinas.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                      name="tgl_mulai"
                      type="date"
                    />
                    {errors.tgl_mulai && <p className="mt-1 text-xs text-red-500">{errors.tgl_mulai.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tanggal Selesai Dinas</label>
                  <div className="pt-1 sm:col-span-2 sm:mt-0">
                    <input
                      {...register('tgl_selesai', { required: 'Silahkan masukan tanggal selesai dinas.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                      name="tgl_selesai"
                      type="date"
                    />
                    {errors.tgl_selesai && <p className="mt-1 text-xs text-red-500">{errors.tgl_selesai.message}</p>}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700">Lokasi Dinas</label>
                <div className="pt-1 sm:col-span-2 sm:mt-0">
                  <input
                    {...register('lokasi', { required: 'Silahkan masukan lokasi dinas.' })}
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="lokasi"
                    type="text"
                  />
                  {errors.lokasi && <p className="mt-1 text-xs text-red-500">{errors.lokasi.message}</p>}
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700">Isi Penugasan</label>
                <div className="pt-1 sm:col-span-2 sm:mt-0">
                  <textarea
                    {...register('isi_penugasan', { required: 'Silahkan masukan isi penugasan.' })}
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="isi_penugasan"
                  />
                  {errors.isi_penugasan && <p className="mt-1 text-xs text-red-500">{errors.isi_penugasan.message}</p>}
                </div>
              </div>

              <div className="mt-5">
                <div className="h-[1px] w-full bg-[#D1D5DB]"></div>
              </div>

              <div className="mt-5">
                <label className="block pb-1 text-sm font-medium text-gray-700">Unggah Surat Tugas</label>
                <Controller
                  control={control}
                  name={'document_name'}
                  rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
                  render={({ field: { onChange, value } }) => (
                    <UploadWrapper
                      allowedTypes={['pdf']}
                      handleUploadChange={(files: FileObject[]) => {
                        setValue('document_uuid', files[0].id);
                        onChange(files[0].name);
                      }}
                    >
                      {({ loading }) => (
                        <div
                          className={classNames(
                            'flex items-center justify-between border-[1px] p-3',
                            errors.file_name ? 'border-red-500' : ''
                          )}
                        >
                          <div>
                            <div className="text-sm text-gray-600">{value || 'Surat Tugas'}</div>
                            <div className="text-xs text-gray-400">(pdf)</div>
                          </div>
                          <button
                            disabled={loading}
                            type="button"
                            className="inline-flex items-center rounded border border-green-300 bg-white px-2.5 py-1.5 text-xs font-medium text-green-700 shadow-sm hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:text-gray-300"
                          >
                            {loading ? <CircleProgress /> : null}
                            <UploadIcon className="mr-1 h-4" />
                            Upload
                          </button>
                        </div>
                      )}
                    </UploadWrapper>
                  )}
                ></Controller>
              </div>
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
                <button
                  type="submit"
                  className="rounded-[6px] bg-[#4F46E5] py-[9px] px-[17px] text-[14px] text-gray-50"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddRekapPage;
