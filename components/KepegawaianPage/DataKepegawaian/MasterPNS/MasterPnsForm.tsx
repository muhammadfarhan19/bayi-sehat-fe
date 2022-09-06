import { ChevronLeftIcon } from '@heroicons/react/outline';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../action/CommonAction';
import { JabatanAPI, KepegawaianAPI, MasterAPI, UnitKerjaAPI } from '../../../../constants/APIUrls';
import { SnackbarType } from '../../../../reducer/CommonReducer';
import { GetJabatanReq, JabatanData } from '../../../../types/api/JabatanAPI';
import { PostPegawaiInsertReq, PostPegawaiInsertRes } from '../../../../types/api/KepegawaianAPI';
import { GetMasterJenisGol } from '../../../../types/api/MasterAPI';
import { GetUnitKerjaData } from '../../../../types/api/UnitKerjaAPI';
import { Status } from '../../../../types/Common';
import { callAPI } from '../../../../utils/Fetchers';
import useCommonApi from '../../../shared/hooks/useCommonApi';
import AutoComplete from '../../../shared/Input/ComboBox';
import Loader from '../../../shared/Loader/Loader';

const statusPegawai = [
  { id: '3', title: 'CPNS', type: '3-status-pegawai' },
  { id: '1', title: 'PNS', type: '1-status-pegawai' },
  { id: '2', title: 'PPNPN', type: '2-status-pegawai' },
];

const statusAktif = [
  { id: '1', title: 'Aktif' },
  { id: '0', title: 'Tidak' },
];

const statusNikah = [
  { id: '1', title: 'Belum Kawin' },
  { id: '2', title: 'Kawin' },
  { id: '3', title: 'Cerai Mati' },
  { id: '4', title: 'Cerai Hidup' },
];

interface FormState {
  nip: string;
  nama: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: number;
  status_menikah: number;
  ktp: string;
  email: string;
  alamat: string;
  npwp: string;
  bpjs: string;
  status_cpns: number;
  status_kepegawaian: number;
  tmt_cpns: string;
  tmt_golongan: string;
  golongan_id: number;
  karpeg: string;
  jabatan_id: number;
  unit_kerja_id: number;
  jumlah_anak: number;
  agama: string;
}

