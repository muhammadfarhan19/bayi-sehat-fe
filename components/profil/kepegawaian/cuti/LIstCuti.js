import { AdjustmentsIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Modal from "./modal/Modal";
import { useRouter } from "next/router";

export default function ListCuti() {
    const router = useRouter();
    const [showAdvancedFilter, setshowAdvancedFilter] = useState(false);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(0);

    function toggleAdvancedFilter() {
        setshowAdvancedFilter(!showAdvancedFilter);
    }

    const cuti = [
        {
            jenis_cuti: 'Cuti Tahunan',
            tgl_mulai: '04 Sept 2021',
            tgl_selesai: '09 Sept 2021',
            alasan: 'Karena tidak ada yang pernah mengetahui takdir. Sudah sampai stasiun namun tertinggal dan harus pulang lagi',
            status: 0
        }, {
            jenis_cuti: 'Cuti Tahunan',
            tgl_mulai: '04 Sept 2021',
            tgl_selesai: '09 Sept 2021',
            alasan: 'Kangen kampung halaman',
            status: 1
        }, {
            jenis_cuti: 'Cuti Tahunan',
            tgl_mulai: '04 Sept 2021',
            tgl_selesai: '09 Sept 2021',
            alasan: 'Mau fokus jadi yutuber',
            status: -1
        }, {
            jenis_cuti: 'Cuti Tahunan',
            tgl_mulai: '04 Sept 2021',
            tgl_selesai: '09 Sept 2021',
            alasan: 'Mau harga BBM diturunkan',
            status: -3
        }
    ]

    const openModal = (tipe) => {
        setOpen(true)
        setType(tipe)
    }

    const closeModal = (data) => {
        setOpen(data);
    };

    return (
        <>
            {open && <Modal close={closeModal} tipe={type} />}
            <div className="grid grid-cols-1 gap-4 lg:col-span-4">
                <section aria-labelledby="section-2-title">

                    <dl className="mb-3 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-1 md:divide-y-0 md:divide-x">
                        <div className="grid md:grid-cols-3 px-4 sm:px-6 sm:py-5 gap-4">
                            <div className="w-full col-span-2 self-center flex">
                                <dt className="text-lg font-medium text-gray-900">
                                    Rincian Kuota Cuti
                                </dt>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 px-6 sm:pb-6 gap-5">
                            <div className="w-full bg-gray-100 rounded-xl p-6">
                                <dt className="text-sm font-small text-gray-600">
                                    Sisa kuota cuti tahunan
                                </dt>
                                <dt className="text-3xl font-medium pt-2 text-indigo-600">
                                    24 Hari
                                </dt>
                            </div>
                            <div className="w-full bg-gray-100 rounded-xl p-6">
                                <dt className="text-sm font-small text-gray-600">
                                    Cuti yang diambil tahun 2021
                                </dt>
                                <dt className="text-3xl font-medium pt-2 text-indigo-600">
                                    0 hari
                                </dt>
                            </div>
                            <div className="w-full bg-gray-100 rounded-xl p-6">
                                <dt className="text-sm font-small text-gray-600">
                                    Jumlah cuti yang sudah diambil
                                </dt>
                                <dt className="text-3xl font-medium pt-2 text-indigo-600">
                                    14 hari
                                </dt>
                            </div>
                        </div>
                    </dl>
                </section>
            </div>


            <div className="bg-white rounded-md shadow mt-4">
                <div className="flex align-center mb-3 pt-3 px-6 pt-6">
                    <div className="text-lg font-medium text-gray-900 my-auto">
                        Pengajuan Cuti
                    </div>
                    <div className="ml-auto my-auto flex">
                        <input
                            type="text"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Cari"
                        />

                        <button
                            className="border border-gray-300 rounded-md ml-1 p-2 focus:outline-none focus:bg-gray-50 "
                            onClick={toggleAdvancedFilter}
                        >
                            <AdjustmentsIcon className="w-5  h-5 text-gray-400 animate-pulse "></AdjustmentsIcon>
                        </button>
                    </div>
                    <div className="flex">
                        <button onClick={() => router.push('/profil/kepegawaian/cuti/pengajuan')} className="inline-flex items-center px-3 focus:outline-none rounded-md p-2 bg-indigo-600 text-sm border border-indigo-600 text-white ml-1 hover:bg-indigo-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Ajukan Cuti
                        </button>
                    </div>
                </div>

                {showAdvancedFilter ? (
                    <div className="grid grid-cols-6 px-5 py-6">
                        <div className="pr-1">
                            <label className="block text-gray-700 text-sm mb-2"> Pilih Tahun</label>
                            <select className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name="jenis_cuti">
                                <option value="">Silahkan Pilih</option>
                                <option value="1">Cuti Sakit</option>
                                <option value="1">Cuti Alasan Penting</option>
                            </select>
                        </div>

                        <div className="col-span-2 px-1">
                            <label className="block text-gray-700 text-sm mb-2"> Jenis Cuti</label>
                            <select className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name="jenis_cuti">
                                <option value="1">Sekretariat Direktorat</option>
                                <option value="2">Lorem Ipsum</option>
                            </select>
                        </div>

                        <div className="col-span-2 px-1">
                            <label className="block text-gray-700 text-sm mb-2"> Status Pengajuan</label>
                            <select className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name="jenis_cuti">
                                <option value="1">Sekretariat Direktorat</option>
                                <option value="2">Lorem Ipsum</option>
                            </select>
                        </div>

                    </div>
                ) : (
                    ""
                )}

                <div className="flex">
                    <div className="-my-2 overflow-x-auto sm:mx-0 ">
                        <div className="py-2 overflow-visible  align-start inline-block min-w-full sm:px-0 lg:px-0">
                            <div className=" overflow-visible border-b border-gray-200 sm:rounded-lg">
                                <table className="w-full mt-4 overflow-visible rounded-lg bg-gray-100 table-fixed">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="w-10 px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                            >
                                                No
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
                                                Tanggal Mulai
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                            >
                                                Tanggal Selesai
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                            >
                                                Alasan
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-center px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                            >
                                                Status Cuti
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cuti.map(
                                            (cuti, cutiIdx) => (
                                                <tr
                                                    key={cutiIdx}
                                                    className={
                                                        cutiIdx % 2 === 0
                                                            ? "bg-white hover:bg-gray-100"
                                                            : "bg-gray-50 hover:bg-gray-100"
                                                    }
                                                >
                                                    <td className="w-10 px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                        {cutiIdx + 1}
                                                    </td>
                                                    <td className="w-10 px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                        {cuti.jenis_cuti}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                        {cuti.tgl_mulai}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs font-medium text-gray-900 truncate">
                                                        {cuti.tgl_selesai}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                        {cuti.alasan}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                        {cuti.status === 0 ?
                                                            <div className="bg-indigo-100 py-1 rounded-md">
                                                                <label className="block text-indigo-800 text-sm text-center cursor-pointer" onClick={() => { openModal(0) }}> Diproses</label>
                                                            </div>
                                                            : cuti.status === 1 ?
                                                                <div className="bg-green-100 py-1 rounded-md">
                                                                    <label className="block text-green-800 text-sm text-center cursor-pointer" onClick={() => { openModal(1) }}> Diterima</label>
                                                                </div>
                                                                : cuti.status === -1 ?
                                                                    <div className="bg-red-100 py-1 rounded-md cursor-pointer">
                                                                        <label className="block text-red-800 text-sm text-center cursor-pointer" onClick={() => { openModal(-1) }}> Ditolak</label>
                                                                    </div>
                                                                    : <div className="bg-yellow-100 py-1 rounded-md">
                                                                        <label className="block text-yellow-800 text-sm text-center cursor-pointer" onClick={() => { openModal(-3) }}> Dibatalkan</label>
                                                                    </div>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}