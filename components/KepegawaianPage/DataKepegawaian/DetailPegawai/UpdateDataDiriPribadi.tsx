import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { ChevronLeftIcon, UploadIcon } from '@heroicons/react/solid';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../action/CommonAction';
import { MasterAPI, UserAPI } from '../../../../constants/APIUrls';
import { GenderText, StatusMenikahText } from '../../../../constants/Resource';
import { SnackbarType } from '../../../../reducer/CommonReducer';
import { GetListBankRes } from '../../../../types/api/BankAPI';
import {
  GetUserProfileData,
  GetUserProfileReq,
  PostUserProfileReq,
  PostUserProfileRes,
} from '../../../../types/api/UserAPI';
import { Status, StatusMenikah } from '../../../../types/Common';
import { classNames } from '../../../../utils/Components';
import { callAPI } from '../../../../utils/Fetchers';
import { getQueryString } from '../../../../utils/URLUtils';
import { CircleProgress } from '../../../shared/CircleProgress';
import useCommonApi from '../../../shared/hooks/useCommonApi';
import AutoComplete from '../../../shared/Input/ComboBox';
import UploadWrapper, { FileObject } from '../../../shared/Input/UploadWrapper';
import Loader from '../../../shared/Loader/Loader';
import { LinkFile } from './DataDiriPribadi';

type FormType = Omit<PostUserProfileReq, 'uuid_ktp' | 'uuid_bpjs' | 'uuid_npwp'> & {
  uuid_ktp: string;
  uuid_bpjs: string;
  uuid_npwp: string;
  file_uuid_rek: string;
  file_name_rek: string;
};

