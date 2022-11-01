import { Dialog, Transition } from '@headlessui/react';
import { UploadIcon, XIcon } from '@heroicons/react/outline';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { PeningkatanKompAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import { PostPeningkatanReq, PostPeningkatanRes } from '../../../types/api/PeningkatanKompetensiAPI';
import { Status } from '../../../types/Common';
import { classNames } from '../../../utils/Components';
import { callAPI } from '../../../utils/Fetchers';
import { CircleProgress } from '../../shared/CircleProgress';
import UploadWrapper, { FileObject } from '../../shared/Input/UploadWrapper';

const dateToday = new Date();
interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface FormState {
  tahun: number;
  file_name: string;
  file_id: string;
}

function FormLogHarianPPNPN(props: ModalProps) {
  const { open, setOpen } = props;
  const selectedYear = dateToday.getFullYear() - 10;
  const dispatch = useDispatch();
  const [year, setYear] = React.useState<number>(selectedYear);
  const toggleModal = () => {
    setOpen(!open);
  };

  const {
    control,
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<FormState>();

  const submitHandler = async (formData: FormState) => {
    const resSubmit = await callAPI<PostPeningkatanReq, PostPeningkatanRes>(
      PeningkatanKompAPI.POST_PENINGKATAN_KOMP_INSERT,
      {
        tahun: year,
        files: [
          {
            document_name: formData?.file_name,
            document_uuid: formData?.file_id,
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
                <h3 className="text-lg font-medium leading-6 text-gray-900">Tambah Peningkatan Kompetensi</h3>
                <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
              </Dialog.Title>
              <form onSubmit={handleSubmit(submitHandler)} className="mt-2">
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Tahun</label>
                  <select
                    {...register('tahun', { required: 'Silahkan pilih Tahun.' })}
                    onChange={e => setYear(Number(e.target.value))}
                    name="tahun"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value={0}>Silahkan Pilih</option>
                    {Array.from(new Array(21), (list, index) => (
                      <option key={index} value={selectedYear + index}>
                        {selectedYear + index}
                      </option>
                    ))}
                  </select>
                  {errors.tahun && <p className="mt-1 text-xs text-red-500">{errors.tahun.message}</p>}
                </div>

                <div className="mt-5 sm:col-span-6">
                  <Controller
                    control={control}
                    name={'file_name'}
                    rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
                    render={({ field: { onChange, value } }) => (
                      <UploadWrapper
                        allowedTypes={['xlsx', 'xls']}
                        handleUploadChange={(files: FileObject[]) => {
                          console.log(files);
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
                              <div className="text-sm text-gray-600">{value || 'File Kompetensi'}</div>
                              <div className="text-xs text-gray-400">(xlsx, xls)</div>
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
                    Tambah
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

export default FormLogHarianPPNPN;
