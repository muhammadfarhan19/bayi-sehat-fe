import { Dialog, Transition } from '@headlessui/react';
import { UploadIcon, XIcon } from '@heroicons/react/outline';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { JabatanAPI, UnitKerjaAPI, UserAPI } from '../../../../../constants/APIUrls';
import { AgamaText, GenderText, StatusMenikahText } from '../../../../../constants/Resource';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import { GetJabatanReq, JabatanData } from '../../../../../types/api/JabatanAPI';
import { GetUnitKerjaData } from '../../../../../types/api/UnitKerjaAPI';
import {
  PostUserProfileReq,
  PostUserProfileRes,
  PostUserUpdateDataDiriPegawaiReq,
  PostUserUpdateDataDiriPegawaiRes,
} from '../../../../../types/api/UserAPI';
import { Agama, Gender, Status, StatusMenikah } from '../../../../../types/Common';
import { classNames } from '../../../../../utils/Components';
import { callAPI } from '../../../../../utils/Fetchers';
import { CircleProgress } from '../../../../shared/CircleProgress';
import useAllowAdmin from '../../../../shared/hooks/useAllowAdmin';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import AutoComplete from '../../../../shared/Input/ComboBox';
import UploadWrapper, { FileObject } from '../../../../shared/Input/UploadWrapper';

interface UploadFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
}

interface FormState {
  // data pegawai
  pegawai_id: number;
  status_menikah: number;
  jumlah_anak: number;
  nik: string;
  email: string;
  alamat: string;
  npwp: string;
  bpjs: string;
  hp: string;
  agama: number;
  golongan_darah: string;
  no_bpjs_kt: string;
  file_name_bpjs_kesehatan: string;
  file_id_bpjs_kesehatan: string;
  file_name_bpjs_kt: string;
  file_id_bpjs_kt: string;
  file_name_npwp: string;
  file_id_npwp: string;
  file_name_ktp: string;
  file_id_ktp: string;
  // data diri
  tempat_lahir: string;
  tanggal_lahir: string;
  jabatan: string;
  jenis_kelamin: number;
  unit_kerja_id: number;
}

