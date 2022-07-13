import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React from 'react';

interface DownloadJadwal {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function JadwalDinas(props: DownloadJadwal) {
  const { open, setOpen } = props;
  const toggleView = () => setOpen(!open);

  return (
    <Transition appear show={open} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={toggleView}>
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
            <div className="my-8 inline-block w-full max-w-md transform rounded-md bg-white p-4 text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="div" className="flex justify-between">
                <h5 className="text-lg font-medium text-gray-900">Download Jadwal</h5>
                <XIcon className="h-5 cursor-pointer" onClick={toggleView} />
              </Dialog.Title>
              <div>
                <p className="text-[12px] font-normal leading-8 text-gray-900">Periode Jadwal</p>

                <div className="flex flex-col">
                  <div className="flex flex-row justify-between space-x-5">
                    <p className="mb-2 flex-1 text-[10px] font-normal text-gray-900"> Dari Tanggal</p>
                    <p className=" mb-2 flex-1  text-[10px]  font-normal text-gray-900"> Sampai Tanggal</p>
                  </div>

                  <div className="flex flex-row space-x-5">
                    <input
                      autoFocus={true}
                      className="block w-full flex-1 rounded-md border-gray-300 shadow-sm sm:text-sm"
                      type="date"
                    />
                    <input
                      className="block w-full flex-1 rounded-md border-gray-300 shadow-sm sm:text-sm"
                      type="date"
                    />
                  </div>
                </div>

                <div className="my-3 ml-1">
                  <p className="text-[10px] font-normal text-red-500">Catatan :</p>
                  <p className="text-[10px]  font-normal text-red-500">*Periode download maksimal 3 bulan</p>
                </div>

                <div className="flex justify-end">
                  <button className="flex rounded-[4px] bg-indigo-600 px-3 py-2 text-sm font-medium text-white focus:outline-none">
                    Download
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
