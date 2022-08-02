import { UploadIcon } from '@heroicons/react/outline';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { RiwayatAnakAPI } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import { PostAnakReq, PostListKeluargaRes } from '../../../../../types/api/RiwayatKeluargaAPI';
import { Status } from '../../../../../types/Common';
import { classNames } from '../../../../../utils/Components';
import { callAPI } from '../../../../../utils/Fetchers';
import { CircleProgress } from '../../../../shared/CircleProgress';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import UploadWrapper, { FileObject } from '../../../../shared/Input/UploadWrapper';
import { ButtonRows, DropdownSelect, HeaderComponents, InputLabelled } from './Shared/KeluargaComponents';

interface UploadFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedId?: number;
  onSuccess: () => void;
  riwayatKeluargaId: number;
}

interface FormState {
  pegawai_id: number;
  pasangan_id: number;
  nama: string;
  status_anak: number;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: number;
  agama: number;
  no_hp: string;
  nik: string;
  alamat: string;
  no_akta_kelahiran: string;
  status_hidup: number;
  npwp: string;
  file_id_any_credentials: string;
  file_name_any_credentials: string;
  file_id_akta_kelahiran: string;
  file_name_akta_kelahiran: string;
  nama_ortu: string;
}

export default function AnakForm(props: UploadFormProps) {
  const { open, setOpen, riwayatKeluargaId, onSuccess } = props;
  const personalPegawaiData = usePersonalData();
  const dispatch = useDispatch();

  const toggleModal = () => {
    setOpen(!open);
  };

  const submitHandler = async (formData: FormState) => {
    const resSubmit = await callAPI<PostAnakReq, PostListKeluargaRes>(
      RiwayatAnakAPI.POST_RIWAYAT_ANAK_INSERT,
      {
        pegawai_id: personalPegawaiData?.pegawai_id,
        pasangan_id: Number(riwayatKeluargaId),
        status_anak: Number(formData?.status_anak),
        nama: formData?.nama,
        tempat_lahir: formData?.tempat_lahir,
        tanggal_lahir: formData?.tanggal_lahir,
        jenis_kelamin: Number(formData?.jenis_kelamin),
        agama: Number(formData?.agama),
        no_hp: formData?.no_hp,
        nik: formData?.nik,
        alamat: formData?.alamat,
        no_akta_kelahiran: formData?.no_akta_kelahiran,
        status_hidup: Number(formData?.status_hidup),
        npwp: formData?.npwp.length === 0 ? '0' : formData?.npwp,
        files: [
          {
            document_uuid: formData?.file_id_any_credentials,
            document_name: formData?.file_name_any_credentials,
          },
          {
            document_name: formData?.file_name_akta_kelahiran,
            document_uuid: formData?.file_id_akta_kelahiran,
          },
        ],
      },
      { method: 'post' }
    );
    if (resSubmit.status === 200 && resSubmit.data?.status === Status.OK) {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Data berhasil tersimpan.',
          type: SnackbarType.INFO,
        })
      );
      onSuccess();
      setOpen(!open);
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal menyimpan data. Mohon coba beberapa saat lagi.',
          type: SnackbarType.ERROR,
        })
      );
    }
  };

  const {
    control,
    formState: { errors },
    setValue,
    register,
    handleSubmit,
  } = useForm<FormState>();

  return (
    <div className="min-w-full px-4 text-center">
      <span className="h-screen align-middle" aria-hidden="true">
        &#8203;
      </span>
      <div className="w-full max-w-full p-6 text-left ">
        <HeaderComponents navigateBack={toggleModal} headerTitle="Data Anak" />
        <form onSubmit={handleSubmit(submitHandler)}>
          <DropdownSelect
            isError={errors.status_anak}
            errorMessage={errors.status_anak?.message}
            validation={{ ...register('status_anak', { required: 'Silahkan Pilih Status Hubungan Anak' }) }}
            label="Status Hubungan Anak *"
            defaultOption="Silahkan Pilih"
            firstOption="Angkat"
            secondOption="Kandung"
            formVerification="status_anak"
          />
          <InputLabelled
            isError={errors.nama}
            errorMessage={errors.nama?.message}
            validation={{ ...register('nama', { required: 'Silahkan Masukkan Nama' }) }}
            name="nama"
            type="text"
            label="Nama *"
          />

          <InputLabelled
            isError={errors.tempat_lahir}
            errorMessage={errors.tempat_lahir?.message}
            validation={{ ...register('tempat_lahir', { required: 'Silahkan Masukkan Tempat Lahir' }) }}
            name="tempat_lahir"
            type="text"
            label="Tempat Lahir *"
          />
          <InputLabelled
            isError={errors.tanggal_lahir}
            errorMessage={errors.tanggal_lahir?.message}
            validation={{ ...register('tanggal_lahir', { required: 'Silahkan Masukkan Tanggal Lahir' }) }}
            name="tanggal_lahir"
            type="date"
            label="Tanggal Lahir"
          />
          <DropdownSelect
            isError={errors.jenis_kelamin}
            errorMessage={errors.jenis_kelamin?.message}
            validation={{ ...register('jenis_kelamin', { required: 'Silahkan Pilih Jenis Kelamin' }) }}
            label="Jenis Kelamin"
            defaultOption="Silahkan Pilih"
            firstOption="Laki-laki"
            secondOption="Perempuan"
            formVerification="jenis_kelamin"
          />

          <div className="mt-5 sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">Agama *</label>
            <div className="mt-1">
              <select
                {...register('agama', { required: 'Silahkan masukkan Agama.' })}
                name="agama"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value={''}>Silahkan Pilih</option>
                <option value={'1'}>Buddha</option>
                <option value={'2'}>Hindu</option>
                <option value={'3'}>Islam</option>
                <option value={'4'}>Katolik</option>
                <option value={'5'}>Protestan</option>
                <option value={'6'}>Tidak bisa disebutkan</option>
              </select>
              {errors.agama && <p className="mt-1 text-xs text-red-500">{errors.agama.message}</p>}
            </div>
          </div>
          <InputLabelled
            isError={errors.no_hp?.message}
            errorMessage={errors.no_hp?.message}
            validation={{ ...register('no_hp', { required: false }) }}
            name="no_hp"
            label="No. HP"
            type="text"
          />
          <InputLabelled
            isError={errors.nik}
            errorMessage={errors.nik?.message}
            validation={{ ...register('nik', { required: 'Silahkan Masukkan NIK' }) }}
            name="nik"
            label="NIK atau ID Identitas *"
            type="text"
            maxLength={16}
          />
          <div className="mt-5 sm:col-span-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">Upload Kartu Identitas (KTP/KK) *</label>
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
            ></Controller>
          </div>
          <InputLabelled
            validation={{ ...register('alamat', { required: 'Silahkan Masukkan Alamat' }) }}
            isError={errors.alamat}
            errorMessage={errors.alamat?.message}
            label="Alamat *"
            name="alamat"
            type="text"
          />
          <InputLabelled
            validation={{ ...register('no_akta_kelahiran') }}
            isError={errors.no_akta_kelahiran}
            errorMessage={errors.no_akta_kelahiran?.message}
            label="Nomer Akta Kelahiran"
            name="no_aktakelahiran"
            type="text"
          />
          <div className="mt-5 sm:col-span-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">Upload Akta Kelahiran</label>
            <Controller
              control={control}
              name={'file_name_akta_kelahiran'}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <UploadWrapper
                  allowedTypes={['pdf']}
                  handleUploadChange={(files: FileObject[]) => {
                    setValue('file_id_akta_kelahiran', files[0].id);
                    onChange(files[0].name);
                  }}
                >
                  {({ loading }) => (
                    <div
                      className={classNames(
                        'flex items-center justify-center space-x-2 rounded-md border-[1px] p-2',
                        errors.file_name_akta_kelahiran ? 'border-red-500' : ''
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
            isError={errors.status_hidup}
            errorMessage={errors.status_hidup?.message}
            validation={{ ...register('status_hidup', { required: 'Silahkan Pilih Status Hidup' }) }}
            label="Status Hidup *"
            defaultOption="Silahkan Pilih"
            firstOption="Hidup"
            secondOption="Wafat"
            formVerification="status_hidup"
          />
          <InputLabelled
            validation={{ ...register('npwp') }}
            isError={errors.npwp}
            errorMessage={errors.npwp?.message}
            label="Nomer NPWP"
            name="npwp"
            type="text"
          />
          <ButtonRows toggleModal={toggleModal} leftButton="Batal" rightButton="Simpan" />
        </form>
      </div>
    </div>
  );
}
