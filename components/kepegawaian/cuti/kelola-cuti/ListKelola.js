import { AdjustmentsIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import Modal from "./modal/Modal";
import config from '../../../../utils/Config'
import { request } from '../../../shared/fetcher/FetcherHooks';

export default function ListKelola() {
    const [showAdvancedFilter, setshowAdvancedFilter] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState(0);

    function toggleAdvancedFilter() {
        setshowAdvancedFilter(!showAdvancedFilter);
    }

    const daftar_cuti = [
        {
            nip: "0001002003004005",
            nama: "Joko Santosa, SE",
            deskripsi: "Pergi Belajar ke Jerman",
            unit_kerja: "SEKRETARIAT DIREKTORAT JENDERAL PENDIDIKAN TINGGI",
            jenis_cuti: "Cuti Alasan Penting",
            alasan: "Lagi Pengen Aja",
            tgl_mulai: "1 Januari 2023",
            tgl_selesai: "1 Maret 2023",
            no_telp: "08781231231",
            alamat: "Jl. in dulu aja yuk?",
            formulir: "-",
            lampiran: "-",
            status: 0,
        }, {
            nip: "0001002003004005",
            nama: "Joko Santosa, SE",
            deskripsi: "Pergi Belajar ke Jerman",
            unit_kerja: "SEKRETARIAT DIREKTORAT JENDERAL PENDIDIKAN TINGGI",
            jenis_cuti: "Cuti Alasan Penting",
            alasan: "Lagi Pengen Aja",
            tgl_mulai: "1 Januari 2023",
            tgl_selesai: "1 Maret 2023",
            no_telp: "08781231231",
            alamat: "Jl. in dulu aja yuk?",
            formulir: "Lihat",
            lampiran: "Lihat",
            status: -1,
        }, {
            nip: "0001002003004005",
            nama: "Joko Santosa, SE",
            deskripsi: "Pergi Belajar ke Jerman",
            unit_kerja: "SEKRETARIAT DIREKTORAT JENDERAL PENDIDIKAN TINGGI",
            jenis_cuti: "Cuti Alasan Penting",
            alasan: "Lagi Pengen Aja",
            tgl_mulai: "1 Januari 2023",
            tgl_selesai: "1 Maret 2023",
            no_telp: "08781231231",
            alamat: "Jl. in dulu aja yuk?",
            formulir: "Lihat",
            lampiran: "Lihat",
            status: 1,
        }
    ];

    const openModal = (tipe) => {
        setOpen(true)
        setType(tipe)
    }

    const closeModal = (data) => {
        setOpen(data);
    };

    const handle = async () => {
        try {
            const response = await request(config.apiHost + '/auth/getUser', '', 'get', true);
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <>

            {open && <Modal close={closeModal} tipe={type} />}
            
            <div className="grid grid-cols-1 gap-4 lg:col-span-3 transition duration-500 ease-in-out">
                <div className="bg-white rounded-md shadow">
                    <div className="flex alig-center mb-3 pt-3 px-5">
                        <div className="text-lg font-medium text-gray-900 my-auto">
                            Kelola Cuti
                        </div>
                        <div className="ml-auto my-auto flex">
                            <input
                                type="text"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Cari..."
                            />
                            <button
                                className="border border-gray-300 rounded-md ml-1 p-2 focus:outline-none focus:bg-gray-50 "
                                onClick={toggleAdvancedFilter}
                            >
                                <AdjustmentsIcon className="w-5  h-5 text-gray-400 animate-pulse "></AdjustmentsIcon>
                            </button>

                        </div>
                        <div className="flex">
                            <button className="focus:outline-none rounded-md p-2 text-sm border border-indigo-600 text-indigo-600 px-5 ml-1 hover:bg-gray-50" onClick={handle}> Tambah Cuti </button>
                        </div>
                    </div>


                    {showAdvancedFilter ? (
                        <div className="flex px-5 py-5">
                            <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                                <label
                                    htmlFor="nip"
                                    className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                                >
                                    NIP
                                </label>
                                <input
                                    type="text"
                                    name="nip"
                                    id="nip"
                                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                />
                            </div>
                            <div className="ml-2 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                                <label
                                    htmlFor="nama"
                                    className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                                >
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    name="nama"
                                    id="nama"
                                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                />
                            </div>
                            <div className="ml-2 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                                <label
                                    htmlFor="Unit Kerja"
                                    className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                                >
                                    Unit Kerja
                                </label>
                                <input
                                    type="text"
                                    name="Unit Kerja"
                                    id="Unit Kerja"
                                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                />
                            </div>
                            <div className="ml-2 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                                <label
                                    htmlFor="tgl_mulai"
                                    className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                                >
                                    Tgl. Mulai
                                </label>
                                <input
                                    type="date"
                                    name="tgl_mulai"
                                    id="tgl_mulai"
                                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                />
                            </div>
                            <div className="ml-2 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                                <label
                                    htmlFor="unit_kerja"
                                    className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                                >
                                    Tgl. Selesai
                                </label>
                                <input
                                    type="date"
                                    name="unit_kerja"
                                    id="unit_kerja"
                                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                />
                            </div>
                            <div className="ml-2 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                                <label
                                    htmlFor="unit_kerja"
                                    className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                                >
                                    Status
                                </label>
                                <input
                                    type="text"
                                    name="unit_kerja"
                                    id="unit_kerja"
                                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                />
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="flex ">
                        <div className="overflow-x-auto sm:mx-0 ">
                            <div className="py-2 overflow-visible  align-start inline-block min-w-full sm:px-0 lg:px-0">
                                <div className="overflow-visible border-b border-gray-200 sm:rounded-lg">
                                    <table className="rounded-lg bg-gray-100 table-auto" style={{ width: '1800px' }}>
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    No
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    NIP
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Nama
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Unit Kerja
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Jenis Cuti
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Alasan
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Tgl. Mulai
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Tgl. Selesai
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    No Telepon
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Alamat
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Formulir Pengajuan
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Lampiran
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Status Pengajuan
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {daftar_cuti.map((df_cuti, df_cutiIdx) => (
                                                <tr
                                                    key={df_cutiIdx}
                                                    className={
                                                        df_cutiIdx % 2 === 0
                                                            ? "bg-white hover:bg-gray-100"
                                                            : "bg-gray-50 hover:bg-gray-100"
                                                    }
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                        {df_cutiIdx + 1}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                        {df_cuti.nip}
                                                    </td>
                                                    <td className="px-6 whitespace-nowrap text-xs font-medium text-gray-900">
                                                        {df_cuti.nama}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                        {df_cuti.unit_kerja}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">
                                                        {df_cuti.jenis_cuti}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">
                                                        {df_cuti.alasan}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">
                                                        {df_cuti.tgl_mulai}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">
                                                        {df_cuti.tgl_selesai}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">
                                                        {df_cuti.no_telp}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">
                                                        {df_cuti.alamat}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">
                                                        {df_cuti.formulir !== '-' ? (
                                                            <button
                                                                type="button"
                                                                className="text-xs font-medium text-indigo-500 hover:text-indigo-700 focus:outline-none"
                                                            >
                                                                Lihat
                                                            </button>
                                                        ) : ('-')}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">
                                                        {df_cuti.lampiran !== '-' ? (
                                                            <button
                                                                type="button"
                                                                className="text-xs font-medium text-indigo-500 hover:text-indigo-700 focus:outline-none"
                                                            >
                                                                Lihat
                                                            </button>
                                                        ) : ('-')}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {df_cuti.status === 0 ? (
                                                            <button
                                                                type="button"
                                                                onClick={() => { openModal(0) }}
                                                                className="py-1 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                                                            >
                                                                Proses
                                                            </button>
                                                        ) : df_cuti.status === 1 ? (
                                                            <button
                                                                type="button"
                                                                onClick={() => { openModal(1) }}
                                                                className="text-xs font-medium text-green-500 hover:text-green-700 focus:outline-none"
                                                            >
                                                                Disetujui
                                                            </button>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                onClick={() => { openModal(-1) }}
                                                                className="text-xs font-medium text-red-500 hover:text-red-700 focus:outline-none"
                                                            >
                                                                Ditolak
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}