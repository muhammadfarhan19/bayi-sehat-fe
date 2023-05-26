import { ChevronLeftIcon, UploadIcon } from '@heroicons/react/outline';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { JabatanAPI, KepegawaianAPI, MasterAPI, UnitKerjaAPI } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import { GetJabatanReq, JabatanData } from '../../../../../types/api/JabatanAPI';
import { UpdatePegawaiInfoReq, UpdatePegawaiInfoRes } from '../../../../../types/api/KepegawaianAPI';
import { GetMasterJenisGol } from '../../../../../types/api/MasterAPI';
import { GetUnitKerjaData } from '../../../../../types/api/UnitKerjaAPI';
import { Status } from '../../../../../types/Common';
import { classNames } from '../../../../../utils/Components';
import { callAPI } from '../../../../../utils/Fetchers';
import { getQueryString } from '../../../../../utils/URLUtils';
import { CircleProgress } from '../../../../shared/CircleProgress';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import AutoComplete from '../../../../shared/Input/ComboBox';
import UploadWrapper, { FileObject } from '../../../../shared/Input/UploadWrapper';
import Loader from '../../../../shared/Loader/Loader';

const statusPegawai = [
  { id: '3', title: 'CPNS', type: '3-status-pegawai' },
  { id: '1', title: 'PNS', type: '1-status-pegawai' },
  { id: '2', title: 'PPNPN', type: '2-status-pegawai' },
];

interface FormState {
  nip: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  status_cpns: number | string;
  tmt_cpns: string;
  tmt_golongan: string;
  golongan_id: number;
  karpeg: string;
  jabatan_id: number;
  jabatan: string;
  unit_kerja_id: number;
  file_id: string;
  file_name: string;
  // badgeNumber: string;
  tugasBelajar: string;
}

