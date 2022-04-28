import { Dialog, Transition } from '@headlessui/react';
import { UploadIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { ArsipDigitalAPI, MasterAPI } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import {
  ArsipDigitalDetailData,
  GetArsipDigitalDetailReq,
  PostArsipDigitalInsertReq,
  PostArsipDigitalInsertRes,
  PostArsipDigitalUpdateReq,
  PostArsipDigitalUpdateRes,
} from '../../../../../types/api/ArsipDigitalAPI';
import { MasterJenisBerkasData } from '../../../../../types/api/MasterAPI';
import { Status } from '../../../../../types/Common';
import { classNames } from '../../../../../utils/Components';
import { callAPI } from '../../../../../utils/Fetchers';
import { CircleProgress } from '../../../../shared/CircleProgress';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import AutoComplete from '../../../../shared/Input/ComboBox';
import UploadWrapper, { FileObject } from '../../../../shared/Input/UploadWrapper';
import Loader from '../../../../shared/Loader/Loader';

interface FormState {
  nama_berkas: string;
  jenis_berkas: string;
  file_id: string;
  file_name: string;
}

interface UploadFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedId?: string;
  onSuccess: () => void;
}

export default function ArsipForm(props: UploadFormProps) {
  const dispatch = useDispatch();
  const personalData = usePersonalData();
  const { open, setOpen, selectedId, onSuccess } = props;

  const { data, isValidating } = useCommonApi<GetArsipDigitalDetailReq, ArsipDigitalDetailData>(
    ArsipDigitalAPI.GET_ARSIP_DIGITAL_VIEW,
    { arsip_digital_id: Number(selectedId) },
    { method: 'GET' },
    { skipCall: !selectedId, revalidateOnMount: true }
  );
  const { data: jenisBerkas } = useCommonApi<null, MasterJenisBerkasData[]>(MasterAPI.GET_MASTER_JENIS_BERKAS, null, {
    method: 'GET',
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormState>();

  // SET default value jenis berkas
  React.useEffect(() => {
    if (jenisBerkas && jenisBerkas.length) {
      setValue('jenis_berkas', String(jenisBerkas[jenisBerkas.length - 1].jenis_berkas_id));
    }
  }, [jenisBerkas]);

  // SET default value jenis berkas
  React.useEffect(() => {
    if (data && data.document_uuid) {
      setValue('file_id', data.document_uuid);
      setValue('file_name', data.document_name);
      setValue('nama_berkas', data.document_name);
    }
  }, [data]);

  if (isValidating) return <Loader />;

  const toggleModal = () => {
    setOpen(!open);
  };

  const submitHandler = async (formData: FormState) => {
    let resSubmit;
    if (selectedId) {
      resSubmit = await callAPI<PostArsipDigitalUpdateReq, PostArsipDigitalUpdateRes>(
        ArsipDigitalAPI.POST_ARSIP_DIGITAL_UPDATE,
        {
          pegawai_id: Number(personalData?.pegawai_id),
          arsip_digital_id: Number(selectedId),
          document_name: formData.nama_berkas,
          document_uuid: formData.file_id,
          jenis_berkas_id: Number(formData.jenis_berkas),
        },
        { method: 'post' }
      );
    } else {
      resSubmit = await callAPI<PostArsipDigitalInsertReq, PostArsipDigitalInsertRes>(
        ArsipDigitalAPI.POST_ARSIP_DIGITAL_INSERT,
        {
          pegawai_id: Number(personalData?.pegawai_id),
          document_name: formData.nama_berkas,
          document_uuid: formData.file_id,
          jenis_berkas_id: Number(formData.jenis_berkas),
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
    <>
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
                    {selectedId ? 'Ubah' : 'Tambah'} Arsip Digital
                  </h3>
                  <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
                </Dialog.Title>
                <form onSubmit={handleSubmit(submitHandler)} className="mt-2">
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
                    <label htmlFor="nama_berkas" className="block text-sm font-medium text-gray-700">
                      Nama Berkas
                    </label>
                    <div className="mt-1">
                      <input
                        {...register('nama_berkas', { required: 'Mohon masukkan nama berkas.' })}
                        autoComplete={'off'}
                        className={classNames(
                          'block w-full rounded-md shadow-sm sm:text-sm',
                          errors.nama_berkas
                            ? 'ring-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                        )}
                        name="nama_berkas"
                        type="text"
                      />
                      {errors.nama_berkas && <p className="mt-1 text-xs text-red-500">{errors.nama_berkas.message}</p>}
                    </div>
                  </div>

                  <div className="mt-5 sm:col-span-6">
                    {jenisBerkas && (jenisBerkas || []).length ? (
                      <Controller
                        control={control}
                        name="jenis_berkas"
                        render={({ field: { onChange, value } }) =>
                          value ? (
                            <AutoComplete
                              onChange={value => {
                                onChange(value.value);
                              }}
                              label={'Jenis Berkas'}
                              defaultValue={(() => {
                                const selectedJenisBerkas = jenisBerkas.filter(
                                  each => String(each.jenis_berkas_id) === value
                                )[0];
                                return {
                                  text: selectedJenisBerkas.jenis_berkas,
                                  value: String(selectedJenisBerkas.jenis_berkas_id),
                                };
                              })()}
                              options={jenisBerkas.map(each => {
                                return {
                                  text: each.jenis_berkas,
                                  value: String(each.jenis_berkas_id),
                                };
                              })}
                            />
                          ) : (
                            <React.Fragment />
                          )
                        }
                      />
                    ) : null}
                  </div>

                  <div className="mt-5 sm:col-span-6">
                    <Controller
                      control={control}
                      name={'file_name'}
                      rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
                      render={({ field: { onChange, value } }) => (
                        <UploadWrapper
                          allowedTypes={['pdf', 'jpg', 'jpeg', 'png']}
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
                                <div className="text-sm text-gray-600">{value || 'Bukti Arsip'}</div>
                                <div className="text-xs text-gray-400">(jpg,jpeg,png,pdf)</div>
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
                  <div className="mt-5">
                    <button
                      type="submit"
                      className="w-full rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Tambah
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
