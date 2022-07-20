import { UploadIcon, XIcon } from '@heroicons/react/outline';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { classNames } from '../../../../../utils/Components';
import { CircleProgress } from '../../../../shared/CircleProgress';
import UploadWrapper, { FileObject } from '../../../../shared/Input/UploadWrapper';

interface UploadFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedId?: number;
}
interface FormState {
  name: number;
  nama_pasangan: string;
  tempat_lahir: string;
  tgl_lahir: string;
  jenis_kelamin: string;
  agama: string;
  no_nik_id: string;
  alamat: string;
  status_hidup: string;
  status_pns: string;
  tgl_menikah: string;
  no_akta_nikah: string;
  file_id: string;
  file_name: string;
  document_uuid: string;
}

export default function KeluargaForm(props: UploadFormProps) {
  const { open, setOpen } = props;

  const toggleModal = () => {
    setOpen(!open);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormState>();

  const submitHandler = (formData: FormState) => {
    alert(formData?.agama);
  };

  // 1. tambah anggota keluarga (suami/istri = pasangan)
  // 2. list pasangan
  // 3. hapus pasangan
  // 4. lihat data pasangan
  // 4.1. detail data pasangan
  // 4.2 tambah anak
  // 4.3 lihat data anak
  // 4.4 hapus data anak

  // logic pada field status pernikahan:
  // - Jika tanggal meninggal dan tanggal cerai kosong maka = Menikah
  // - Jika tanggal meninggal di isi dan tanggal cerai kosong maka =  Cerai Meninggal
  // - Jika tanggal meninggal kosong dan tanggal cerai di isi = maka Cerai Hidup
  // - Jika tanggal meninggal di isi dan tanggal cerai DI ISI maka =  Cerai Meninggal

  return (
    <div className="min-w-full px-4 text-center">
      <span className="h-screen align-middle" aria-hidden="true">
        &#8203;
      </span>
      <div className="w-full max-w-full p-6 text-left ">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Data Pasangan</h3>
          <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
        </div>
        <form onSubmit={() => handleSubmit(submitHandler)}>
          <div className="mt-5 sm:col-span-6">
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
              Nama *
            </label>
            <div className="mt-1">
              <input
                {...register('nama_pasangan', { required: 'Silahkan masukkan nama pasangan.' })}
                className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                name="nama_pasangan"
                type="text"
              />
              {errors.nama_pasangan && <p className="mt-1 text-xs text-red-500">{errors.nama_pasangan.message}</p>}
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label htmlFor="tempat_lahir" className="block text-sm font-medium text-gray-700">
              Tempat Lahir *
            </label>
            <div className="mt-1">
              <input
                {...register('tempat_lahir', { required: 'Silahkan masukkan tempat lahir.' })}
                className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                name="tempat_lahir"
                type="text"
              />
              {errors.tempat_lahir && <p className="mt-1 text-xs text-red-500">{errors.tempat_lahir.message}</p>}
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label htmlFor="tgl_lahir" className="block text-sm font-medium text-gray-700">
              Tanggal Lahir
            </label>
            <div className="mt-1">
              <input
                {...register('tgl_lahir', { required: 'Silahkan pilih tanggal lahir.' })}
                className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                name="tgl_lahir"
                type="date"
              />
              {errors.tgl_lahir && <p className="mt-1 text-xs text-red-500">{errors.tgl_lahir.message}</p>}
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">Jenis Kelamin *</label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <select
                {...register('jenis_kelamin', { required: 'Silahkan pilih jenis kelamin.' })}
                name="jenis_kelamin"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value={''}>Silahkan Pilih</option>
                <option value={'1'}>Laki-laki</option>
                <option value={'2'}>Perempuan</option>
              </select>
              {errors.jenis_kelamin && <p className="mt-1 text-xs text-red-500">{errors.jenis_kelamin.message}</p>}
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">Agama *</label>
            <div className="mt-1">
              <input
                {...register('agama', { required: 'Silahkan masukkan Agama.' })}
                className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                name="agama"
                type="text"
              />
              {errors.agama && <p className="mt-1 text-xs text-red-500">{errors.agama.message}</p>}
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">No. Hp</label>
            <div className="mt-1">
              <input
                className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                name="penyelenggara"
                type="text"
              />
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">NIK/ID Identitas *</label>
            <div className="mt-1">
              <input
                {...register('no_nik_id', { required: 'Silahkan masukkan Nomer NIK.' })}
                className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                name="no_nik_id"
                type="text"
              />
              {errors.no_nik_id && <p className="mt-1 text-xs text-red-500">{errors.no_nik_id.message}</p>}
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">Upload Kartu Identitas (KTP/KK) *</label>
            <Controller
              control={control}
              name={'file_name'}
              rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
              render={({ field: { onChange, value } }) => (
                <UploadWrapper
                  allowedTypes={['pdf']}
                  handleUploadChange={(files: FileObject[]) => {
                    setValue('file_id', files[0].id);
                    onChange(files[0].name);
                  }}
                >
                  {({ loading }) => (
                    <div
                      className={classNames(
                        'flex items-center justify-center space-x-2 rounded-md border-[1px] p-2',
                        errors.file_name ? 'border-red-500' : ''
                      )}
                    >
                      <div className="flex flex-1 flex-row items-center justify-center space-x-3 rounded-md bg-sky-100 py-2">
                        <div>
                          <div className="text-sm text-gray-400">
                            {value || 'Masukan dokumen permohonan dalam bentuk PDF max 2mb'}
                          </div>
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
                    </div>
                  )}
                </UploadWrapper>
              )}
            ></Controller>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">Alamat*</label>
            <div className="mt-1">
              <input className="block w-full rounded-md border-gray-300 pb-10 shadow-sm " name="alamat" type="text" />
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">Nomer Akta Kelahiran</label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                name="no_aktakelahiran"
                type="text"
              />
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">Upload Akta Kelahiran</label>
            <Controller
              control={control}
              name={'file_name'}
              rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
              render={({ field: { onChange, value } }) => (
                <UploadWrapper
                  allowedTypes={['pdf']}
                  handleUploadChange={(files: FileObject[]) => {
                    setValue('file_id', files[0].id);
                    onChange(files[0].name);
                  }}
                >
                  {({ loading }) => (
                    <div
                      className={classNames(
                        'flex items-center justify-center space-x-2 rounded-md border-[1px] p-2',
                        errors.file_name ? 'border-red-500' : ''
                      )}
                    >
                      <div className="flex flex-1 flex-row items-center justify-center space-x-3 rounded-md bg-sky-100 py-2">
                        <div>
                          <div className="text-sm text-gray-400">
                            {value || 'Masukan dokumen permohonan dalam bentuk PDF max 2mb'}
                          </div>
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
                    </div>
                  )}
                </UploadWrapper>
              )}
            ></Controller>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">Status Hidup</label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <select
                name="tingkat_penghargaan"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value={''}>Silahkan Pilih</option>
                <option value={'1'}>Hidup</option>
                <option value={'2'}>Wafat</option>
              </select>
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label htmlFor="tgl_lulus" className="block text-sm font-medium text-gray-700">
              Nomer NPWP
            </label>
            <div className="mt-1">
              <input
                className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                name="no_npwp"
                type="text"
              />
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">Status Pasangan *</label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <select
                name="jenis_kelamin"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value={''}>Silahkan Pilih</option>
                <option value={'1'}>Suami</option>
                <option value={'2'}>Istri</option>
              </select>
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">Status PNS *</label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <select
                name="jenis_kelamin"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value={''}>Silahkan Pilih</option>
                <option value={'1'}>PNS</option>
                <option value={'2'}>Non-PNS</option>
              </select>
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label htmlFor="tgl_lulus" className="block text-sm font-medium text-gray-700">
              Nama *
            </label>
            <div className="mt-1">
              <input
                className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                name="no_npwp"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between space-x-3">
            <div className="mt-5 flex-1 sm:col-span-6">
              <label htmlFor="tgl_lulus" className="block text-sm font-medium text-gray-700">
                Tanggal Menikah *
              </label>
              <div className="mt-1">
                <input
                  className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  name="no_npwp"
                  type="date"
                />
              </div>
            </div>
            <div className="mt-5 flex-1 sm:col-span-6">
              <label htmlFor="tgl_lulus" className="block text-sm font-medium text-gray-700">
                No Akta Menikah *
              </label>
              <div className="mt-1">
                <input
                  className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  name="no_npwp"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">Upload Akta Menikah *</label>
            <Controller
              control={control}
              name={'file_name'}
              rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
              render={({ field: { onChange, value } }) => (
                <UploadWrapper
                  allowedTypes={['pdf']}
                  handleUploadChange={(files: FileObject[]) => {
                    setValue('file_id', files[0].id);
                    onChange(files[0].name);
                  }}
                >
                  {({ loading }) => (
                    <div
                      className={classNames(
                        'flex items-center justify-center space-x-2 rounded-md border-[1px] p-2',
                        errors.file_name ? 'border-red-500' : ''
                      )}
                    >
                      <div className="flex flex-1 flex-row items-center justify-center space-x-3 rounded-md bg-sky-100 py-2">
                        <div>
                          <div className="text-sm text-gray-400">
                            {value || 'Masukan dokumen permohonan dalam bentuk PDF max 2mb'}
                          </div>
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
                    </div>
                  )}
                </UploadWrapper>
              )}
            ></Controller>
          </div>
          <div className="flex flex-row justify-between space-x-3">
            <div className="mt-5 flex-1 sm:col-span-6">
              <label htmlFor="tgl_lulus" className="block text-sm font-medium text-gray-700">
                Tanggal Meninggal
              </label>
              <div className="mt-1">
                <input
                  className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  name="no_npwp"
                  type="date"
                />
              </div>
            </div>
            <div className="mt-5 flex-1 sm:col-span-6">
              <label htmlFor="tgl_lulus" className="block text-sm font-medium text-gray-700">
                No Akta Meninggal
              </label>
              <div className="mt-1">
                <input
                  className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  name="no_npwp"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">Upload Akta Meninggal</label>
            <Controller
              control={control}
              name={'file_name'}
              rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
              render={({ field: { onChange, value } }) => (
                <UploadWrapper
                  allowedTypes={['pdf']}
                  handleUploadChange={(files: FileObject[]) => {
                    setValue('file_id', files[0].id);
                    onChange(files[0].name);
                  }}
                >
                  {({ loading }) => (
                    <div
                      className={classNames(
                        'flex items-center justify-center space-x-2 rounded-md border-[1px] p-2',
                        errors.file_name ? 'border-red-500' : ''
                      )}
                    >
                      <div className="flex flex-1 flex-row items-center justify-center space-x-3 rounded-md bg-sky-100 py-2">
                        <div>
                          <div className="text-sm text-gray-400">
                            {value || 'Masukan dokumen permohonan dalam bentuk PDF max 2mb'}
                          </div>
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
                    </div>
                  )}
                </UploadWrapper>
              )}
            ></Controller>
          </div>
          <div className="flex flex-row justify-between space-x-3">
            <div className="mt-5 flex-1 sm:col-span-6">
              <label htmlFor="tgl_lulus" className="block text-sm font-medium text-gray-700">
                Tanggal Cerai
              </label>
              <div className="mt-1">
                <input
                  className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  name="no_npwp"
                  type="date"
                />
              </div>
            </div>
            <div className="mt-5 flex-1 sm:col-span-6">
              <label htmlFor="tgl_lulus" className="block text-sm font-medium text-gray-700">
                No Akta Cerai
              </label>
              <div className="mt-1">
                <input
                  className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  name="no_npwp"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">Upload Akta Cerai</label>
            <Controller
              control={control}
              name={'file_name'}
              rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
              render={({ field: { onChange, value } }) => (
                <UploadWrapper
                  allowedTypes={['pdf']}
                  handleUploadChange={(files: FileObject[]) => {
                    setValue('file_id', files[0].id);
                    onChange(files[0].name);
                  }}
                >
                  {({ loading }) => (
                    <div
                      className={classNames(
                        'flex items-center justify-center space-x-2 rounded-md border-[1px] p-2',
                        errors.file_name ? 'border-red-500' : ''
                      )}
                    >
                      <div className="flex flex-1 flex-row items-center justify-center space-x-3 rounded-md bg-sky-100 py-2">
                        <div>
                          <div className="text-sm text-gray-400">
                            {value || 'Masukan dokumen permohonan dalam bentuk PDF max 2mb'}
                          </div>
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
                    </div>
                  )}
                </UploadWrapper>
              )}
            ></Controller>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
              Nomer Kartu Suami/Istri
            </label>
            <div className="mt-1">
              <input
                className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                name="nama"
                type="text"
              />
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">Upload Kartu Suami Istri</label>
            <Controller
              control={control}
              name={'file_name'}
              rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
              render={({ field: { onChange, value } }) => (
                <UploadWrapper
                  allowedTypes={['pdf']}
                  handleUploadChange={(files: FileObject[]) => {
                    setValue('file_id', files[0].id);
                    onChange(files[0].name);
                  }}
                >
                  {({ loading }) => (
                    <div
                      className={classNames(
                        'flex items-center justify-center space-x-2 rounded-md border-[1px] p-2',
                        errors.file_name ? 'border-red-500' : ''
                      )}
                    >
                      <div className="flex flex-1 flex-row items-center justify-center space-x-3 rounded-md bg-sky-100 py-2">
                        <div>
                          <div className="text-sm text-gray-400">
                            {value || 'Masukan dokumen permohonan dalam bentuk PDF max 2mb'}
                          </div>
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
                    </div>
                  )}
                </UploadWrapper>
              )}
            ></Controller>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
              Status Pernikahan
            </label>
            <div className="mt-1">
              <input
                disabled={true}
                className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                name="nama"
                type="text"
              />
            </div>
          </div>
          <div className="mt-5 sm:col-span-6"></div>
          <div className="mt-5 flex flex-row justify-end space-x-5">
            <button
              onClick={toggleModal}
              className="w-20 rounded border border-transparent bg-gray-400 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Batal
            </button>
            <button
              type="submit"
              className="w-20 rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
