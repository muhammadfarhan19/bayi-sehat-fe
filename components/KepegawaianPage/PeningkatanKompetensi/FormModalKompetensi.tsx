import { Dialog, Transition } from '@headlessui/react';
import { UploadIcon, XIcon } from '@heroicons/react/outline';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { classNames } from '../../../utils/Components';
import { CircleProgress } from '../../shared/CircleProgress';
import UploadWrapper, { FileObject } from '../../shared/Input/UploadWrapper';

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
  const toggleModal = () => {
    setOpen(!open);
  };

  const {
    control,
    register,
    formState: { errors },
    setValue,
  } = useForm<FormState>();

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
              {/* <form onSubmit={}> */}
              <div className="mt-5 sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">Tahun</label>
                <select
                  {...register('tahun', { required: 'Silahkan pilih Tahun.' })}
                  name="jenjang_id"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value={''}>Silahkan Pilih</option>
                  <option value={'11'}>2022</option>
                  <option value={'1'}>2021</option>
                  <option value={'13'}>2020</option>
                  <option value={'2'}>2019</option>
                  <option value={'12'}>2018</option>
                  <option value={'3'}>2017</option>
                  <option value={'14'}>2016</option>
                  <option value={'15'}>2015</option>
                  <option value={'10'}>2014</option>
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
                            <div className="text-sm text-gray-600">{value || 'File Kompetensi'}</div>
                            <div className="text-xs text-gray-400">(csv)</div>
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
              {/* </form> */}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default FormLogHarianPPNPN;
