import { Dialog, Transition } from '@headlessui/react';
import { UploadIcon, XIcon } from '@heroicons/react/outline';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { RiwayatPendidikanAPI } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import {
  GetRiwayatPendidikanDetailReq,
  PostRiwayatPendidikanInsertReq,
  PostRiwayatPendidikanInsertRes,
  PostRiwayatPendidikanUpdateReq,
  PostRiwayatPendidikanUpdateRes,
  RiwayatPendidikanDetailData,
} from '../../../../../types/api/PendidikanAPI';
import { Status } from '../../../../../types/Common';
import { classNames } from '../../../../../utils/Components';
import { callAPI } from '../../../../../utils/Fetchers';
import { CircleProgress } from '../../../../shared/CircleProgress';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import useJenjangPendidikan from '../../../../shared/hooks/useJenjangPendidikan';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import AutoComplete from '../../../../shared/Input/ComboBox';
import UploadWrapper, { FileObject } from '../../../../shared/Input/UploadWrapper';

interface UploadFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedId?: string;
  onSuccess: () => void;
}

interface FormState {
  pegawai_id: number;
  file_id: string;
  file_name: string;
  jenjang: number;
  nama_institusi: string;
  prodi: string;
  no_ijazah: string;
  ijazah_cpns: string;
  ijazah_terakhir: string;
  tgl_lulus: string;
  document_uuid: string;
}

