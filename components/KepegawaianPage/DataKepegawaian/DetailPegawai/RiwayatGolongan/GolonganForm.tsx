import { Dialog, Transition } from '@headlessui/react';
import { UploadIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { GolonganAPI } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import {
  RiwayatGolonganListData,
  UpdateRiwayatGolonganReq,
  UpdateRiwayatGolonganRes,
} from '../../../../../types/api/GolonganAPI';
import { Status } from '../../../../../types/Common';
import { classNames } from '../../../../../utils/Components';
import { callAPI } from '../../../../../utils/Fetchers';
import { CircleProgress } from '../../../../shared/CircleProgress';
import DatePicker from '../../../../shared/Input/DatePicker';
import UploadWrapper, { FileObject } from '../../../../shared/Input/UploadWrapper';

interface FormState {
  tmt: number;
  masa_kerja: string;
  file_name: string;
  file_id: string;
}

interface GolonganFormProps {
  onSuccess: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  detail?: RiwayatGolonganListData;
}

export default function GolonganForm(props: GolonganFormProps) {
  const dispatch = useDispatch();
  const { onSuccess, open, setOpen, detail } = props;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormState>({
    defaultValues: {
      tmt: Date.now(),
    },
  });

  const toggleModal = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    if (detail) {
      setValue('file_id', String(detail?.files?.[0]?.document_uuid || ''));
      setValue('file_name', String(detail?.files?.[0]?.document_uuid || ''));
      setValue('masa_kerja', detail?.masa_kerja);
      setValue('tmt', Number(new Date(detail?.tmt).getTime()));
    }
  }, [detail]);

  const submitHandler = async (formData: FormState) => {
    if (detail?.riwayat_id) {
      const resSubmit = await callAPI<UpdateRiwayatGolonganReq, UpdateRiwayatGolonganRes>(
        GolonganAPI.UPDATE_RIWAYAT_GOLONGAN,
        {
          riwayat_id: detail.riwayat_id,
          tanggal_mulai: new Date(formData.tmt).toISOString().split('T')?.[0],
          masa_jabatan: formData.masa_kerja,
          files: [
            {
              document_name: formData.file_name,
              document_uuid: formData.file_id,
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
        return;
      }
    }

    dispatch(
      setSnackbar({
        show: true,
        message: 'Gagal menyimpan data. Mohon coba beberapa saat lagi.',
        type: SnackbarType.ERROR,
      })
    );
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
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Ubah Riwayat Golongan</h3>
                  <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
                </Dialog.Title>
                <form onSubmit={handleSubmit(submitHandler)} className="mt-2">
                  <div className="mt-5 sm:col-span-6">
                    <label className="block text-sm font-medium text-gray-700">Masa Kerja</label>
                    <div className="mt-1">
                      <input
                        {...register('masa_kerja', { required: 'Mohon masukkan informasi masa kerja.' })}
                        autoComplete={'off'}
                        className={classNames(
                          'block w-full rounded-md shadow-sm sm:text-sm',
                          errors.masa_kerja
                            ? 'ring-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                        )}
                        type="text"
                      />
                      {errors.masa_kerja && <p className="mt-1 text-xs text-red-500">{errors.masa_kerja.message}</p>}
                    </div>
                  </div>
                  <div className="mt-5 sm:col-span-6">
                    <label className="block text-sm font-medium text-gray-700">TMT</label>
                    <div className="mt-1">
                      <Controller
                        control={control}
                        name={'tmt'}
                        rules={{ required: 'Mohon masukkan tmt.' }}
                        render={({ field: { onChange, value } }) => (
                          <DatePicker
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            selected={new Date(value)}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date: Date) => onChange(date.getTime())}
                            customInput={
                              <input
                                type="text"
                                className={classNames(
                                  'block w-full rounded-md shadow-sm sm:text-sm',
                                  errors.tmt
                                    ? 'ring-red-500 focus:border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                                )}
                              />
                            }
                          />
                        )}
                      ></Controller>
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
                                <div className="text-sm text-gray-600">{value || 'Surat Keputusan'}</div>
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
    </>
  );
}