export default function DataPribadiForm(props: UploadFormProps) {
  const { open, setOpen, onSuccess } = props;
  const isAllowAdmin = useAllowAdmin();
  const pegawai = usePersonalData();
  // console.log(pegawai)
  const dispatch = useDispatch();
  const debounce = React.useRef<number>(0);
  const [queryJabatan, setQueryJabatan] = React.useState('');
  const toggleModal = () => {
    setOpen(!open);
  };
  const [formJabatanState, setFormJabatanState] = React.useState<{ text?: string; value?: string }>({
    text: undefined,
    value: undefined,
  });

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

  const { data: daftarJabatan } = useCommonApi<GetJabatanReq, JabatanData>(
    JabatanAPI.GET_JABATAN,
    { page: 1, per_page: 20, jabatan: queryJabatan },
    { method: 'GET' }
  );

  const { data: getJabatan } = useCommonApi<GetJabatanReq, JabatanData>(
    JabatanAPI.GET_JABATAN,
    { page: 1, per_page: 20, jabatan: pegawai?.jabatan },
    { method: 'GET' }
  );

  const submitHandler = async (formData: FormState) => {
    const updateDataPribadi = await callAPI<PostUserProfileReq, PostUserProfileRes>(
      UserAPI.POST_USER_UPDATE_PROFILE,
      {
        nik: formData.nik,
        email: formData.email,
        alamat: formData.alamat,
        npwp: formData.npwp,
        bpjs: formData.bpjs,
        hp: formData.hp,
        agama: Number(formData?.agama),
        golongan_darah: String(formData?.golongan_darah),
        no_bpjs_kt: String(formData?.no_bpjs_kt),
        jumlah_anak: Number(formData.jumlah_anak),
        status_menikah: Number(formData.status_menikah),
        pegawai_id: Number(pegawai?.pegawai_id),
        uuid_bpjs: [
          {
            document_name: formData?.file_name_bpjs_kesehatan,
            document_uuid: formData?.file_id_bpjs_kesehatan,
          },
        ],
        uuid_bpjs_kt: [
          {
            document_name: formData?.file_name_bpjs_kt,
            document_uuid: formData?.file_id_bpjs_kt,
          },
        ],
        uuid_ktp: [
          {
            document_name: formData?.file_name_ktp,
            document_uuid: formData?.file_id_ktp,
          },
        ],
        uuid_npwp: [
          {
            document_name: formData?.file_name_npwp,
            document_uuid: formData?.file_id_npwp,
          },
        ],
      },
      { method: 'post' }
    );

    const updateDataPegawai = await callAPI<PostUserUpdateDataDiriPegawaiReq, PostUserUpdateDataDiriPegawaiRes>(
      UserAPI.POST_USER_UPDATE_DATA_DIRI_PEGAWAI,
      {
        pegawai_id: Number(pegawai?.pegawai_id),
        unit_kerja_id: Number(formData?.unit_kerja_id),
        nip: String(pegawai?.nip),
        tempat_lahir: String(formData?.tempat_lahir),
        tanggal_lahir: String(formData?.tanggal_lahir),
        tmt_cpns: String(pegawai?.tmt_cpns),
        status_cpns: Number(pegawai?.status_cpns),
        jabatan: Number(formData?.jabatan),
        tmt_golongan: String(pegawai?.tmt_golongan),
        pangkat: Number(pegawai?.golongan_id),
        masa_kerja: String(pegawai?.masa_kerja),
        masa_kerja_kepangkatan: String(pegawai?.masa_kerja_kepangkatan),
        karpeg: String(pegawai?.karpeg),
        karpeg_file: [
          {
            document_uuid: String(pegawai?.karpeg_file?.[0]?.document_uuid),
            document_name: String(pegawai?.karpeg_file?.[0]?.document_name),
          },
        ],
      },
      { method: 'post' }
    );

    if (
      updateDataPribadi.status === 200 &&
      updateDataPribadi.data?.status === Status.OK &&
      updateDataPegawai.status === 200 &&
      updateDataPegawai.data?.status === Status.OK
    ) {
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

  React.useEffect(() => {
    if (open && pegawai !== null) {
      const unitKerjaId = unitKerjaList?.find(each => each.name === String(pegawai?.unit_kerja));
      setValue('unit_kerja_id', Number(unitKerjaId?.unit_kerja_id));
      setValue('status_menikah', Number(pegawai?.status_menikah));
      setValue('jumlah_anak', Number(pegawai?.jumlah_anak));
      setValue('nik', String(pegawai?.ktp));
      setValue('email', String(pegawai?.email));
      setValue('alamat', String(pegawai?.alamat));
      setValue('npwp', String(pegawai?.npwp));
      setValue('bpjs', String(pegawai?.bpjs));
      setValue('no_bpjs_kt', String(pegawai?.no_bpjs_kt));
      setValue('hp', String(pegawai?.hp));
      setValue('agama', Number(pegawai?.agama));
      setValue('golongan_darah', String(pegawai?.golongan_darah));

      if (pegawai?.uuid_bpjs?.length) {
        setValue('file_id_bpjs_kesehatan', String(pegawai?.uuid_bpjs?.[0]?.document_uuid));
        setValue('file_name_bpjs_kesehatan', String(pegawai?.uuid_bpjs?.[0]?.document_name));
      }

      if (pegawai?.uuid_bpjs_kt?.length) {
        setValue('file_id_bpjs_kt', String(pegawai?.uuid_bpjs_kt?.[0]?.document_uuid));
        setValue('file_name_bpjs_kt', String(pegawai?.uuid_bpjs_kt?.[0]?.document_name));
      }

      if (pegawai?.uuid_npwp?.length) {
        setValue('file_id_npwp', String(pegawai?.uuid_npwp?.[0]?.document_uuid));
        setValue('file_name_npwp', String(pegawai?.uuid_npwp?.[0]?.document_name));
      }

      if (pegawai?.uuid_ktp?.length) {
        setValue('file_id_ktp', String(pegawai?.uuid_ktp?.[0]?.document_uuid));
        setValue('file_name_ktp', String(pegawai?.uuid_ktp?.[0]?.document_name));
      }

      setValue('tanggal_lahir', String(pegawai?.tanggal_lahir));
      setValue('tempat_lahir', String(pegawai?.tempat_lahir));
      setValue('jenis_kelamin', Number(pegawai?.jenis_kelamin));
      setValue('jabatan', String(getJabatan?.list?.[0].jabatan_id));

      setFormJabatanState({
        text: getJabatan?.list?.[0].name,
        value: String(getJabatan?.list?.[0].jabatan_id),
      });
    }
  }, [open]);

  return (
    <Transition appear show={open} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={toggleModal}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 backdrop-brightness-50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-full max-w-lg transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="div" className="flex justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Ubah Data Pribadi</h3>
                <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
              </Dialog.Title>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="nip" className="block text-sm font-medium text-gray-700">
                    NIP
                  </label>
                  <div className="mt-1">
                    <input
                      className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                      disabled={true}
                      name="nip"
                      type="text"
                      value={pegawai?.nip}
                    />
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                    Nama
                  </label>
                  <div className="mt-1">
                    <input
                      className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                      disabled={true}
                      name="nama"
                      type="text"
                      value={pegawai?.nama}
                    />
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Unit Kerja</label>
                  <div className="pt-1 sm:col-span-2 sm:mt-0">
                    <select
                      className="w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm"
                      {...register('unit_kerja_id', { required: 'Silahkan masukan unit kerja.' })}
                      disabled={isAllowAdmin ? false : true}
                    >
                      <option value="">Silahkan Pilih</option>
                      {(unitKerjaList || []).map((item, index) => (
                        <option key={`options-${index}`} value={item?.unit_kerja_id}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
                    {errors.unit_kerja_id && (
                      <p className="mt-1 text-xs text-red-500">{errors.unit_kerja_id.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Tempat Lahir</label>
                  <div className="mt-1">
                    <input
                      {...register('tempat_lahir', { required: 'Silahkan masukan tempat lahir.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                      name="tempat_lahir"
                      type="text"
                      disabled={isAllowAdmin ? false : true}
                    />
                    {errors.tempat_lahir && <p className="mt-1 text-xs text-red-500">{errors.tempat_lahir.message}</p>}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                  <div className="mt-1">
                    <input
                      {...register('tanggal_lahir', { required: 'Silahkan masukan nama tanggal lahir.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                      name="tanggal_lahir"
                      type="date"
                      disabled={isAllowAdmin ? false : true}
                    />
                    {errors.tanggal_lahir && (
                      <p className="mt-1 text-xs text-red-500">{errors.tanggal_lahir.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <div className="mt-1">
                    <Controller
                      control={control}
                      name="jabatan"
                      rules={{ required: 'Mohon isi data jabatan' }}
                      render={({ field: { onChange } }) => (
                        <AutoComplete
                          disabled={isAllowAdmin ? false : true}
                          onChange={value => onChange(value.value)}
                          label={'Nama Jabatan'}
                          defaultValue={{ text: formJabatanState.text || '', value: formJabatanState.value || '' }}
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
                    {errors.jabatan && <p className="mt-1 text-xs text-red-500">{errors.jabatan.message}</p>}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                  <div className="mt-1">
                    <select
                      className="w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm"
                      {...register('jenis_kelamin', { required: 'Silahkan masukan jenis kelamin.' })}
                      disabled
                    >
                      {Object.keys(GenderText)?.map((each, index) => {
                        return (
                          <option
                            key={`options-${index}`}
                            value={each}
                            selected={each === String(pegawai?.jenis_kelamin) ? true : false}
                          >
                            {GenderText[each as unknown as Gender]}
                          </option>
                        );
                      })}
                    </select>
                    {errors.jenis_kelamin && (
                      <p className="mt-1 text-xs text-red-500">{errors.jenis_kelamin.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="agama" className="block text-sm font-medium text-gray-700">
                    Agama
                  </label>
                  <div className="mt-1">
                    <select
                      className="w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm"
                      {...register('agama', { required: 'Silahkan masukan agama.' })}
                    >
                      {Object.keys(AgamaText)?.map((each, index) => {
                        return (
                          <option
                            key={`options-${index}`}
                            value={each}
                            selected={each === String(pegawai?.agama) ? true : false}
                          >
                            {AgamaText[each as unknown as Agama]}
                          </option>
                        );
                      })}
                    </select>
                    {errors.agama && <p className="mt-1 text-xs text-red-500">{errors.agama.message}</p>}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="golongan_darah" className="block text-sm font-medium text-gray-700">
                    Golongan Darah
                  </label>
                  <div className="mt-1">
                    <select
                      className="w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm"
                      {...register('golongan_darah', { required: 'Silahkan masukan golongan darah.' })}
                    >
                      <option value={''}>Silahkan Pilih</option>
                      <option value={'A'}>A</option>
                      <option value={'B'}>B</option>
                      <option value={'O'}>O</option>
                      <option value={'AB'}>AB</option>
                    </select>
                    {errors.golongan_darah && (
                      <p className="mt-1 text-xs text-red-500">{errors.golongan_darah.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="hp" className="block text-sm font-medium text-gray-700">
                    Nomor Ponsel
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('hp', { required: 'Silahkan masukan nomor ponsel.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="hp"
                      type="text"
                    />
                    {errors.hp && <p className="mt-1 text-xs text-red-500">{errors.hp.message}</p>}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('email', { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, required: true })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="email"
                      type="text"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">Silahkan masukan email anda dengan format yang sesuai</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">
                    Alamat
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('alamat', { required: 'Silahkan masukan alamat.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="alamat"
                      type="text"
                    />
                    {errors.alamat && <p className="mt-1 text-xs text-red-500">{errors.alamat.message}</p>}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="npwp" className="block text-sm font-medium text-gray-700">
                    NPWP
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('npwp', { required: 'Silahkan masukan npwp.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="npwp"
                      type="text"
                    />
                    {errors.npwp && <p className="mt-1 text-xs text-red-500">{errors.npwp.message}</p>}
                  </div>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name={'file_name_npwp'}
                      rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
                      render={({ field: { onChange, value } }) => (
                        <UploadWrapper
                          allowedTypes={['pdf']}
                          handleUploadChange={(files: FileObject[]) => {
                            setValue('file_id_npwp', files[0].id);
                            onChange(files[0].name);
                          }}
                        >
                          {({ loading }) => (
                            <div
                              className={classNames(
                                'flex items-center justify-between border-[1px] p-3',
                                errors.file_name_npwp ? 'border-red-500' : ''
                              )}
                            >
                              <div>
                                <div className="text-sm text-gray-600">{value || 'Kartu NPWP'}</div>
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
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="bpjs" className="block text-sm font-medium text-gray-700">
                    BPJS Kesehatan
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('bpjs', { required: 'Silahkan masukan bpjs.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="bpjs"
                      type="text"
                    />
                    {errors.bpjs && <p className="mt-1 text-xs text-red-500">{errors.bpjs.message}</p>}
                  </div>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name={'file_name_bpjs_kesehatan'}
                      rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
                      render={({ field: { onChange, value } }) => (
                        <UploadWrapper
                          allowedTypes={['pdf']}
                          handleUploadChange={(files: FileObject[]) => {
                            setValue('file_id_bpjs_kesehatan', files[0].id);
                            onChange(files[0].name);
                          }}
                        >
                          {({ loading }) => (
                            <div
                              className={classNames(
                                'flex items-center justify-between border-[1px] p-3',
                                errors.file_name_bpjs_kesehatan ? 'border-red-500' : ''
                              )}
                            >
                              <div>
                                <div className="text-sm text-gray-600">{value || 'Kartu BPJS Kesehatan'}</div>
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
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="no_bpjs_kt" className="block text-sm font-medium text-gray-700">
                    BPJS Ketenagakerjaan
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('no_bpjs_kt', { required: 'Silahkan masukan bpjs ketenagakerjaan.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="no_bpjs_kt"
                      type="text"
                    />
                    {errors.no_bpjs_kt && <p className="mt-1 text-xs text-red-500">{errors.no_bpjs_kt.message}</p>}
                  </div>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name={'file_name_bpjs_kt'}
                      rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
                      render={({ field: { onChange, value } }) => (
                        <UploadWrapper
                          allowedTypes={['pdf']}
                          handleUploadChange={(files: FileObject[]) => {
                            setValue('file_id_bpjs_kt', files[0].id);
                            onChange(files[0].name);
                          }}
                        >
                          {({ loading }) => (
                            <div
                              className={classNames(
                                'flex items-center justify-between border-[1px] p-3',
                                errors.file_name_bpjs_kt ? 'border-red-500' : ''
                              )}
                            >
                              <div>
                                <div className="text-sm text-gray-600">{value || 'Kartu BPJS Ketenagakerjaan'}</div>
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
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700">
                    Status Pernikahan
                  </label>
                  <div className="mt-1">
                    <select
                      className="w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm"
                      {...register('status_menikah', { required: 'Silahkan masukan status pernikahan.' })}
                    >
                      {Object.keys(StatusMenikahText)?.map((each, index) => {
                        return (
                          <option
                            key={`options-${index}`}
                            value={each}
                            selected={each === String(pegawai?.status_menikah) ? true : false}
                          >
                            {StatusMenikahText[each as unknown as StatusMenikah]}
                          </option>
                        );
                      })}
                    </select>
                    {errors.status_menikah && (
                      <p className="mt-1 text-xs text-red-500">{errors.status_menikah.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="jumlah_anak" className="block text-sm font-medium text-gray-700">
                    Jumlah Anak
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('jumlah_anak', { required: 'Silahkan masukan jumlah anak.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="jumlah_anak"
                      type="number"
                    />
                    {errors.jumlah_anak && <p className="mt-1 text-xs text-red-500">{errors.jumlah_anak.message}</p>}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="nik" className="block text-sm font-medium text-gray-700">
                    NIK
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('nik', { required: 'Silahkan masukan nik.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="nik"
                      type="text"
                    />
                    {errors.nik && <p className="mt-1 text-xs text-red-500">{errors.nik.message}</p>}
                  </div>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name={'file_name_ktp'}
                      rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
                      render={({ field: { onChange, value } }) => (
                        <UploadWrapper
                          allowedTypes={['pdf']}
                          handleUploadChange={(files: FileObject[]) => {
                            setValue('file_id_ktp', files[0].id);
                            onChange(files[0].name);
                          }}
                        >
                          {({ loading }) => (
                            <div
                              className={classNames(
                                'flex items-center justify-between border-[1px] p-3',
                                errors.file_name_ktp ? 'border-red-500' : ''
                              )}
                            >
                              <div>
                                <div className="text-sm text-gray-600">{value || 'KTP'}</div>
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

                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