export default function PendidikanForm(props: UploadFormProps) {
  const { open, setOpen, selectedId, onSuccess } = props;
  const dispatch = useDispatch();
  const personalData = usePersonalData();
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

  const jenjangPendidikan = useJenjangPendidikan();

  const { data } = useCommonApi<GetRiwayatPendidikanDetailReq, RiwayatPendidikanDetailData>(
    RiwayatPendidikanAPI.GET_RIWAYAT_PENDIDIKAN_DETAIL,
    { id: Number(selectedId) },
    { method: 'GET' },
    { skipCall: !selectedId, revalidateOnMount: true }
  );

  React.useEffect(() => {
    if (data && data?.files[0]?.document_uuid) {
      setValue('file_id', data.files[0].document_uuid);
      setValue('file_name', data.files[0].document_name);
      setValue('jenjang', data.jenjang_id);
      setValue('nama_institusi', data.pt);
      setValue('prodi', data.prodi);
      setValue('no_ijazah', data.no_ijazah);
      setValue('ijazah_cpns', data.is_ijazah_cpns === true ? '1' : '2'),
        setValue('ijazah_terakhir', data.is_ijazah_terakhir === true ? '1' : '2'),
        setValue('tgl_lulus', data.tanggal_lulus);
    }
  }, [data]);

  const submitHandler = async (formData: FormState) => {
    let resSubmit;
    if (selectedId) {
      resSubmit = await callAPI<PostRiwayatPendidikanUpdateReq, PostRiwayatPendidikanUpdateRes>(
        RiwayatPendidikanAPI.POST_RIWAYAT_PENDIDIKAN_UPDATE,
        {
          riwayat_id: Number(selectedId),
          pegawai_id: Number(personalData?.pegawai_id),
          jenjang_id: Number(formData.jenjang),
          prodi: formData.prodi,
          pt: formData.nama_institusi,
          tanggal_lulus: formData.tgl_lulus,
          no_ijazah: formData.no_ijazah,
          is_ijazah_cpns: formData.ijazah_cpns === '1' ? true : false,
          is_ijazah_terakhir: formData.ijazah_cpns === '1' ? true : false,
          files: [
            {
              document_uuid: formData.file_id,
              document_name: formData.file_name,
            },
          ],
        },
        { method: 'put' }
      );
    } else {
      resSubmit = await callAPI<PostRiwayatPendidikanInsertReq, PostRiwayatPendidikanInsertRes>(
        RiwayatPendidikanAPI.POST_RIWAYAT_PENDIDIKAN_INSERT,
        {
          pegawai_id: Number(personalData?.pegawai_id),
          jenjang_id: Number(formData.jenjang),
          prodi: formData.prodi,
          pt: formData.nama_institusi,
          tanggal_lulus: formData.tgl_lulus,
          no_ijazah: formData.no_ijazah,
          is_ijazah_cpns: formData.ijazah_cpns === '1' ? true : false,
          is_ijazah_terakhir: formData.ijazah_terakhir === '1' ? true : false,
          files: [
            {
              document_uuid: formData.file_id,
              document_name: formData.file_name,
            },
          ],
        },
        { method: 'post' }
      );
    }

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
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {selectedId ? 'Ubah' : 'Tambah'} Riwayat Pendidikan
                </h3>
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
                      value={personalData?.nip}
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
                      value={personalData?.nama}
                    />
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <Controller
                      control={control}
                      rules={{ required: 'Mohon pilih jenjang yang ingin disimpan.' }}
                      name="jenjang"
                      render={({ field: { onChange } }) => (
                        <AutoComplete
                          onChange={value => onChange(value.value)}
                          label={'Jenjang'}
                          options={(jenjangPendidikan || [])?.map(each => ({
                            text: each.jenjang,
                            value: String(each.jenjang_id),
                          }))}
                        />
                      )}
                    />
                    {errors.jenjang && <p className="mt-1 text-xs text-red-500">{errors.jenjang.message}</p>}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Nama Institusi</label>
                  <div className="mt-1">
                    <input
                      {...register('nama_institusi', { required: 'Silahkan masukan nama institusi.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="nama_institusi"
                      type="text"
                    />
                    {errors.nama_institusi && (
                      <p className="mt-1 text-xs text-red-500">{errors.nama_institusi.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Prodi/Jurusan</label>
                  <div className="mt-1">
                    <input
                      {...register('prodi', { required: 'Silahkan masukan prodi/jurusan.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="prodi"
                      type="text"
                    />
                    {errors.prodi && <p className="mt-1 text-xs text-red-500">{errors.prodi.message}</p>}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">No Ijazah</label>
                  <div className="mt-1">
                    <input
                      {...register('no_ijazah', { required: 'Silahkan masukan nomor ijazah.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="no_ijazah"
                      type="text"
                    />
                    {errors.no_ijazah && <p className="mt-1 text-xs text-red-500">{errors.no_ijazah.message}</p>}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Ijazah CPNS?</label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <select
                      {...register('ijazah_cpns', { required: 'Silahkan pilih ijazah cpns.' })}
                      name="ijazah_cpns"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value={''}>Silahkan Pilih</option>
                      <option value={1}>YA</option>
                      <option value={2}>TIDAK</option>
                    </select>
                    {errors.ijazah_cpns && <p className="mt-1 text-xs text-red-500">{errors.ijazah_cpns.message}</p>}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Ijazah Terakhir?</label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <select
                      {...register('ijazah_terakhir', { required: 'Silahkan pilih ijazah terakhir.' })}
                      name="ijazah_terakhir"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value={''}>Silahkan Pilih</option>
                      <option value={1}>YA</option>
                      <option value={2}>TIDAK</option>
                    </select>
                    {errors.ijazah_terakhir && (
                      <p className="mt-1 text-xs text-red-500">{errors.ijazah_terakhir.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="tgl_lulus" className="block text-sm font-medium text-gray-700">
                    Tanggal Lulus
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('tgl_lulus', { required: 'Silahkan masukan tanggal lulus.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      name="tgl_lulus"
                      type="date"
                    />
                    {errors.tgl_lulus && <p className="mt-1 text-xs text-red-500">{errors.tgl_lulus.message}</p>}
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
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
                              'flex items-center justify-between border-[1px] p-3',
                              errors.file_name ? 'border-red-500' : ''
                            )}
                          >
                            <div>
                              <div className="text-sm text-gray-600">{value || 'Bukti Ijazah'}</div>
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
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {selectedId ? 'Ubah' : 'Tambah'} Riwayat Pendidikan
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
