import * as React from 'react'
import { useRouter } from "next/router";
import { AdjustmentsIcon } from "@heroicons/react/solid";
import Modal from './modal/Modal';

export default function ListJadwalTamu() {
    const router = useRouter();
    const [showAdvancedFilter, setshowAdvancedFilter] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState(0);

    function toggleAdvancedFilter() {
        setshowAdvancedFilter(!showAdvancedFilter);
    }

    const tamu = [
        {
            tanggal: 'Rabu, 15 Sep 2021',
            waktu: '09:00 - 12:00',
            nama: 'Daniel',
            asal: 'Wakanda',
            jam_datang: '11.00',
            jam_pulang: '12.00',
            tujuan: 'Yayat Hendayana, S.s.',
            keperluan: 'Rapat Koordinasi',
            hp: '08783141432',
            alamat: 'Cibinong'
        }, {
            tanggal: 'Rabu, 15 Sep 2021',
            waktu: '09:00 - 12:00',
            nama: 'Daniel',
            asal: 'Wakanda',
            jam_datang: '11.00',
            jam_pulang: '',
            tujuan: 'Yayat Hendayana, S.s.',
            keperluan: 'Rapat Koordinasi',
            hp: '08783141432',
            alamat: 'Cibinong'
        }, {
            tanggal: 'Rabu, 15 Sep 2021',
            waktu: '09:00 - 12:00',
            nama: 'Daniel',
            asal: 'Wakanda',
            jam_datang: '10.00',
            jam_pulang: '12.00',
            tujuan: 'Yayat Hendayana, S.s.',
            keperluan: 'Rapat Koordinasi',
            hp: '08783141432',
            alamat: 'Cibinong'
        }, {
            tanggal: 'Rabu, 15 Sep 2021',
            waktu: '09:00 - 12:00',
            nama: 'Daniel',
            asal: 'Wakanda',
            jam_datang: '11.00',
            jam_pulang: '13.00',
            tujuan: 'Yayat Hendayana, S.s.',
            keperluan: 'Rapat Koordinasi',
            hp: '08783141432',
            alamat: 'Cibinong'
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
                <div className="bg-white rounded-md shadow ">
                    <div className="flex align-center mb-3 pt-3 px-6 pt-6">
                        <div className="text-lg font-medium text-gray-900 my-auto">
                            Jadwal Kunjungan Tamu
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
                            <button onClick={() => router.push('/kunjungan/jadwal-kunjungan-tamu/add')} className="inline-flex items-center px-3 focus:outline-none rounded-md p-2 bg-indigo-600 text-sm border border-indigo-600 text-white ml-1 hover:bg-indigo-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Jadwal Kunjungan
                            </button>
                        </div>
                    </div>

                    {showAdvancedFilter ? (
                        <div className="grid grid-cols-4 gap-2 px-5 py-6">
                            <div className="pr-1">
                                <label className="block text-gray-700 text-sm mb-2"> Tanggal</label>
                                <input
                                    type="date"
                                    name="c_password"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                />
                            </div>

                            <div className="px-1">
                                <label className="block text-gray-700 text-sm mb-2"> Tujuan</label>
                                <input
                                    type="text"
                                    name="c_password"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                />
                            </div>

                            <div className="px-1">
                                <label className="block text-gray-700 text-sm mb-2"> Asal Instansi</label>
                                <input
                                    type="text"
                                    name="c_password"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                />
                            </div>

                            <div className="px-1">
                                <label className="block text-gray-700 text-sm mb-2"> Nama</label>
                                <input
                                    type="text"
                                    name="c_password"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                />
                            </div>

                        </div>
                    ) : (
                        ""
                    )}

                    <div className="flex">
                        <div className="-my-2 overflow-x-auto sm:mx-0 ">
                            <div className="py-2 overflow-visible  align-start inline-block min-w-full sm:px-0 lg:px-0">
                                <div className=" overflow-visible border-b border-gray-200 sm:rounded-lg">
                                    <table className="w-full mt-4 overflow-visible rounded-lg bg-gray-100 table-auto">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Tanggal
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Waktu
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Nama Tamu dan Asal
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Tujuan
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Keperluan
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
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tamu.map(
                                                (tamu, tamuIdx) => (
                                                    <tr
                                                        key={tamuIdx}
                                                        className={
                                                            tamuIdx % 2 === 0
                                                                ? "bg-white hover:bg-gray-100"
                                                                : "bg-gray-50 hover:bg-gray-100"
                                                        }
                                                    >
                                                        <td className="w-10 px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {tamu.tanggal}
                                                        </td>
                                                        <td className="w-10 px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {tamu.waktu}
                                                        </td>
                                                        <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                            {tamu.nama} <br />
                                                            {tamu.asal}
                                                        </td>
                                                        <td className="text-indigo-800 px-6 py-4 text-xs font-medium text-gray-900">
                                                            {tamu.tujuan}
                                                        </td>
                                                        <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                            {tamu.keperluan}
                                                        </td>
                                                        <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                            {tamu.hp}
                                                        </td>
                                                        <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                            {tamu.alamat}
                                                        </td>
                                                        <td className="px-6 py-4 text-xs font-medium flex">
                                                            <button onClick={() => router.push('/kunjungan/jadwal-kunjungan-tamu/edit')} className="inline-flex items-center px-3 focus:outline-none rounded-md bg-indigo-600 text-sm border border-indigo-600 text-white ml-1 hover:bg-indigo-700">
                                                                Edit
                                                            </button>
                                                            <button onClick={() => router.push('#')} className="inline-flex items-center px-2 ml-2 focus:outline-none rounded-md p-1 text-sm  text-red-500 border border-red-600 ml-1 hover:bg-red-50">
                                                                Hapus
                                                            </button>
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
            </div>



        </>
    )
}