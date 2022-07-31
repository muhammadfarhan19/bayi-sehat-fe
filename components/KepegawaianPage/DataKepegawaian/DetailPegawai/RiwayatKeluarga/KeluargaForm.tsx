import { UploadIcon, XIcon } from '@heroicons/react/outline';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { RiwayatKeluargaAPI } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import { PostListKeluargaReq, PostListKeluargaRes } from '../../../../../types/api/RiwayatKeluargaAPI';
import { Status } from '../../../../../types/Common';
import { classNames } from '../../../../../utils/Components';
import { callAPI } from '../../../../../utils/Fetchers';
import { CircleProgress } from '../../../../shared/CircleProgress';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import UploadWrapper, { FileObject } from '../../../../shared/Input/UploadWrapper';

interface UploadFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedId?: number;
  onSuccess: () => void;
}
interface FormState {
  pegawai_id: number;
  nama: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  agama: string;
  hp: string;
  nik: string;
  file_id_nik: string;
  file_name_nik: string;
  alamat: string;
  nomor_akta_kelahiran: string;
  file_id_akta_kelahiran: string;
  file_name_akta_kelahiran: string;
  status_hidup: string;
  nomor_npwp: string;
  status_pasangan: string;
  status_pns: string;
  tanggal_menikah: string;
  nomor_akta_menikah: string;
  file_id_akta_menikah: string;
  file_name_akta_menikah: string;
  tanggal_meninggal: string;
  nomor_akta_meninggal: string;
  file_id_akta_meninggal: string;
  file_name_akta_meninggal: string;
  tanggal_cerai: string;
  nomor_akta_cerai: string;
  file_id_akta_cerai: string;
  file_name_akta_cerai: string;
  nomor_kartu_suami_istri: string;
  file_id_kartu_suami_istri: string;
  file_name_kartu_suami_istri: string;
  status_pernikahan: string;
}