export default function UpdateDataDiriPribadi() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const { pegawai_id } = getQueryString<{ pegawai_id: string }>();
  const { data, isValidating } = useCommonApi<GetUserProfileReq, GetUserProfileData>(
    UserAPI.GET_USER_PROFILE,
    { pegawai_id: Number(pegawai_id) },
    { method: 'GET' }
  );

  const { data: listBank } = useCommonApi<null, GetListBankRes[]>(MasterAPI.GET_BANK_LIST, null, { method: 'GET' });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<FormType>();

  React.useEffect(() => {
    if (!isValidating && data) {
      setValue('status_menikah', data?.status_menikah);
      setValue('jumlah_anak', data?.jumlah_anak);
      setValue('nik', data?.ktp);
      setValue('email', data?.email);
      setValue('alamat', data?.alamat);
      setValue('npwp', data?.npwp);
      setValue('bpjs', data?.bpjs);
      setValue('hp', data?.hp);
      setValue('uuid_bpjs', data?.uuid_bpjs?.[0]?.document_uuid);
      setValue('uuid_ktp', data?.uuid_ktp?.[0]?.document_uuid);
      setValue('uuid_npwp', data?.uuid_npwp?.[0]?.document_uuid);
      setValue('nama_rekening', data?.nama_rekening);
      setValue('nomor_rekening', data?.nomor_rekening?.replace(/\D/g, ''));
      setValue('file_name_rek', data?.uuid_rekening?.[0]?.document_name);
      setValue('file_uuid_rek', data?.uuid_rekening?.[0]?.document_uuid);
      setValue('bank_id', data?.bank_id);
    }
  }, [data]);

  if (isValidating) {
    return <Loader />;
  }

  const handleBack = () => {
    window.location.href = `/?pegawai_id=${pegawai_id}&tabName=Data%20Diri%20Pribadi`;
  };

  const submitHandler = async (formData: FormType) => {
    setLoading(true);

    const updateRes = await callAPI<PostUserProfileReq, PostUserProfileRes>(UserAPI.POST_USER_UPDATE_PROFILE, {
      nik: formData.nik,
      email: formData.email,
      alamat: formData.alamat,
      npwp: formData.npwp,
      bpjs: formData.bpjs,
      hp: formData.hp,
      pegawai_id: Number(pegawai_id),
      jumlah_anak: Number(formData.jumlah_anak),
      status_menikah: Number(formData.status_menikah),
      uuid_bpjs: [
        {
          document_name: 'BPJS',
          document_uuid: formData.uuid_bpjs,
        },
      ],
      uuid_ktp: [
        {
          document_name: 'KTP',
          document_uuid: formData.uuid_ktp,
        },
      ],
      uuid_npwp: [
        {
          document_name: 'NPWP',
          document_uuid: formData.uuid_npwp,
        },
      ],
      nomor_rekening: String(formData?.nomor_rekening).replace(/\D/g, ''),
      nama_rekening: formData?.nama_rekening?.toUpperCase(),
      bank_id: Number(formData?.bank_id),
      uuid_rekening: [
        {
          document_name: formData?.file_name_rek,
          document_uuid: formData?.file_uuid_rek,
        },
      ],
    });

    if (updateRes.status === 200 && updateRes.data?.status === Status.OK) {
      dispatch(setSnackbar({ show: true, type: SnackbarType.INFO, message: 'Berhasil mengubah data diri anda.' }));
      setTimeout(() => {
        handleBack();
      }, 500);
    } else {
      setLoading(false);
      dispatch(
        setSnackbar({
          show: true,
          type: SnackbarType.ERROR,
          message: 'Terjadi kesalahan saat mengubah data diri anda. Mohon dicoba lagi setelah beberapa saat.',
        })
      );
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg bg-white pb-6 shadow">
        <div className="my-3 inline-flex cursor-pointer items-center px-7 pl-4 pr-6 font-semibold" onClick={handleBack}>
          <ChevronLeftIcon className="mr-0.5 h-8" />
          <span className="tracking-wide text-gray-600">Kembali</span>
        </div>
        <div className="mt-5 mb-6 px-7 py-1">
          <h3 className="text-xl font-semibold tracking-wider text-gray-700">Data Diri Pribadi</h3>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
          <div className="px-7">
            <div className="mb-2 basis-[200px] text-sm font-medium tracking-wider text-black">Jenis Kelamin</div>
            <input
              value={data?.jenis_kelamin ? GenderText[data.jenis_kelamin] : ''}
              type="text"
              disabled
              className="shadow-s block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 disabled:bg-gray-200 sm:text-sm"
            />
          </div>
          <div className="px-7">
            <div className="mb-2 basis-[200px] text-sm font-medium tracking-wider text-black">Status Menikah</div>
            <Controller
              control={control}
              name="status_menikah"
              rules={{ required: false }}
              render={({ field: { onChange } }) => (
                <select
                  defaultValue={data?.status_menikah}
                  onChange={event => onChange(event.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  {Object.keys(StatusMenikahText)?.map((each, index) => {
                    return (
                      <option key={`options-${index}`} value={each}>
                        {StatusMenikahText[each as unknown as StatusMenikah]}
                      </option>
                    );
                  })}
                </select>
              )}
            />
          </div>
          <div className="px-7">
            <div className="mb-2 basis-[200px] text-sm font-medium tracking-wider text-black">Jumlah Anak</div>
            <div className="flex w-full flex-auto flex-col">
              <input
                {...register('jumlah_anak', { required: false })}
                defaultValue={data?.jumlah_anak}
                type="text"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              {errors.jumlah_anak && errors.jumlah_anak.type === 'required' && (
                <div className="flex items-center">
                  <ExclamationCircleIcon className="mr-1 h-4 w-4 text-red-500" />
                  <div className="text-sm text-red-500">Mohon isikan data jumlah anak</div>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="px-7">
              <div className="mb-2 basis-[200px] text-sm font-medium tracking-wider text-black">NIK</div>
              <div className="flex w-full flex-auto flex-col">
                <input
                  maxLength={16}
                  {...register('nik', { required: false })}
                  defaultValue={data?.ktp}
                  type="text"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                {errors.nik && errors.nik.type === 'required' && (
                  <div className="flex items-center">
                    <ExclamationCircleIcon className="mr-1 h-4 w-4 text-red-500" />
                    <div className="text-sm text-red-500">Mohon isikan data KTP</div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-5 px-7 sm:col-span-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">Dokumen KTP</label>
              {data && !isValidating && (
                <div className="mb-3 pl-2">
                  <LinkFile link={data?.uuid_ktp?.[0]?.document_uuid} value={data?.uuid_ktp?.[0].document_name} />
                </div>
              )}
              <Controller
                control={control}
                name={'uuid_ktp'}
                rules={{ required: false }}
                render={({ field: { onChange, value } }) => (
                  <UploadWrapper
                    allowedTypes={['pdf']}
                    handleUploadChange={(files: FileObject[]) => {
                      setValue('uuid_ktp', files[0].id);
                      onChange(files[0].name);
                    }}
                  >
                    {({ loading }) => (
                      <div
                        className={classNames(
                          'flex items-center justify-center space-x-2 rounded-md border-[1px] p-2',
                          errors.uuid_ktp ? 'border-red-500' : ''
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
          </div>
          <div className="px-7">
            <div className="mb-2 basis-[200px] text-sm font-medium tracking-wider text-black">Email</div>
            <div className="flex w-full flex-auto flex-col">
              <input
                {...register('email', { required: false })}
                defaultValue={data?.email}
                type="text"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              {errors.email && errors.email.type === 'required' && (
                <div className="flex items-center">
                  <ExclamationCircleIcon className="mr-1 h-4 w-4 text-red-500" />
                  <div className="text-sm text-red-500">Mohon isikan data email</div>
                </div>
              )}
            </div>
          </div>
          <div className="px-7">
            <div className="mb-2 basis-[200px] text-sm font-medium tracking-wider text-black">Alamat</div>
            <div className="flex w-full flex-auto flex-col">
              <input
                {...register('alamat', { required: false })}
                defaultValue={data?.alamat}
                type="text"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              {errors.alamat && errors.alamat.type === 'required' && (
                <div className="flex items-center">
                  <ExclamationCircleIcon className="mr-1 h-4 w-4 text-red-500" />
                  <div className="text-sm text-red-500">Mohon isikan data alamat</div>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="px-7">
              <div className="mb-2 basis-[200px] text-sm font-medium tracking-wider text-black">NPWP</div>
              <div className="flex w-full flex-auto flex-col">
                <input
                  {...register('npwp', { required: false })}
                  defaultValue={data?.npwp}
                  type="text"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                {errors.npwp && errors.npwp.type === 'required' && (
                  <div className="flex items-center">
                    <ExclamationCircleIcon className="mr-1 h-4 w-4 text-red-500" />
                    <div className="text-sm text-red-500">Mohon isikan data NPWP</div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-5 px-7 sm:col-span-6">
              <label className="mb-2 block text-sm font-medium text-black">Dokumen NPWP</label>
              {data && !isValidating && (
                <div className="mb-3 pl-2">
                  <LinkFile link={data?.uuid_npwp?.[0]?.document_uuid} value={data?.uuid_npwp?.[0].document_name} />
                </div>
              )}
              <Controller
                control={control}
                name={'uuid_npwp'}
                rules={{ required: false }}
                render={({ field: { onChange, value } }) => (
                  <UploadWrapper
                    allowedTypes={['pdf', 'jpeg', 'jpg', 'png']}
                    handleUploadChange={(files: FileObject[]) => {
                      setValue('uuid_npwp', files[0].id);
                      onChange(files[0].name);
                    }}
                  >
                    {({ loading }) => (
                      <div
                        className={classNames(
                          'flex items-center justify-center space-x-2 rounded-md border-[1px] p-2',
                          errors.uuid_npwp ? 'border-red-500' : ''
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
          </div>
          <div>
            <div className="px-7">
              <div className="mb-2 basis-[200px] text-sm font-medium tracking-wider text-black">BPJS</div>
              <div className="flex w-full flex-auto flex-col">
                <input
                  {...register('bpjs', { required: false })}
                  defaultValue={data?.bpjs}
                  type="text"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                {errors.bpjs && errors.bpjs.type === 'required' && (
                  <div className="flex items-center">
                    <ExclamationCircleIcon className="mr-1 h-4 w-4 text-red-500" />
                    <div className="text-sm text-red-500">Mohon isikan data BPJS</div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-5 px-7 sm:col-span-6">
              <label className="mb-2 block text-sm font-medium text-black">Dokumen BPJS</label>
              {data && !isValidating && (
                <div className="mb-3 pl-2">
                  <LinkFile link={data?.uuid_bpjs?.[0]?.document_uuid} value={data?.uuid_bpjs?.[0].document_name} />
                </div>
              )}
              <Controller
                control={control}
                name={'uuid_bpjs'}
                rules={{ required: false }}
                render={({ field: { onChange, value } }) => (
                  <UploadWrapper
                    allowedTypes={['pdf']}
                    handleUploadChange={(files: FileObject[]) => {
                      setValue('uuid_bpjs', files[0].id);
                      onChange(files[0].name);
                    }}
                  >
                    {({ loading }) => (
                      <div
                        className={classNames(
                          'flex items-center justify-center space-x-2 rounded-md border-[1px] p-2',
                          errors.uuid_bpjs ? 'border-red-500' : ''
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
          </div>
          <div className="px-7">
            <div className="mb-2 basis-[200px] text-sm font-medium tracking-wider text-black">Nomor HP</div>
            <div className="flex w-full flex-auto flex-col">
              <input
                {...register('hp', { required: false })}
                defaultValue={data?.hp}
                type="text"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              {errors.hp && errors.hp.type === 'required' && (
                <div className="flex items-center">
                  <ExclamationCircleIcon className="mr-1 h-4 w-4 text-red-500" />
                  <div className="text-sm text-red-500">Mohon isikan data nomor HP</div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-5 mb-6 px-7 py-1">
            <h3 className="text-xl font-semibold tracking-wider text-gray-700">Data Rekening</h3>
          </div>
          <div className="px-7">
            <div className="mb-2 basis-[200px] text-sm font-medium tracking-wider text-black">Nomor Rekening</div>
            <div className="flex w-full flex-auto flex-col">
              <input
                {...register('nomor_rekening', {
                  required: false,
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Please enter a number',
                  },
                })}
                type="text"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              {errors.nomor_rekening && errors.nomor_rekening.type === 'pattern' && (
                <div className="mt-1 flex items-center">
                  <ExclamationCircleIcon className="mr-1 h-4 w-4 text-red-500" />
                  <div className="text-sm text-red-500">Nomor Rekening tidak sesuai Format</div>
                </div>
              )}
            </div>
          </div>
          <div className="px-7">
            <div className="mb-2 basis-[200px] text-sm font-medium tracking-wider text-black">Atas Nama Rekening</div>
            <div className="flex w-full flex-auto flex-col">
              <input
                {...register('nama_rekening', {
                  required: false,
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: 'Hanya menerima Karakter',
                  },
                })}
                type="text"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              {errors.nama_rekening && errors.nama_rekening.type === 'pattern' && (
                <div className="mt-1 flex items-center">
                  <ExclamationCircleIcon className="mr-1 h-4 w-4 text-red-500" />
                  <div className="text-sm text-red-500">Atas Nama Rekening tidak sesuai Format</div>
                </div>
              )}
            </div>
          </div>
          <div className="px-7">
            <div className="mb-2 basis-[200px] text-sm font-medium tracking-wider text-black">Nama Bank</div>
            <div className="w-full">
              <Controller
                control={control}
                name="bank_id"
                rules={{ required: false }}
                render={({ field: { onChange } }) => {
                  return (
                    <>
                      <AutoComplete
                        onChange={value => onChange(value.value)}
                        label={''}
                        defaultValue={{ text: data?.bank_str || '', value: String(data?.bank_id) || '' }}
                        options={(listBank || []).map(each => ({
                          text: each.nama,
                          value: String(each.id),
                        }))}
                      />
                    </>
                  );
                }}
              />
            </div>
          </div>
          <div className="mt-5 px-7 sm:col-span-6">
            <label className="mb-2 block text-sm font-medium text-black">Dokumen Bank/Rekening</label>
            {data && !isValidating && (
              <div className="mb-3 pl-2">
                <LinkFile
                  link={data?.uuid_rekening?.[0]?.document_uuid}
                  value={data?.uuid_rekening?.[0].document_name}
                />
              </div>
            )}
            <Controller
              control={control}
              name={'file_uuid_rek'}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <UploadWrapper
                  allowedTypes={['pdf']}
                  handleUploadChange={(files: FileObject[]) => {
                    setValue('file_uuid_rek', files[0].id);
                    onChange(files[0].name);
                  }}
                >
                  {({ loading }) => (
                    <div
                      className={classNames(
                        'flex items-center justify-center space-x-2 rounded-md border-[1px] p-2',
                        errors.file_uuid_rek ? 'border-red-500' : ''
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

          <div className="flex flex-auto flex-col items-end px-7">
            <div className="flex">
              <a
                href="/pegawai/biodata"
                className="mr-3 inline-flex items-center rounded border border-transparent bg-gray-400 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-gray-500 disabled:bg-gray-200 disabled:text-gray-200"
              >
                Batal
              </a>
              <button
                disabled={loading}
                type="submit"
                className="flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200"
              >
                {loading ? <CircleProgress /> : null}
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