function UpdateDataPegawai() {
  const dispatch = useDispatch();
  const { pegawai_id, type } = getQueryString();

  const debounce = React.useRef<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [submitLoading, setSubmitLoading] = React.useState<boolean>(false);
  const [queryJabatan, setQueryJabatan] = React.useState('');
  const pegawaiData = usePersonalData();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormState>();

  const { data: unitKerjaList } = useCommonApi<null, GetUnitKerjaData[]>(
    UnitKerjaAPI.GET_UNIT_KERJA_LIST_DIREKTORAT,
    null,
    { method: 'GET' }
  );

  const { data: daftarJabatan } = useCommonApi<GetJabatanReq, JabatanData>(
    JabatanAPI.GET_JABATAN,
    { page: 1, per_page: 20, jabatan: queryJabatan },
    { method: 'GET' }
  );

  const { data: getJabatan } = useCommonApi<GetJabatanReq, JabatanData>(
    JabatanAPI.GET_JABATAN,
    { page: 1, per_page: 20, jabatan: pegawaiData?.jabatan },
    { method: 'GET' }
  );

  const { data: getGolongan } = useCommonApi<null, GetMasterJenisGol[]>(MasterAPI.GET_MASTER_JENIS_GOLONGAN, null, {
    method: 'GET',
  });

  const submitHandler = async (formData: FormState) => {
    setSubmitLoading(true);
    const resSubmit = await callAPI<UpdatePegawaiInfoReq, UpdatePegawaiInfoRes>(
      KepegawaianAPI.UPDATE_PEGAWAI_INFO,
      {
        pegawai_id: Number(pegawaiData?.pegawai_id),
        user_id: Number(pegawaiData?.user_id),
        golongan_id: Number(formData?.golongan_id),
        jabatan_id: Number(formData?.jabatan_id),
        karpeg: formData?.karpeg,
        karpeg_file: [
          {
            document_uuid: formData?.file_id,
            document_name: formData?.file_name,
          },
        ],
        masa_kerja_kepangkatan: String(pegawaiData?.masa_kerja_kepangkatan),
        status_cpns: Number(formData?.status_cpns),
        status_kepegawaian: Number(pegawaiData?.status_kepegawaian),
        unit_kerja_id: Number(formData?.unit_kerja_id),
        nip: formData?.nip,
        tanggal_lahir: formData?.tanggal_lahir,
        tempat_lahir: formData?.tempat_lahir,
        tmt_cpns: formData?.tmt_cpns,
        tmt_golongan: formData?.tmt_golongan,
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
      setSubmitLoading(false);
      setTimeout(() => {
        window.location.href = `/kepegawaian/data-pegawai?pegawai_id=${pegawai_id}&type=${type}`;
      }, 1000);
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal menyimpan data. Mohon coba beberapa saat lagi.',
          type: SnackbarType.ERROR,
        })
      );
      setSubmitLoading(false);
    }
  };

  React.useEffect(() => {
    if (Object.keys(pegawaiData || {}).length > 0 && typeof getJabatan !== 'undefined') {
      setValue('nip', String(pegawaiData?.nip));
      setValue('tempat_lahir', String(pegawaiData?.tempat_lahir));
      setValue('tanggal_lahir', String(pegawaiData?.tanggal_lahir));
      setValue('tmt_cpns', String(pegawaiData?.tmt_cpns));
      setValue('status_cpns', String(pegawaiData?.status_cpns));
      setValue('golongan_id', Number(pegawaiData?.golongan_id));
      setValue('tmt_golongan', String(pegawaiData?.tmt_golongan));
      setValue('karpeg', String(pegawaiData?.karpeg));

      if (getJabatan?.list?.length) {
        setValue('jabatan_id', Number(getJabatan?.list?.[0]?.jabatan_id));
      }

      if (pegawaiData?.karpeg_file?.length) {
        setValue('file_id', String(pegawaiData?.karpeg_file?.[0]?.document_uuid));
        setValue('file_name', String(pegawaiData?.karpeg_file?.[0]?.document_name));
      }

      setIsLoading(false);
    }
  }, [pegawaiData]);

  if (isLoading) {
    return (
      <div className="relative h-[150px] w-full divide-y divide-gray-200">
        <Loader />
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white shadow">
      <a
        href={`/kepegawaian/data-pegawai?pegawai_id=${pegawai_id}&type=${type}`}
        className="flex flex-row items-center gap-x-2 py-6 px-6"
      >
        <ChevronLeftIcon className="h-5 w-5" />
        <div>Kembali</div>
      </a>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="px-6 pb-6">
          <div className="flex flex-col">
            <p className="text-[24px] font-medium text-gray-900">Perbaharui Data Diri </p>
          </div>

          <div className="mt-[32px] w-full">
            <div className="mt-5 sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700">Unit Kerja</label>
              <div className="pt-1 sm:col-span-2 sm:mt-0">
                <select
                  // {...register('unit_kerja_id', { required: 'Silahkan masukan unit kerja.' })}
                  {...register('unit_kerja_id', { required: false })}
                  name="unit_kerja_id"
                  className="w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm"
                >
                  <option value="">Silahkan Pilih</option>
                  {(unitKerjaList || []).map((item, index) => (
                    <option
                      key={`options-${index}`}
                      value={item?.unit_kerja_id}
                      selected={Number(item?.unit_kerja_id) === pegawaiData?.unit_kerja_id}
                    >
                      {item?.name}
                    </option>
                  ))}
                </select>
                {errors.unit_kerja_id && <p className="mt-1 text-xs text-red-500">{errors.unit_kerja_id.message}</p>}
              </div>
            </div>

            <div className="mt-5 sm:col-span-6">
              <div className="mt-[27px]">
                <label htmlFor="nip" className="block text-sm font-medium text-gray-700">
                  NIP
                </label>
                <div className="pt-1">
                  <input
                    // {...register('nip', { required: 'Silahkan masukan nip.' })}
                    {...register('nip', { required: false })}
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="nip"
                    type="text"
                  />
                  {errors.nip && <p className="mt-1 text-xs text-red-500">{errors.nip.message}</p>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6">
              <div className="mt-5">
                <label htmlFor="tempat_lahir" className="block text-sm font-medium text-gray-700">
                  Tempat Lahir
                </label>
                <div className="pt-1">
                  <input
                    // {...register('tempat_lahir', { required: 'Silahkan masukan tempat lahir.' })}
                    {...register('tempat_lahir', { required: false })}
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="tempat_lahir"
                    type="text"
                  />
                  {errors.tempat_lahir && <p className="mt-1 text-xs text-red-500">{errors.tempat_lahir.message}</p>}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="tanggal_lahir" className="block text-sm font-medium text-gray-700">
                  Tanggal Lahir
                </label>
                <div className="pt-1">
                  <input
                    // {...register('tanggal_lahir', { required: 'Silahkan masukan tanggal lahir.' })}
                    {...register('tanggal_lahir', { required: false })}
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="tanggal_lahir"
                    type="date"
                  />
                  {errors.tanggal_lahir && <p className="mt-1 text-xs text-red-500">{errors.tanggal_lahir.message}</p>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6">
              <div className="mt-5">
                <label htmlFor="tmt_cpns" className="block text-sm font-medium text-gray-700">
                  TMT CPNS
                </label>
                <div className="pt-1">
                  <input
                    // {...register('tmt_cpns', { required: 'Silahkan masukan tmt cpns.' })}
                    {...register('tmt_cpns', { required: false })}
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="tmt_cpns"
                    type="date"
                  />
                  {errors.tmt_cpns && <p className="mt-1 text-xs text-red-500">{errors.tmt_cpns.message}</p>}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="status_cpns" className="block text-sm font-medium text-gray-700">
                  Status Pegawai
                </label>
                <fieldset className="mt-4">
                  <div className="space-y-4">
                    {statusPegawai.map(each => (
                      <div key={each.type} className="flex items-center">
                        <input
                          // {...register('status_cpns', { required: 'Silahkan masukan status pegawai.' })}
                          {...register('status_cpns', { required: false })}
                          id={each.type}
                          value={each.id}
                          name="status_cpns"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={each.type} className="ml-3 block text-sm font-medium text-gray-700">
                          {each.title}
                        </label>
                      </div>
                    ))}
                    {errors.status_cpns && <p className="mt-1 text-xs text-red-500">{errors.status_cpns.message}</p>}
                  </div>
                </fieldset>
              </div>
            </div>

            <div className="mt-5">
              <div className="pt-1 sm:col-span-2 sm:mt-0">
                <Controller
                  control={control}
                  name="jabatan_id"
                  rules={{ required: false }}
                  // rules={{ required: 'Silahakan masukan jabatan' }}
                  render={({ field: { onChange } }) => (
                    <AutoComplete
                      onChange={value => onChange(value.value)}
                      label={'Jabatan'}
                      defaultValue={{
                        text: String(getJabatan?.list?.[0]?.name) || '',
                        value: String(getJabatan?.list?.[0]?.jabatan_id) || '',
                      }}
                      onQueryChange={queryText => {
                        if (debounce.current) {
                          clearTimeout(debounce.current);
                        }
                        debounce.current = window.setTimeout(() => {
                          setQueryJabatan(queryText);
                        }, 500);
                      }}
                      options={(daftarJabatan?.list || []).map(each => ({
                        text: each.name,
                        value: each?.name,
                      }))}
                    />
                  )}
                />
                {errors.jabatan_id && <p className="mt-1 text-xs text-red-500">{errors.jabatan_id.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6">
              <div className="mt-5">
                <Controller
                  control={control}
                  name="golongan_id"
                  // rules={{ required: 'Mohon input data golongan.' }}
                  rules={{ required: false }}
                  render={({ field: { onChange } }) => (
                    <AutoComplete
                      defaultValue={{
                        text: pegawaiData?.golongan || '',
                        value: String(pegawaiData?.golongan_id) || '',
                      }}
                      onChange={value => onChange(value.value)}
                      label={'Golongan'}
                      placeholder={'Pilih golongan'}
                      options={(getGolongan || []).map((each: { golongan: any; pangkat: any; golongan_id: any }) => ({
                        text: `${each?.golongan}, ${each?.pangkat}`,
                        value: String(each?.golongan_id),
                      }))}
                    />
                  )}
                />
                {errors.golongan_id && <p className="mt-1 text-xs text-red-500">{errors.golongan_id.message}</p>}
              </div>

              <div className="mt-5">
                <label htmlFor="tmt_golongan" className="block text-sm font-medium text-gray-700">
                  TMT Golongan
                </label>
                <div className="pt-1">
                  <input
                    // {...register('tmt_golongan', { required: 'Silahkan masukan tmt golongan.' })}
                    {...register('tmt_golongan', { required: false })}
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="tmt_golongan"
                    type="date"
                  />
                  {errors.tmt_golongan && <p className="mt-1 text-xs text-red-500">{errors.tmt_golongan.message}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="karpeg" className="block text-sm font-medium text-gray-700">
              Karpeg
            </label>
            <div className="pt-1">
              <input
                // {...register('karpeg', { required: 'Silahkan masukan karpeg.' })}
                {...register('karpeg', { required: false })}
                className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                name="karpeg"
                type="text"
              />
              {errors.karpeg && <p className="mt-1 text-xs text-red-500">{errors.karpeg.message}</p>}
            </div>
          </div>

          <div className="mt-5 sm:col-span-6">
            <Controller
              control={control}
              name={'file_name'}
              // rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
              rules={{ required: false }}
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
                        'flex items-center justify-between border-[1px] p-3',
                        errors.file_name ? 'border-red-500' : ''
                      )}
                    >
                      <div>
                        <div className="text-sm text-gray-600">{value || 'Berkas Karpeg'}</div>
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
            {errors.file_name && <p className="mt-1 text-xs text-red-500">{errors.file_name.message}</p>}
          </div>

          {/* <div className="mt-5">
            <label htmlFor="badgeNumber" className="block text-sm font-medium text-gray-700">
              Badge Number
            </label>
            <div className="pt-1">
              <input
                {...register('badgeNumber', { required: false })}
                className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                name="badgeNumber"
                type="text"
              />
              {errors.badgeNumber && <p className="mt-1 text-xs text-red-500">{errors.badgeNumber.message}</p>}
            </div>
          </div> */}

          <div className="mt-5">
            <label htmlFor="tugasBelajar" className="block text-sm font-medium text-gray-700">
              Tugas Belajar
            </label>
            <div className="pt-1">
              <input
                {...register('tugasBelajar', { required: false })}
                className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                name="tugasBelajar"
                type="text"
              />
              {errors.tugasBelajar && <p className="mt-1 text-xs text-red-500">{errors.tugasBelajar.message}</p>}
            </div>
          </div>

          <div className="my-[32px] h-[1px] w-full bg-gray-200"></div>

          <div className="mt-[3rem] flex w-full">
            <div className="ml-auto flex flex-row gap-x-[12px]">
              <button
                type="button"
                className="rounded border border-transparent bg-red-600 p-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-500 disabled:text-gray-200"
                onClick={() =>
                  (window.location.href = `/kepegawaian/data-pegawai?pegawai_id=${pegawai_id}&type=${type}`)
                }
              >
                Batal
              </button>
              <button
                disabled={submitLoading}
                type="submit"
                className="flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200"
              >
                {submitLoading ? <CircleProgress /> : null}
                Simpan
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateDataPegawai;