export default function KeluargaForm(props: UploadFormProps) {
  const { open, setOpen, onSuccess } = props;
  const personalPegawaiData = usePersonalData();
  const dispatch = useDispatch();
  const toggleModal = () => {
    setOpen(!open);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<FormState>();

  React.useEffect(() => {
    const isCerai = getValues('tanggal_cerai');
    const isMeninggal = getValues('tanggal_meninggal');
    // logic pada field status pernikahan:
    // - Jika tanggal meninggal dan tanggal cerai kosong maka = Menikah
    // - Jika tanggal meninggal di isi dan tanggal cerai kosong maka =  Cerai Meninggal
    // - Jika tanggal meninggal kosong dan tanggal cerai di isi = maka Cerai Hidup
    // - Jika tanggal meninggal di isi dan tanggal cerai DI ISI maka =  Cerai Meninggal
    if (isMeninggal.length === 0 && isCerai.length === 0) {
      setValue('status_pernikahan', 'Menikah');
      // setMarriageStatus('1');
    } else if (isMeninggal.length >= 2 && isCerai.length === 0) {
      setValue('status_pernikahan', 'Cerai - Meninggal');
      // setMarriageStatus('2');
    } else if (isMeninggal.length === 0 && isCerai.length >= 2) {
      setValue('status_pernikahan', 'Cerai - Hidup');
      // setMarriageStatus('3');
    } else if (isMeninggal.length >= 2 && isCerai.length >= 2) {
      setValue('status_pernikahan', 'Cerai - Meninggal');
      // setMarriageStatus('4');
    } else {
      setValue('status_pernikahan', 'Menikah');
      // setMarriageStatus('1');
    }
  }, [watch('tanggal_cerai'), watch('tanggal_menikah'), watch('tanggal_meninggal')]);

  const submitHandler = async (formData: FormState) => {
    const resSubmit = await callAPI<PostListKeluargaReq, PostListKeluargaRes>(
      RiwayatKeluargaAPI.POST_RIWAYAT_KELUARGA_INSERT,
      {
        pegawai_id: personalPegawaiData?.pegawai_id,
        nama: formData?.nama,
        tempat_lahir: formData?.tempat_lahir,
        tanggal_lahir: formData?.tanggal_lahir,
        jenis_kelamin: Number(formData?.jenis_kelamin),
        agama: Number(formData?.agama),
        hp: formData?.hp,
        nik: formData?.nik,
        alamat: personalPegawaiData?.alamat,
        nomor_akta_kelahiran: formData?.nomor_akta_kelahiran,
        status_hidup: Number(formData?.status_hidup),
        nomor_npwp: formData?.nomor_npwp,
        status_pasangan: Number(formData?.status_pasangan),
        status_pernikahan: formData?.status_pernikahan,
        status_pns: Number(formData?.status_pns),
        tanggal_menikah: formData?.tanggal_menikah,
        nomor_akta_menikah: formData?.nomor_akta_menikah,
        tanggal_meninggal: formData?.tanggal_meninggal === '' ? null : formData?.tanggal_meninggal,
        nomor_akta_meninggal: formData?.nomor_akta_meninggal,
        tanggal_cerai: formData?.tanggal_cerai === '' ? null : formData?.tanggal_cerai,
        nomor_akta_cerai: formData?.nomor_akta_cerai,
        nomor_kartu_suami_istri: formData?.nomor_kartu_suami_istri,
        files: [
          {
            document_uuid: formData?.file_id_nik,
            document_name: formData?.file_name_nik,
          },
          {
            document_uuid: formData?.file_id_akta_menikah,
            document_name: formData?.file_name_akta_menikah,
          },
          {
            document_name: formData?.file_name_akta_kelahiran,
            document_uuid: formData?.file_id_akta_kelahiran,
          },
          {
            document_name: formData?.file_name_akta_cerai,
            document_uuid: formData?.file_id_akta_cerai,
          },
          {
            document_name: formData?.file_name_kartu_suami_istri,
            document_uuid: formData?.file_id_kartu_suami_istri,
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
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mt-5 sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">Nama *</label>
            <div className="mt-1">
              <input
                {...register('nama', { required: 'Silahkan masukkan nama pasangan.' })}
                className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                name="nama"
                type="text"
              />
              {errors.nama && <p className="mt-1 text-xs text-red-500">{errors.nama.message}</p>}
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
                {...register('tanggal_lahir', { required: 'Silahkan masukkan tanggal lahir.' })}
                className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                name="tanggal_lahir"
                type="date"
              />
              {errors.tanggal_lahir && <p className="mt-1 text-xs text-red-500">{errors.tanggal_lahir.message}</p>}
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

          <div className="mt-5 sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">No. Hp</label>
            <div className="mt-1">
              <input
                {...register('hp')}
                className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                name="hp"
                type="text"
              />
              {errors.hp && <p className="mt-1 text-xs text-red-500">{errors.hp.message}</p>}
            </div>
          </div>

          <div className="mt-5 sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">NIK/ID Identitas *</label>
            <div className="mt-1">
              <input
                {...register('nik', { required: 'Silahkan masukkan Nomer NIK.' })}
                className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                name="nik"
                type="text"
              />
              {errors.nik && <p className="mt-1 text-xs text-red-500">{errors.nik.message}</p>}
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">Upload Kartu Identitas (KTP/KK) *</label>
            <Controller
              control={control}
              name={'file_name_nik'}
              rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
              render={({ field: { onChange, value } }) => (
                <UploadWrapper
                  allowedTypes={['pdf']}
                  handleUploadChange={(files: FileObject[]) => {
                    setValue('file_id_nik', files[0].id);
                    onChange(files[0].name);
                  }}
                >
                  {({ loading }) => (
                    <div
                      className={classNames(
                        'flex items-center justify-center space-x-2 rounded-md border-[1px] p-2',
                        errors.file_name_nik ? 'border-red-500' : ''
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
              <input
                {...register('alamat', { required: 'Silahkan masukkan alamat.' })}
                className="block w-full rounded-md border-gray-300 pb-10 shadow-sm "
                name="alamat"
                type="text"
                value={personalPegawaiData?.alamat}
              />
              {errors.alamat && <p className="mt-1 text-xs text-red-500">{errors.alamat.message}</p>}
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">Nomer Akta Kelahiran</label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                {...register('nomor_akta_kelahiran')}
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
          <div className="mt-5 sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">Status Hidup *</label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <select
                {...register('status_hidup', { required: 'Silahkan Pilih Status Hidup' })}
                name="status_hidup"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value={''}>Silahkan Pilih</option>
                <option value={'1'}>Hidup</option>
                <option value={'2'}>Wafat</option>
              </select>
              {errors.status_hidup && <p className="mt-1 text-xs text-red-500">{errors.status_hidup.message}</p>}
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">Nomer NPWP</label>
            <div className="mt-1">
              <input
                {...register('nomor_npwp')}
                className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                name="nomor_npwp"
                type="text"
              />
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">Status Pasangan *</label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <select
                {...register('status_pasangan', { required: 'Silahkan Pilih Status Pasangan' })}
                name="status_pasangan"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value={''}>Silahkan Pilih</option>
                <option value={'1'}>Suami</option>
                <option value={'2'}>Istri</option>
              </select>
              {errors.status_pasangan && <p className="mt-1 text-xs text-red-500">{errors.status_pasangan.message}</p>}
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">Status PNS *</label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <select
                {...register('status_pns', { required: 'Silahkan Pilih Status PNS' })}
                name="status_pns"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value={''}>Silahkan Pilih</option>
                <option value={'1'}>PNS</option>
                <option value={'2'}>Non-PNS</option>
              </select>
              {errors.status_pns && <p className="mt-1 text-xs text-red-500">{errors.status_pns.message}</p>}
            </div>
          </div>
          {/* <div className="mt-5 sm:col-span-6">
            <label  className="block text-sm font-medium text-gray-700">
              Nama *
            </label>
            <div className="mt-1">
              <input
                className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                name="no_npwp"
                type="text"
              />
            </div>
          </div> */}
          <div className="flex flex-row justify-between space-x-3">
            <div className="mt-5 flex-1 sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700">Tanggal Menikah *</label>
              <div className="mt-1">
                <input
                  {...register('tanggal_menikah', { required: 'Silahkan Pilih Tanggal Menikah' })}
                  className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  name="tanggal_menikah"
                  type="date"
                />
                {errors.tanggal_menikah && (
                  <p className="mt-1 text-xs text-red-500">{errors.tanggal_menikah.message}</p>
                )}
              </div>
            </div>
            <div className="mt-5 flex-1 sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700">No Akta Menikah *</label>
              <div className="mt-1">
                <input
                  {...register('nomor_akta_menikah', { required: 'Silahkan Pilih Tanggal Menikah' })}
                  className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  name="nomor_akta_menikah"
                  type="text"
                />
                {errors.nomor_akta_menikah && (
                  <p className="mt-1 text-xs text-red-500">{errors.nomor_akta_menikah.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">Upload Akta Menikah *</label>
            <Controller
              control={control}
              name={'file_name_akta_menikah'}
              rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
              render={({ field: { onChange, value } }) => (
                <UploadWrapper
                  allowedTypes={['pdf']}
                  handleUploadChange={(files: FileObject[]) => {
                    setValue('file_id_akta_menikah', files[0].id);
                    onChange(files[0].name);
                  }}
                >
                  {({ loading }) => (
                    <div
                      className={classNames(
                        'flex items-center justify-center space-x-2 rounded-md border-[1px] p-2',
                        errors.file_name_akta_menikah ? 'border-red-500' : ''
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
              <label className="block text-sm font-medium text-gray-700">Tanggal Meninggal</label>
              <div className="mt-1">
                <input
                  {...register('tanggal_meninggal')}
                  className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  name="tanggal_meninggal"
                  type="date"
                />
              </div>
            </div>
            <div className="mt-5 flex-1 sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700">No Akta Meninggal</label>
              <div className="mt-1">
                <input
                  {...register('nomor_akta_meninggal')}
                  className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  name="nomor_akta_meninggal"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">Upload Akta Meninggal</label>
            <Controller
              control={control}
              name={'file_name_akta_meninggal'}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <UploadWrapper
                  allowedTypes={['pdf']}
                  handleUploadChange={(files: FileObject[]) => {
                    setValue('file_id_akta_meninggal', files[0].id);
                    onChange(files[0].name);
                  }}
                >
                  {({ loading }) => (
                    <div
                      className={classNames(
                        'flex items-center justify-center space-x-2 rounded-md border-[1px] p-2',
                        errors.file_name_akta_meninggal ? 'border-red-500' : ''
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
              <label className="block text-sm font-medium text-gray-700">Tanggal Cerai</label>
              <div className="mt-1">
                <input
                  {...register('tanggal_cerai')}
                  className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  name="tanggal_cerai"
                  type="date"
                />
              </div>
            </div>
            <div className="mt-5 flex-1 sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700">No Akta Cerai</label>
              <div className="mt-1">
                <input
                  {...register('nomor_akta_cerai')}
                  className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  name="nomor_akta_cerai"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">Upload Akta Cerai</label>
            <Controller
              control={control}
              name={'file_name_akta_cerai'}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <UploadWrapper
                  allowedTypes={['pdf']}
                  handleUploadChange={(files: FileObject[]) => {
                    setValue('file_id_akta_cerai', files[0].id);
                    onChange(files[0].name);
                  }}
                >
                  {({ loading }) => (
                    <div
                      className={classNames(
                        'flex items-center justify-center space-x-2 rounded-md border-[1px] p-2',
                        errors.file_name_akta_cerai ? 'border-red-500' : ''
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
            <label className="block text-sm font-medium text-gray-700">Nomer Kartu Suami/Istri</label>
            <div className="mt-1">
              <input
                {...register('nomor_kartu_suami_istri')}
                className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                name="nomor_kartu_suami_istri"
                type="text"
              />
            </div>
          </div>
          <div className="mt-5 sm:col-span-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">Upload Kartu Suami Istri</label>
            <Controller
              control={control}
              name={'file_name_kartu_suami_istri'}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <UploadWrapper
                  allowedTypes={['pdf']}
                  handleUploadChange={(files: FileObject[]) => {
                    setValue('file_id_kartu_suami_istri', files[0].id);
                    onChange(files[0].name);
                  }}
                >
                  {({ loading }) => (
                    <div
                      className={classNames(
                        'flex items-center justify-center space-x-2 rounded-md border-[1px] p-2',
                        errors.file_name_kartu_suami_istri ? 'border-red-500' : ''
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
                {...register('status_pernikahan')}
                disabled={true}
                className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                name="status_pernikahan"
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
