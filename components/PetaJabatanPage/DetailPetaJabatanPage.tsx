import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'

export default function DetailPetaJabatanPage() {
    const dataTable = [
        {
            kelas: '8',
            nama_direktorat: 'Direktorat Jenderal Pembelajaran dan Kemahasiswaan',
            keterisian: '12',
            kebutuhan: '13',
            selisih: '-1'
        },
        {
            kelas: '8',
            nama_direktorat: 'Direktorat Jenderal Pembelajaran dan Kemahasiswaan',
            keterisian: '12',
            kebutuhan: '13',
            selisih: '-1'
        },
        {
            kelas: '8',
            nama_direktorat: 'Direktorat Jenderal Pembelajaran dan Kemahasiswaan',
            keterisian: '12',
            kebutuhan: '13',
            selisih: '-1'
        },
    ];

    const [open, setOpen] = React.useState(false)

    const Modal = () => {
        return (
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>


                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
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
                            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div>
                                    <div className="text-left ">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Perbaharui
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                        Keterisian Pegawai (B)
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            type="text"
                                                            name="first-name"
                                                            id="first-name"
                                                            autoComplete="given-name"
                                                            value={0}
                                                            disabled
                                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-200"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                        Selisih (+/-)
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            type="text"
                                                            name="last-name"
                                                            id="last-name"
                                                            autoComplete="family-name"
                                                            value={0}
                                                            disabled
                                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-200"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4">
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                        Kebutuhan Pegawai (K)
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            type="number"
                                                            name="first-name"
                                                            id="first-name"
                                                            autoComplete="given-name"
                                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                        onClick={() => setOpen(false)}
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        )
    }

    return (
        <>
            <Modal />
            <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className='flex flex-row gap-x-2 m-[24px] cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 my-auto" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                        <p className='my-auto text-[14px] font-normal' onClick={() => history.back()}>Kembali</p>
                    </div>
                </div>
                <p className='text-[24px] font-[600] text-gray-900 ml-[24px] mb-[24px]'>Arsiparis Ahli Pertama</p>
                <div className='overflow-x-auto'>
                    <div className="border-b border-gray-200 shadow sm:rounded-lg">
                        <table className="table-fixed rounded-lg bg-gray-100">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                    >
                                        No
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                    >
                                        Kelas
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                    >
                                        Nama Direktorat
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                    >
                                        Keterisian
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                    >
                                        Kebutuhan
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                    >
                                        Selisih
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                    >
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataTable.map((data, dataIdx) => (
                                    <tr
                                        key={dataIdx}
                                        className={dataIdx % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}
                                    >
                                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">{dataIdx + 1}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">
                                            {data.kelas}
                                        </td>
                                        <td
                                            className=" px-6 text-xs font-medium text-indigo-800 cursor-pointer"
                                            onClick={() => window.location.href = `/kepegawaian/peta-jabatan?jabatanId=${dataIdx + 1}&direktoratId=${dataIdx + 1}`}
                                        >
                                            {data.nama_direktorat}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">
                                            {data.keterisian}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">{data.kebutuhan}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">{data.selisih}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">
                                            <button
                                                type="button"
                                                className="text-xs px-[11px] py-[7px] rounded-md font-medium text-indigo-600 bg-white hover:text-white hover:bg-indigo-600 border-2 border-indigo-600 focus:outline-none"
                                                onClick={() => setOpen(true)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}