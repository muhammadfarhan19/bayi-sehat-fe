import { Dialog, Transition } from '@headlessui/react';
import { UploadIcon, XIcon } from '@heroicons/react/outline';
import React from 'react';

import { classNames } from '../../../../../utils/Components';

interface UploadFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedId?: string;
}

export default function DiklatForm(props: UploadFormProps) {
    const { open, setOpen, selectedId } = props;
    const toggleModal = () => {
        setOpen(!open);
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
                                    {selectedId ? 'Ubah' : 'Tambah'} Riwayat Diklat
                                </h3>
                                <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
                            </Dialog.Title>
                            <form>
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
                                            value={'196601211986012001'}
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
                                            value={'Widodo Arjuna'}
                                        />
                                    </div>
                                </div>
                                <div className='mt-5 sm:col-span-6'>
                                    <label htmlFor="jenis_diklat" className="block text-sm font-medium text-gray-700">
                                        Jenis Diklat/Pelatihan
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <select
                                            id="jenis_diklat"
                                            name="jenis_diklat"
                                            className="mt-1 block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option>Lorem Ipsum</option>
                                            <option>Lorem Ipsum</option>
                                            <option>Lorem Ipsum</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="mt-5 sm:col-span-6">
                                    <label htmlFor="nama_diklat" className="block text-sm font-medium text-gray-700">
                                        Nama Diklat/Pelatihan/Seminar
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                                            name="nama_diklat"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 sm:col-span-6">
                                    <label htmlFor="penyelenggara" className="block text-sm font-medium text-gray-700">
                                        Penyelenggara
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                                            name="penyelenggara"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 sm:col-span-6">
                                    <label htmlFor="no_sertifikat" className="block text-sm font-medium text-gray-700">
                                        No Sertifikat
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                                            name="no_sertifikat"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 sm:col-span-6">
                                    <label htmlFor="lokasi" className="block text-sm font-medium text-gray-700">
                                        Lokasi
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                                            name="lokasi"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 sm:col-span-6">
                                    <label htmlFor="tgl_awal_acara" className="block text-sm font-medium text-gray-700">
                                        Tanggal Awal Acara
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                                            name="tgl_awal_acara"
                                            type="date"
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 sm:col-span-6">
                                    <label htmlFor="tgl_akhir_acara" className="block text-sm font-medium text-gray-700">
                                        Tanggal Akhir Acara
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                                            name="tgl_akhir_acara"
                                            type="date"
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 sm:col-span-6">
                                    <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700">
                                        Keterangan
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                                            name="keterangan"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 sm:col-span-6">
                                    <div
                                        className={classNames(
                                            'flex items-center justify-between border-[1px] p-3',
                                        )}
                                    >
                                        <div>
                                            <div className="text-sm text-gray-600">{'Bukti SK'}</div>
                                            <div className="text-xs text-gray-400">(pdf)</div>
                                        </div>
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded border border-green-300 bg-white px-2.5 py-1.5 text-xs font-medium text-green-700 shadow-sm hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:text-gray-300"
                                        >
                                            <UploadIcon className="mr-1 h-4" />
                                            Upload
                                        </button>
                                    </div>
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
    )
}