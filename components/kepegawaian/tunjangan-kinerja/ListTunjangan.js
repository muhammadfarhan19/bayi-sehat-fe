import React, { useEffect, useState } from 'react';
import { useGetTukin } from '../../shared/fetcher/kepegawaian/FetcherKepegawaian';
import Modal from "./modal/Modal";

export default function ListTunjangan() {

    const getList = useGetTukin();
    const [tunjangan,setTunjangan] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const getTunjangan = await getList();
                setTunjangan(getTunjangan)
            } catch (e) {
                console.log(e)
            }
        })();
    }, []);

    const [open, setOpen] = React.useState(false);

    const openModal = () => {
        setOpen(true)
    }

    const closeModal = (data) => { 
        setOpen(data);
      };

    return (
        <>

            {open && <Modal close={closeModal}  />}

            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-2-title">

                    <dl className="mb-3 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-1 md:divide-y-0 md:divide-x">
                        <div className="grid md:grid-cols-3 px-4 sm:p-6 gap-4">
                            <div className="w-full col-span-2 self-center flex">
                                <dt className="text-lg font-medium text-gray-900">
                                    Rekap Capaian Pegawai
                                </dt>
                            </div>
                            <div class="w-full pb-2 flex justify-end">

                                <button
                                    type="button"
                                    onClick={openModal}
                                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 float-left" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Transaksi
                                </button>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="-my-2 overflow-x-auto sm:mx-0 ">
                                <div className="py-2 align-start inline-block min-w-full sm:px-0 lg:px-0">
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
                                                        kode
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        bulan
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Semester
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Aksi
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Sync
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tunjangan.map((tunjangan, tunjanganIdx) => (
                                                    <tr
                                                        key={tunjanganIdx}
                                                        className={
                                                            tunjanganIdx % 2 === 0
                                                                ? "bg-white hover:bg-gray-100"
                                                                : "bg-gray-50 hover:bg-gray-100"
                                                        }
                                                    >
                                                        <td className="w-10 px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {tunjanganIdx+1}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {tunjangan.kode}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900 truncate">
                                                            {tunjangan.bulan}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {tunjangan.semester}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            <button
                                                                type="button"
                                                                className="mx-2 py-1 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 "
                                                            >
                                                                Master Pegawai
                                                            </button>

                                                            <button
                                                                type="button"
                                                                className="mx-2 py-1 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 "
                                                            >
                                                                Rekap
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="mx-2 py-1 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 "
                                                            >
                                                                Resume
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="mx-2 py-1 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                                                            >
                                                                Tukin
                                                            </button>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            <button
                                                                type="button"
                                                                className="mx-2 py-1 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 "
                                                            >
                                                                Sync
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
                    </dl>
                </section>
            </div>
        </>
    )
}