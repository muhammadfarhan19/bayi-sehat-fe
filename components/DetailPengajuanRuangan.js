/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CalendarIcon,
  ClockIcon,
  DocumentTextIcon,
  ExclamationIcon,
  PencilAltIcon,
  PlusIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";

export default function PengajuanRuangan() {
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  return (
    <>
      <div
        className="cursor-pointer bg-white my-1 rounded-2xl shadow p-5 text-sm grid grid-cols-7"
        onClick={() => setOpen(true)}
      >
        <div className="grid col-span-1 text-center">001</div>
        <div className="grid grid-cols-1 lg:grid-cols-3 col-span-6">
          <div className="md:col-span-3">
            <div className="font-medium mb-1">Ruangan 1</div>
          </div>
          <div className="grid">
            <div className="flex mb-1 text-xs ">
              <DocumentTextIcon className="h-4 w-4 mr-2" />
              <span className="my-auto">Kegiatan Lorem Ipsum</span>
            </div>
            <div className="flex mb-1 text-xs">
              <UserGroupIcon className="h-4 w-4 mr-2" />{" "}
              <span className="my-auto">Tata Usaha</span>{" "}
            </div>
          </div>
          <div className="grid ">
            <div className="flex mb-1 text-xs">
              <CalendarIcon className="h-4 w-4 mr-2" />{" "}
              <span className="my-auto">18 September 2021</span>{" "}
            </div>
            <div className="flex mb-1 text-xs">
              <ClockIcon className="h-4 w-4 mr-2" />{" "}
              <span className="my-auto">14:00 - 15:00</span>{" "}
            </div>
          </div>
          <div className="grid flex">
            <div className="text-white bg-red-600  text-xs rounded-xl text-center my-auto">
              Pengajuan Ditolak
            </div>
          </div>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed bg-gray-900 bg-opacity-30 backdrop-filter backdrop-blur-sm inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 hidden md:flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0  sm:h-10 sm:w-10">
                    <PencilAltIcon
                      className="h-6 w-6 text-indigo-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 mb-5 font-medium text-gray-900"
                    >
                      Formulir Pengajuan Peminjaman Ruangan
                    </Dialog.Title>
                    <div className="mt-2">
                      <form action="">
                        <div className=" relative mb-3 md:mb-6 flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                          <label
                            htmlFor="unitKerja"
                            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                          >
                            Nomor telepon PIC
                          </label>
                          <input
                            disabled
                            value="001002003004"
                            type="text"
                            name="unitKerja"
                            id="unitKerja"
                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                          />
                        </div>
                        <div className=" relative mb-3 md:mb-6 flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                          <label
                            htmlFor="unitKerja"
                            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                          >
                            Ruangan
                          </label>
                          <input
                            disabled
                            value="Ruangan 1"
                            type="text"
                            name="unitKerja"
                            id="unitKerja"
                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                          />
                        </div>
                        <div className=" relative mb-3 md:mb-6 flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                          <label
                            htmlFor="unitKerja"
                            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                          >
                            Tanggal peminjaman
                          </label>
                          <input
                            disabled
                            value="2021-12-01"
                            type="date"
                            name="unitKerja"
                            id="unitKerja"
                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className=" relative mb-3 md:mb-6 flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                            <label
                              htmlFor="unitKerja"
                              className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                            >
                              Jam mulai
                            </label>
                            <input
                              disabled
                              type="text"
                              value="12:00"
                              placeholder="00:00"
                              name="unitKerja"
                              id="unitKerja"
                              className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                            />
                          </div>
                          <div className=" relative mb-3 md:mb-6 flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                            <label
                              htmlFor="unitKerja"
                              className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                            >
                              Jam selesai
                            </label>
                            <input
                              disabled
                              type="text"
                              value="15:00"
                              placeholder="23:59"
                              name="unitKerja"
                              id="unitKerja"
                              className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div className=" relative mb-3 md:mb-6 flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                          <label
                            htmlFor="unitKerja"
                            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                          >
                            Nama kegiatan
                          </label>
                          <input
                            disabled
                            type="text"
                            value="Kegiatan Lorem Ipsum"
                            name="unitKerja"
                            id="unitKerja"
                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                          />
                        </div>

                        <div className=" relative mb-3 md:mb-6 flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                          <label
                            htmlFor="unitKerja"
                            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                          >
                            Jumlah peserta
                          </label>
                          <input
                            disabled
                            type="text"
                            value="8"
                            name="unitKerja"
                            id="unitKerja"
                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                          />
                        </div>

                        <div className=" relative mb-3 md:mb-6 flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                          <label
                            htmlFor="unitKerja"
                            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                          >
                            Kebutuhan fasilitas
                          </label>
                          <textarea
                            type="text"
                            disabled
                            value="Proyektor"
                            name="unitKerja"
                            id="unitKerja"
                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                          />
                        </div>
                        <div className=" relative mb-3 md:mb-6 flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                          <label
                            htmlFor="unitKerja"
                            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                          >
                            Dokumen pendukung
                          </label>
                          <input
                            disabled
                            type="file"
                            name="unitKerja"
                            id="unitKerja"
                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-xs"
                          />
                        </div>
                      </form>
                      <div className="mt-5 flex">
                       
                        <button
                          type="button"
                          className=" w-full  mb-2 text-xs inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white  font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-indigo-500 "
                          onClick={() => setOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Tutup
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