function MasterPnsForm() {
  const dispatch = useDispatch();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>();
  const [golongan, setGolongan] = React.useState<React.SetStateAction<any>>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const { data: unitKerjaList } = useCommonApi<null, GetUnitKerjaData[]>(
    UnitKerjaAPI.GET_UNIT_KERJA_LIST_DIREKTORAT,
    null,
    { method: 'GET' }
  );

  const debounce = React.useRef<number>(0);

  const [queryJabatan, setQueryJabatan] = React.useState('');

  const { data: daftarJabatan } = useCommonApi<GetJabatanReq, JabatanData>(
    JabatanAPI.GET_JABATAN,
    { page: 1, per_page: 20, jabatan: queryJabatan },
    { method: 'GET' }
  );

  React.useLayoutEffect(() => {
    dataGolongan();
  }, []);

  const dataGolongan = async () => {
    setIsLoading(true);
    await callAPI<null, GetMasterJenisGol>(MasterAPI.GET_MASTER_JENIS_GOLONGAN, null, { method: 'GET' })
      .then(res => {
        res.data;
        setGolongan(res?.data);
      })
      .finally(() => setIsLoading(false));
  };

  const submitHandler = async (formData: FormState) => {
    console.log(formData);

    const resSubmit = await callAPI<PostPegawaiInsertReq, PostPegawaiInsertRes>(
      KepegawaianAPI.POST_PEGAWAI_INSERT,
      {
        nip: formData.nip,
        nama: formData.nama,
        tempat_lahir: formData.tempat_lahir,
        tanggal_lahir: formData.tanggal_lahir,
        jenis_kelamin: Number(formData.jenis_kelamin),
        status_menikah: Number(formData.status_menikah),
        ktp: formData.ktp,
        email: formData.email,
        alamat: formData.alamat,
        npwp: formData.npwp,
        bpjs: formData.bpjs,
        status_cpns: Number(formData.status_cpns),
        status_kepegawaian: Number(formData.status_kepegawaian),
        tmt_cpns: formData.tmt_cpns,
        tmt_golongan: formData.tmt_golongan,
        golongan_id: Number(formData.golongan_id),
        karpeg: formData.karpeg,
        jabatan_id: Number(formData.jabatan_id),
        unit_kerja_id: Number(formData.unit_kerja_id),
        jumlah_anak: Number(formData.jumlah_anak),
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
      setTimeout(() => {
        window.location.href = '/kepegawaian/data-pegawai';
      }, 1000);
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

  if (isLoading) {
    <div className="relative h-[150px] w-full divide-y divide-gray-200">
      <Loader />
    </div>;
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="rounded-lg bg-white shadow">
        <a href="/kepegawaian/data-pegawai" className="flex flex-row items-center gap-x-2 py-6 px-6">
          <ChevronLeftIcon className="h-5 w-5" />
          <div>Kembali</div>
        </a>
        <div className="px-6 pb-6">
          <div className="flex flex-col">
            <p className="text-[24px] font-medium text-gray-900">Pendataan Pegawai</p>
            <p className="text-[16px] font-[400] text-[#6B7280]">Data Diri Pegawai</p>
          </div>

          <div className="mt-[32px] w-full">
            <div className="mt-5 sm:col-span-6">
              <div className="mt-[27px]">
                <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                  Nama
                </label>
                <div className="pt-1">
                  <input
                    {...register('nama', { required: 'Silahkan masukan nama.' })}
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="nama"
                    type="text"
                  />
                  {errors.nama && <p className="mt-1 text-xs text-red-500">{errors.nama.message}</p>}
                </div>
              </div>
            </div>

            <div className="mt-5 sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700">Unit Organisasi</label>
              <div className="pt-1 sm:col-span-2 sm:mt-0">
                <select
                  {...register('unit_kerja_id', { required: 'Silahkan masukan unit organisasi.' })}
                  name="unit_kerja_id"
                  className="w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm"
                >
                  <option value="">Silahkan Pilih</option>
                  {(unitKerjaList || []).map((item, index) => (
                    <option key={`options-${index}`} value={item?.unit_kerja_id}>
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
                    {...register('nip', { required: 'Silahkan masukan nip.' })}
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
                    {...register('tempat_lahir', { required: 'Silahkan masukan tempat lahir.' })}
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
                    {...register('tanggal_lahir', { required: 'Silahkan masukan tanggal lahir.' })}
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
                    {...register('tmt_cpns', { required: 'Silahkan masukan tmt cpns.' })}
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
                          {...register('status_cpns', { required: 'Silahkan masukan status pegawai.' })}
                          id={each.type}
                          name="status_cpns"
                          type="radio"
                          value={each.id}
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
                  rules={{ required: 'Silahakan masukan jabatan' }}
                  render={({ field: { onChange } }) => (
                    <AutoComplete
                      onChange={value => onChange(value.value)}
                      label={'Jabatan'}
                      defaultValue={{ text: '', value: '' }}
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
                        value: String(each.jabatan_id),
                      }))}
                    />
                  )}
                />
                {errors.jabatan_id && <p className="mt-1 text-xs text-red-500">{errors.jabatan_id.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6">
              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700">Golongan</label>
                <div className="pt-1 sm:col-span-2 sm:mt-0">
                  <select
                    {...register('golongan_id', { required: 'Silahkan masukan golongan.' })}
                    name="golongan_id"
                    className="w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm"
                  >
                    <option value="">Silahkan Pilih</option>
                    {golongan?.data?.map(
                      (each: {
                        golongan_id: string | number | readonly string[] | undefined;
                        golongan: any;
                        pangkat: any;
                      }) => (
                        <option value={each?.golongan_id}>{`${each?.golongan}, ${each?.pangkat}`}</option>
                      )
                    )}
                    {errors.golongan_id && <p className="mt-1 text-xs text-red-500">{errors.golongan_id.message}</p>}
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="tmt_golongan" className="block text-sm font-medium text-gray-700">
                  TMT Golongan
                </label>
                <div className="pt-1">
                  <input
                    {...register('tmt_golongan', { required: 'Silahkan masukan tmt golongan.' })}
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="tmt_golongan"
                    type="date"
                  />
                  {errors.tmt_golongan && <p className="mt-1 text-xs text-red-500">{errors.tmt_golongan.message}</p>}
                </div>
              </div>
            </div>

            <div className="mt-5 sm:col-span-6">
              <label htmlFor="status_kepegawaian" className="block text-sm font-medium text-gray-700">
                Status Aktif
              </label>
              <fieldset className="mt-4">
                <div className="space-y-4">
                  {statusAktif.map(each => (
                    <div key={each.id} className="flex items-center">
                      <input
                        {...register('status_kepegawaian', { required: 'Silahkan masukan status aktif.' })}
                        id={each.id}
                        name="status_kepegawaian"
                        type="radio"
                        value={each.id}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor={each.id} className="ml-3 block text-sm font-medium text-gray-700">
                        {each.title}
                      </label>
                    </div>
                  ))}
                  {errors.status_kepegawaian && (
                    <p className="mt-1 text-xs text-red-500">{errors.status_kepegawaian.message}</p>
                  )}
                </div>
              </fieldset>
            </div>

            <div className="mt-5 sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700">Karpeg</label>
              <div className="pt-1 sm:col-span-2 sm:mt-0">
                <input
                  {...register('karpeg', { required: 'Silahkan masukan karpeg.' })}
                  className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                  name="karpeg"
                  type="text"
                />
                {errors.karpeg && <p className="mt-1 text-xs text-red-500">{errors.karpeg.message}</p>}
              </div>
            </div>

            <div className="my-[32px] h-[1px] w-full bg-gray-200"></div>

            <div className="flex flex-col">
              <p className="text-[24px] font-medium text-[#6B7280]">Data Diri Pribadi</p>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
              <div className="pt-1 sm:col-span-2 sm:mt-0">
                <select
                  {...register('jenis_kelamin', { required: 'Silahkan masukan jenis kelamin.' })}
                  name="jenis_kelamin"
                  className="w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm"
                >
                  <option value="">Silahkan Pilih</option>
                  <option value="1">Laki-laki</option>
                  <option value="2">Perempuan</option>
                </select>
                {errors.jenis_kelamin && <p className="mt-1 text-xs text-red-500">{errors.jenis_kelamin.message}</p>}
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700">Status Nikah</label>
              <div className="pt-1 sm:col-span-2 sm:mt-0">
                <select
                  {...register('status_menikah', { required: 'Silahkan masukan status menikah.' })}
                  name="status_menikah"
                  className="w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm"
                >
                  <option value="">Silahkan Pilih</option>
                  {statusNikah.map(each => (
                    <option value={each.id}>{each.title}</option>
                  ))}
                </select>
                {errors.status_menikah && <p className="mt-1 text-xs text-red-500">{errors.status_menikah.message}</p>}
              </div>
            </div>

            <div className="mt-5 sm:col-span-6">
              <div className="mt-[27px]">
                <label htmlFor="jumlah_anak" className="block text-sm font-medium text-gray-700">
                  Jumlah Anak
                </label>
                <div className="pt-1">
                  <input
                    {...register('jumlah_anak', { required: 'Silahkan masukan jumlah anak.' })}
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="jumlah_anak"
                    type="number"
                  />
                  {errors.jumlah_anak && <p className="mt-1 text-xs text-red-500">{errors.jumlah_anak.message}</p>}
                </div>
              </div>
            </div>

            <div className="mt-5 sm:col-span-6">
              <div className="mt-[27px]">
                <label htmlFor="ktp" className="block text-sm font-medium text-gray-700">
                  NIK
                </label>
                <div className="pt-1">
                  <input
                    {...register('ktp', { required: 'Silahkan masukan status NIK.' })}
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="ktp"
                    type="text"
                  />
                  {errors.ktp && <p className="mt-1 text-xs text-red-500">{errors.ktp.message}</p>}
                </div>
              </div>
            </div>

            <div className="mt-5 sm:col-span-6">
              <div className="mt-[27px]">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="pt-1">
                  <input
                    {...register('email', { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, required: true })}
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="email"
                    type="text"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">Silahkan masukan email anda dengan format yang sesuai.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 sm:col-span-6">
              <div className="mt-[27px]">
                <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">
                  Alamat
                </label>
                <div className="pt-1">
                  <input
                    {...register('alamat', { required: 'Silahkan masukan alamat.' })}
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="alamat"
                    type="text"
                  />
                  {errors.alamat && <p className="mt-1 text-xs text-red-500">{errors.alamat.message}</p>}
                </div>
              </div>
            </div>

            <div className="mt-5 sm:col-span-6">
              <div className="mt-[27px]">
                <label htmlFor="npwp" className="block text-sm font-medium text-gray-700">
                  NPWP
                </label>
                <div className="pt-1">
                  <input
                    {...register('npwp', { required: 'Silahkan masukan npwp.' })}
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="npwp"
                    type="text"
                  />
                  {errors.npwp && <p className="mt-1 text-xs text-red-500">{errors.npwp.message}</p>}
                </div>
              </div>
            </div>

            <div className="mt-5 sm:col-span-6">
              <div className="mt-[27px]">
                <label htmlFor="bpjs" className="block text-sm font-medium text-gray-700">
                  BPJS Kesehatan
                </label>
                <div className="pt-1">
                  <input
                    {...register('bpjs', { required: 'Silahkan masukan bpjs.' })}
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="bpjs"
                    type="text"
                  />
                  {errors.bpjs && <p className="mt-1 text-xs text-red-500">{errors.bpjs.message}</p>}
                </div>
              </div>
            </div>

            <div className="mt-[3rem] flex w-full">
              <div className="ml-auto flex flex-row gap-x-[12px]">
                <button
                  type="button"
                  className="rounded-[6px] bg-[#9CA3AF] py-[9px] px-[17px] text-[14px] text-gray-50"
                  onClick={() => (window.location.href = '/kepegawaian/data-pegawai')}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex rounded-[6px] bg-[#4F46E5] py-[9px] px-[17px] text-[14px] text-gray-50"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default MasterPnsForm;
