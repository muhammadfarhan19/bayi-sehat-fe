import { AdjustmentsIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import Modal from "./modal/Modal";
import { useRouter } from 'next/router'
import config from '../../../../utils/Config'
import { request } from '../../../shared/fetcher/FetcherHooks';

export default function ListKelola() {
    const [showAdvancedFilter, setshowAdvancedFilter] = useState(true);
    const [data, setData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState(0);
    const [uuid, setUuid] = React.useState(0);

    const router = useRouter()

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

    const openModal = (tipe,id) => {
        setUuid(id)
        setOpen(true)
        setType(tipe)
    }

    const closeModal = (data) => {
        setOpen(data);
    };

    useEffect(() => {
        (async () => {
            try {
                const getData = await request(config.apiHost + '/cuti/manage', '', 'get', true);
                setData(getData.responseData.data)
            } catch (e) {
                console.log(e)
            }
        })();
    }, []);


    return (
        <>

            {open && <Modal close={closeModal} tipe={type} uuid={uuid} />}
            <div className="flex align-center mb-3 pt-3 px-6">
                <div className="text-lg font-medium text-gray-900 my-auto">
                    Pengajuan Cuti
                </div>
                <div className="ml-auto my-auto flex">
                    <input
                        type="text"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Cari..."
                    />
                    <button
                        className="border border-gray-300 rounded-md ml-1 p-2 focus:outline-none focus:bg-gray-50"
                        onClick={toggleAdvancedFilter}
                    >
                        <AdjustmentsIcon className="w-5  h-5 text-gray-400 animate-pulse "></AdjustmentsIcon>
                    </button>
                </div>
                <div className="flex">
                    <button onClick={() => router.push('/kepegawaian/cuti/pengajuan')} className="inline-flex items-center px-3 focus:outline-none rounded-md p-2 bg-indigo-600 text-sm border border-indigo-600 text-white ml-1 hover:bg-indigo-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Ajukan Cuti
                    </button>
                </div>
            </div>


            {showAdvancedFilter ? (
                <div className="grid grid-cols-6 px-5">
                    <div className="pr-1">
                        <label className="block text-gray-700 text-sm mb-2"> Jenis Cuti</label>
                        <select className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name="jenis_cuti">
                            <option value="">Silahkan Pilih</option>
                            <option value="1">Cuti Sakit</option>
                            <option value="1">Cuti Alasan Penting</option>
                        </select>
                    </div>

                    <div className="col-span-2 px-1">
                        <label className="block text-gray-700 text-sm mb-2"> Unit Kerja</label>
                        <select className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name="jenis_cuti">
                            <option value="1">Sekretariat Direktorat</option>
                            <option value="2">Lorem Ipsum</option>
                        </select>
                    </div>

                    <div className="px-1">
                        <label class="block text-gray-700 text-sm mb-2" for="username">Nama</label>
                        <input
                            type="text"
                            name="nama"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="px-1">
                        <label class="block text-gray-700 text-sm mb-2" for="username">Tgl Mulai</label>
                        <input
                            type="date"
                            name="nama"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
                        />
                    </div>

                    <div className="px-1">
                        <label class="block text-gray-700 text-sm mb-2" for="username">Tgl Mulai</label>
                        <input
                            type="date"
                            name="nama"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
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
                            <table className="rounded-lg bg-gray-100 table-auto" style={{ width: '1900px' }}>
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
                                    {data.map((df_cuti, df_cutiIdx) => (
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
                                                        onClick={() => { openModal(0,df_cuti.id) }}
                                                        className="py-1 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                                                    >
                                                        Proses
                                                    </button>
                                                ) : df_cuti.status === 1 ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => { openModal(1,df_cuti.id) }}
                                                        className="text-xs font-medium text-green-500 hover:text-green-700 focus:outline-none"
                                                    >
                                                        Disetujui
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => { openModal(-1,df_cuti.id) }}
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

        </>
    )
}