import { Dialog, Transition } from '@headlessui/react';
import { PhotographIcon, UploadIcon } from '@heroicons/react/outline';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { KepegawaianAPI } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import { PostPegawaiKarpegUpdateReq, PostPegawaiKarpegUpdateRes } from '../../../../../types/api/KepegawaianAPI';
import { Status } from '../../../../../types/Common';
import { classNames } from '../../../../../utils/Components';
import { callAPI } from '../../../../../utils/Fetchers';
import { CircleProgress } from '../../../../shared/CircleProgress';
import FileLoader from '../../../../shared/FileLoader';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import UploadWrapper, { FileObject } from '../../../../shared/Input/UploadWrapper';

interface FormState {
  nomorKartu: string;
  uuid_karpeg: string;
}

export default function KarpegModal() {
  const dataPersonal = usePersonalData();
  const dispatch = useDispatch();

  const [show, setShow] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
  const [loadingForm, setLoadingForm] = React.useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormState>();

  const handleModal = () => {
    setShow(!show);
  };

  const submitHandler = async (formData: FormState) => {
    setLoadingForm(true);
    const resSubmit = await callAPI<PostPegawaiKarpegUpdateReq, PostPegawaiKarpegUpdateRes>(
      KepegawaianAPI.POST_PEGAWAI_KARPEG_UPDATE,
      {
        karpeg: formData.nomorKartu,
        karpeg_file: [{ document_name: 'Kartu Pegawai', document_uuid: formData.uuid_karpeg }],
        pegawai_id: Number(dataPersonal?.pegawai_id),
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
      window.location.reload();
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal menyimpan data. Mohon coba beberapa saat lagi.',
          type: SnackbarType.ERROR,
        })
      );
      setLoadingForm(false);
    }
  };

  const link = dataPersonal?.karpeg_file?.[0]?.document_uuid;

  return (
    <>
      <a className="cursor-pointer whitespace-nowrap text-blue-500 underline" onClick={() => setShow(true)}>
        {dataPersonal?.karpeg}
      </a>
      <Transition appear show={show} as={React.Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={handleModal}>
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
              <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Kartu Pegawai
                </Dialog.Title>
                {showForm ? (
                  <>
                    <form onSubmit={handleSubmit(submitHandler)} className="mt-2">
                      <div className="mt-5 sm:col-span-6">
                        <label className="block text-sm font-medium text-gray-700">Nomor Kartu Pegawai</label>
                        <div className="mt-1">
                          <input
                            {...register('nomorKartu', { required: 'Mohon masukkan nomor kartu pegawai.' })}
                            autoComplete={'off'}
                            className={classNames(
                              'block w-full rounded-md shadow-sm sm:text-sm',
                              errors.nomorKartu
                                ? 'ring-red-500 focus:border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                            )}
                            type="text"
                          />
                          {errors.nomorKartu && (
                            <p className="mt-1 text-xs text-red-500">{errors.nomorKartu.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="mt-5 sm:col-span-6">
                        <Controller
                          control={control}
                          name={'uuid_karpeg'}
                          rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
                          render={({ field: { onChange, value } }) => (
                            <UploadWrapper
                              allowedTypes={['pdf', 'jpg', 'jpeg', 'png']}
                              handleUploadChange={(files: FileObject[]) => {
                                onChange(files[0].id);
                              }}
                            >
                              {({ loading }) => (
                                <div
                                  className={classNames(
                                    'flex items-center justify-between border-[1px] p-3',
                                    errors.uuid_karpeg ? 'border-red-500' : ''
                                  )}
                                >
                                  <div>
                                    <div className={classNames('text-sm', value ? 'text-green-600' : 'text-gray-600')}>
                                      File Karpeg {!!value && 'terupload'}
                                    </div>
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
                        {errors.uuid_karpeg && (
                          <p className="mt-1 text-xs text-red-500">{errors.uuid_karpeg.message}</p>
                        )}
                      </div>
                      <div className="mt-5 flex flex-col items-end">
                        <div className="inline-flex items-center">
                          <button
                            disabled={loadingForm}
                            type="submit"
                            className="inline-flex rounded-md border border-transparent bg-indigo-600 p-2 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            {loadingForm ? <CircleProgress /> : null}
                            Simpan
                          </button>
                          <button
                            className="ml-1 rounded-md border border-gray-300 p-2 focus:bg-gray-50 focus:outline-none"
                            onClick={() => setShowForm(false)}
                          >
                            Kembali
                          </button>
                        </div>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <div className="mt-2 flex flex-col items-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                        onClick={() => setShowForm(true)}
                      >
                        Perbaharui Kartu Pegawai
                      </button>
                    </div>
                    <div className="relative mt-4 flex w-full flex-col items-center rounded-lg border-2 border-solid border-gray-300 p-4">
                      {link ? <FileLoader uuid={link}></FileLoader> : <PhotographIcon className="h-16 text-gray-300" />}
                    </div>
                    <div className="mt-5">
                      <button
                        type="submit"
                        className="w-full rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setShow(false)}
                      >
                        Keluar
                      </button>
                    </div>
                  </>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
