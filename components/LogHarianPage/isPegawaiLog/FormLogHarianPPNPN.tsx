import { Dialog, Transition } from '@headlessui/react';
import { PlusCircleIcon, XIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedId?: number;
}

function FormLogHarianPPNPN(props: ModalProps) {
  const { open, setOpen } = props;
  const toggleModal = () => {
    setOpen(!open);
  };

  // const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<FormState>();
  const [moreComponentBox, setMoreComponentBox] = useState(1);

  const handleAddInput = () => {
    setMoreComponentBox(moreComponentBox + 1);
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
                <h3 className="text-lg font-medium leading-6 text-gray-900">Form Pengisian Log Harian</h3>
                <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
              </Dialog.Title>
              <form onSubmit={() => null}>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Selasa, 6 September 2022</label>
                  <div className="mt-5 sm:col-span-6">
                    <label htmlFor="nama" className="block text-xs font-medium text-gray-700">
                      Isi Log / Jurnal Harian
                    </label>
                    {Array.from({ length: moreComponentBox }).map(() => (
                      <div className="mt-1">
                        <input
                          // {...register('alasan_tolak', {
                          //   required: watch('status_klaim') == 3 ? 'Silahkan Masukkan Alasan tolak' : false,
                          // })}
                          className="inline-block h-24 w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                          name="alasan_tolak"
                          type="text"
                        />
                        {/* {errors.alasan_tolak && (
                            <p className="mt-1 text-xs text-red-500">{errors.alasan_tolak.message}</p>
                          )} */}
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-row items-center justify-between sm:col-span-6">
                    <div className="flex flex-1 border-t" />
                    <PlusCircleIcon onClick={handleAddInput} width={32} height={32} color="#163CAA" className="mx-2" />
                    <div className="flex flex-1 border-t" />
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Klaim
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
