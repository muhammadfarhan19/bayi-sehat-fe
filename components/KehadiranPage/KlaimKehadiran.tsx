import { AdjustmentsIcon, UploadIcon } from '@heroicons/react/outline';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { classNames } from '../../utils/Components';
import {
  DropdownSelect,
  InputLabelled,
} from '../KepegawaianPage/DataKepegawaian/DetailPegawai/RiwayatKeluarga/Shared/KeluargaComponents';
import { CircleProgress } from '../shared/CircleProgress';
import { withErrorBoundary } from '../shared/hocs/ErrorBoundary';
import usePersonalData from '../shared/hooks/usePersonalData';
import UploadWrapper, { FileObject } from '../shared/Input/UploadWrapper';
import Pagination from '../shared/Pagination';

function KlaimKehadiran() {
  const {
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const personalPegawaiData = usePersonalData();

  return (
    <React.Fragment>
      <section aria-labelledby="section-1-title">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-xl font-medium leading-6 text-gray-900">Kuota Klaim</h3>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="overflow-hidden rounded-lg bg-gray-100 px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm text-gray-500">Kuota klaim per bulan</dt>
                <dd className="mt-1 text-3xl font-semibold text-indigo-700">{'8'} Hari</dd>
              </div>

              <div className="overflow-hidden rounded-lg bg-gray-100 px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm text-gray-500">Sisa kuota klaim bulan ini</dt>
                <dd className="mt-1 text-3xl font-semibold text-indigo-700">{'10'} Hari</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="section-1-title">
        <div className="overflow-hidden rounded-lg bg-white px-6 py-6 shadow">
          <h3 className="text-xl font-medium leading-6 text-gray-900">Pengajuan Klaim Kehadiran</h3>
          <InputLabelled
            isError={null}
            isUneditable={true}
            errorMessage={null}
            validation={null}
            name="nama"
            value={personalPegawaiData?.nama}
            type="text"
            label="Nama"
          />

          <InputLabelled
            isError={null}
            errorMessage={null}
            validation={null}
            name="tempat_lahir"
            type="date"
            label="Tanggal Klaim"
          />

          <DropdownSelect
            isError={null}
            errorMessage={null}
            validation={null}
            label="Jenis Pengajuan"
            defaultOption="Silahkan Pilih"
            firstOption="Jam Kerja Masuk"
            secondOption="Jam Kerja Pulang"
            formVerification="status_anak"
          />

          <InputLabelled isError={null} errorMessage={null} validation={null} name="nama" type="text" label="Alasan" />

          <div className="mt-5 sm:col-span-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Unggah Surat Persetujuan dari Pimpinan
            </label>
            <Controller
              control={control}
              name={'file_name_any_credentials'}
              rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
              render={({ field: { onChange, value } }) => (
                <UploadWrapper
                  allowedTypes={['pdf']}
                  handleUploadChange={(files: FileObject[]) => {
                    setValue('file_id_any_credentials', files[0].id);
                    onChange(files[0].name);
                  }}
                >
                  {({ loading }) => (
                    <div
                      className={classNames(
                        'flex items-center justify-center space-x-2 rounded-md border-[1px] p-2',
                        errors.file_name_any_credentials ? 'border-red-500' : ''
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
            />
            <div className="mt-5 flex flex-row justify-end">
              <button
                type="submit"
                className="rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Klaim Kehadiran
              </button>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="section-1-title">
        <div className="overflow-hidden rounded-lg bg-white px-6 py-6 shadow">
          <div className="mb-5 flex flex-row items-center">
            <h3 className="text-xl font-medium leading-6 text-gray-900">Data Klaim Kehadiran</h3>
            <div className="ml-auto flex">
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Cari..."
                onChange={() => null}
              />
              <button
                className="ml-1 rounded-md border border-gray-300 p-2 focus:bg-gray-50 focus:outline-none"
                onClick={() => null}
              >
                <AdjustmentsIcon className="h-5  w-5 animate-pulse text-gray-400" />
              </button>
            </div>
          </div>

          <div className="flex w-full flex-row gap-x-[16px]">
            <div className="w-[202px] pb-2">
              <p className="text-sm font-medium text-gray-700"> Dari Tanggal</p>
              <input
                type="date"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                onChange={() => null}
              />
            </div>
            <div className="w-[202px] pb-2">
              <p className="text-sm font-medium text-gray-700"> Sampai Tanggal</p>
              <input
                type="date"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                onChange={() => null}
              />
            </div>
          </div>
          <div className="my-[24px] overflow-x-auto sm:mx-0 ">
            <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
              <div className="sm:rounded-lg">
                <table className="w-full table-auto overflow-auto rounded-lg bg-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Tanggal
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Jenis Pengajuan
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Alasan
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Dokumen
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      className={
                        // dataIdx % 2 === 0 ?
                        'bg-white hover:bg-gray-100'
                        //  :
                        //  'bg-gray-50 hover:bg-gray-100'
                      }
                    >
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">1</td>
                      <td className="cursor-pointer px-6 py-4 text-xs font-medium text-blue-900" onClick={() => null}>
                        {'1'}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">{'2'}</td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">{'3'}</td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">{'4'}</td>
                    </tr>
                  </tbody>
                </table>
                <Pagination onChange={() => 1} totalData={20} perPage={1} page={20} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default withErrorBoundary(KlaimKehadiran);
