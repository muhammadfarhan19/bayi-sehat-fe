import { AdjustmentsIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React from "react";

export default function MasterPns() {
    const router = useRouter()
    const [showAdvancedFilter, setshowAdvancedFilter] = React.useState(true);
    const toggleAdvancedFilter = () => {
        setshowAdvancedFilter(!showAdvancedFilter);
    }

    const dataTable = [
        {
            nama: "Widodo Arjuna",
            nip: "196601211986012001",
            unit_kerja: "DIREKTORAT SUMBER DAYA ",
            jabatan: "Jabatan Fungsional",
            disiplin: "Tidak di hukum",
            aktif: "Aktif",
            kum: "1",
        }, {
            nama: "Widodo Arjuna",
            nip: "196601211986012001",
            unit_kerja: "DIREKTORAT SUMBER DAYA ",
            jabatan: "Jabatan Fungsional",
            disiplin: "Tidak di hukum",
            aktif: "Aktif",
            kum: "1",
        }, {
            nama: "Widodo Arjuna",
            nip: "196601211986012001",
            unit_kerja: "DIREKTORAT SUMBER DAYA ",
            jabatan: "Jabatan Fungsional",
            disiplin: "Tidak di hukum",
            aktif: "Aktif",
            kum: "1",
        }
    ];

    return (
        <>
            <div className="px-6">
                <div className="py-6 flex flex-row">
                    <p className="text-lg font-medium text-gray-900">
                        Data Pegawai
                    </p>
                    <div className="flex ml-auto">
                        <input
                            type="text"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Cari..."
                        />
                        <button
                            className="border border-gray-300 rounded-md ml-1 p-2 focus:outline-none focus:bg-gray-50"
                            onClick={toggleAdvancedFilter}
                        >
                            <AdjustmentsIcon className="w-5  h-5 text-gray-400 animate-pulse" />
                        </button>
                        <div className="flex">
                            <button className="inline-flex items-center px-3 focus:outline-none rounded-md p-2 bg-indigo-600 text-sm border border-indigo-600 text-white ml-1 hover:bg-indigo-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Pegawai
                            </button>
                        </div>
                    </div>

                </div>

                {showAdvancedFilter &&
                    <div className="w-full flex flex-row gap-x-[16px]">
                        <div class="w-[202px] pb-2">
                            <p className="font-normal text-[14px] mb-[4px]">Unit Kerja</p>
                            <select className="appearance-none block w-full px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="10">Semua</option>
                                <option value="20">Lorem Ipsum</option>
                                <option value="30">Lorem Ipsum</option>
                            </select>
                        </div>
                        <div class="w-[202px] pb-2">
                            <p className="font-normal text-[14px] mb-[4px]">Nama</p>
                            <select className="appearance-none block w-full px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="10">Semua</option>
                                <option value="20">Lorem Ipsum</option>
                                <option value="30">Lorem Ipsum</option>
                            </select>
                        </div>
                        <div class="w-[202px] pb-2">
                            <p className="font-normal text-[14px] mb-[4px]">Tipe Jabatan</p>
                            <select className="appearance-none block w-full px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="10">Semua</option>
                                <option value="20">Lorem Ipsum</option>
                                <option value="30">Lorem Ipsum</option>
                            </select>
                        </div>
                        <div class="w-[202px] pb-2">
                            <p className="font-normal text-[14px] mb-[4px]">Nama Jabatan</p>
                            <select className="appearance-none block w-full px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="10">Semua</option>
                                <option value="20">Lorem Ipsum</option>
                                <option value="30">Lorem Ipsum</option>
                            </select>
                        </div>
                    </div>
                }
            </div>

            <div className="flex">
                <div className="my-[24px] overflow-x-auto sm:mx-0 ">
                    <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="w-full rounded-lg bg-gray-100 table-auto">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="w-10 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            No
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Nama
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            NIP
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Unit Kerja
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Jabatan
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Disiplin
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Aktif
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            KUM
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataTable.map((data, dataIdx) => (
                                        <tr
                                            key={dataIdx}
                                            className={
                                                dataIdx % 2 === 0
                                                    ? "bg-white hover:bg-gray-100"
                                                    : "bg-gray-50 hover:bg-gray-100"
                                            }
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                {dataIdx + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-indigo-800 cursor-pointer" onClick={()=>router.push(`/kepegawaian/data-pegawai?nip=${data.nip}`)}>
                                                {data.nama}
                                            </td>
                                            <td className="px-6 whitespace-nowrap text-xs font-medium text-gray-900">
                                                {data.nip}
                                            </td>
                                            <td className="px-6 whitespace-nowrap py-4 text-xs font-medium text-gray-900">
                                                {data.unit_kerja}
                                            </td>
                                            <td className="px-6 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">
                                                {data.jabatan}
                                            </td>
                                            <td className="px-6 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">
                                                {data.disiplin}
                                            </td>
                                            <td className="px-6 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">
                                                {data?.aktif}
                                            </td>
                                            <td className="px-6 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">
                                                {data?.kum}
                                            </td>
                                            <td className="px-6 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">
                                                <button
                                                    type="button"
                                                    className="text-xs font-medium text-indigo-500 hover:text-indigo-700 focus:outline-none"
                                                >
                                                    Lihat
                                                </button>
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