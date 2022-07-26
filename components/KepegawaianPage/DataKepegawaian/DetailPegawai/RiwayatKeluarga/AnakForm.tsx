import { UploadIcon } from '@heroicons/react/outline';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { classNames } from '../../../../../utils/Components';
import { CircleProgress } from '../../../../shared/CircleProgress';
import UploadWrapper, { FileObject } from '../../../../shared/Input/UploadWrapper';
import { ButtonRows, DropdownSelect, HeaderComponents, InputLabelled } from './Shared/KeluargaComponents';

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

export default function AnakForm(props: UploadFormProps) {
  const { open, setOpen } = props;

  const toggleModal = () => {
    setOpen(!open);
  };

  // 4.2 tambah anak
  // 4.3 lihat data anak
  // 4.4 hapus data anak

  const {
    control,
    formState: { errors },
    setValue,
  } = useForm<FormState>();

  return (
    <div className="min-w-full px-4 text-center">
      <span className="h-screen align-middle" aria-hidden="true">
        &#8203;
      </span>
      <div className="w-full max-w-full p-6 text-left ">
        <HeaderComponents navigateBack={toggleModal} headerTitle="Data Anak" />
        <form onSubmit={() => null}>
          <DropdownSelect
            label="Nama Orang Tua *"
            defaultOption="Silahkan Pilih"
            firstOption="Fulan"
            secondOption="Bintang"
            formVerification="nama_ortu"
          />
          <DropdownSelect
            label="Status Hubungan Anak *"
            defaultOption="Silahkan Pilih"
            firstOption="Angkat"
            secondOption="Kandung"
            formVerification="stat_hub_anak"
          />
          <InputLabelled name="nama" type="text" label="Nama *" />
          <InputLabelled name="tempat_lahir" type="text" label="Tempat Lahir *" />
          <InputLabelled name="tgl_lahir" type="date" label="Tanggal Lahir" />
          <DropdownSelect
            label="Jenis Kelamin"
            defaultOption="Silahkan Pilih"
            firstOption="Laki-laki"
            secondOption="Perempuan"
            formVerification="jenis_kelamin"
          />
          <InputLabelled name="Agama" label="Agama" type="text" />
          <InputLabelled name="no_hp" label="No. HP" type="text" />
          <InputLabelled name="no_nik" label="NIK atau ID Identitas *" type="text" />
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
          <InputLabelled label="Alamat *" name="alamat" type="text" />
          <InputLabelled label="Nomer Akta Kelahiran" name="no_aktakelahiran" type="text" />
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
          <DropdownSelect
            label="Status Hidup *"
            defaultOption="Silahkan Pilih"
            firstOption="Hidup"
            secondOption="Wafat"
            formVerification="nama_ortu"
          />
          <InputLabelled label="Nomer NPWP" name="no_npwp" type="text" />
          <ButtonRows toggleModal={toggleModal} leftButton="Batal" rightButton="Simpan" />
        </form>
      </div>
    </div>
  );
}
