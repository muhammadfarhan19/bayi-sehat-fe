import { Dialog, Transition } from '@headlessui/react';
import { UploadIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { JenisBerkas } from '../../../../../constants/Resource';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import AutoComplete from '../../../../shared/Input/ComboBox';
import UploadWrapper, { FileObject } from '../../../../shared/Input/UploadWrapper';

interface FormState {
  nama_berkas: string;
  jenis_berkas: string;
}

interface UploadFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedId?: string;
}

export default function UploadForm(props: UploadFormProps) {
  const { open, setOpen, selectedId } = props;
  const [file, setFile] = React.useState<FileObject | undefined>();
  const [load, setLoad] = React.useState<boolean>(selectedId ? false : true);
  const personalData = usePersonalData();

  const { control, register, setValue } = useForm<FormState>({
    defaultValues: {
      jenis_berkas: JenisBerkas.others,
    },
  });

  React.useEffect(() => {
    if (selectedId) {
      setValue('nama_berkas', 'KTP');
      setValue('jenis_berkas', JenisBerkas.ktp);
      setLoad(true);
    }
  }, [selectedId]);

  const toggleModal = () => {
    setOpen(!open);
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
                <Dialog.Title className="flex justify-between">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {selectedId ? 'Ubah' : 'Tambah'} Arsip Digital
                  </h3>
                  <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
                </Dialog.Title>
                <div className="mt-2">
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
                  {load ? (
                    <>
                      <div className="mt-5 sm:col-span-6">
                        <label htmlFor="nama_berkas" className="block text-sm font-medium text-gray-700">
                          Nama Berkas
                        </label>
                        <div className="mt-1">
                          <input
                            {...register('nama_berkas')}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            name="nama_berkas"
                            type="text"
                          />
                        </div>
                      </div>

                      <div className="mt-5 sm:col-span-6">
                        <Controller
                          name="jenis_berkas"
                          render={({ field: { onChange, value } }) => (
                            <AutoComplete
                              onChange={value => {
                                onChange(value.value);
                              }}
                              label={'Jenis Berkas'}
                              defaultValue={{ text: value, value: value }}
                              options={Object.keys(JenisBerkas).map(each => {
                                const key = each as keyof typeof JenisBerkas;
                                return {
                                  text: JenisBerkas[key],
                                  value: JenisBerkas[key],
                                };
                              })}
                            />
                          )}
                          control={control}
                        />
                      </div>

                      <div className="mt-5 sm:col-span-6">
                        <UploadWrapper
                          allowedTypes={['pdf']}
                          handleUploadChange={(files: FileObject[]) => {
                            setFile(files[0]);
                          }}
                          uploadHandler={() => Promise.resolve({ id: '1' })}
                        >
                          {({ loading }) => (
                            <div className="flex items-center justify-between border-[1px] p-3">
                              <div>
                                <div className="text-sm text-gray-600">{file?.name || 'Bukti Arsip'}</div>
                                <div className="text-xs text-gray-400">(Pdf)</div>
                              </div>
                              <button
                                disabled={loading}
                                type="button"
                                className="inline-flex items-center rounded border border-green-300 bg-white px-2.5 py-1.5 text-xs font-medium text-green-700 shadow-sm hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:text-gray-300"
                              >
                                <UploadIcon className="mr-1 h-4" />
                                Upload
                              </button>
                            </div>
                          )}
                        </UploadWrapper>
                      </div>
                    </>
                  ) : null}
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    className="w-full rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={toggleModal}
                  >
                    Tambah
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
