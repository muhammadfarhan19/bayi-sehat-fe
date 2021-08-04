import React, { useEffect, useState } from 'react';
import { useGetTukin } from '../../shared/fetcher/kepegawaian/FetcherKepegawaian';
import Modal from "./modal/Modal";
import { useRouter } from 'next/router';

export default function ListTunjangan() {
    const router = useRouter();
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

            <div className="grid grid-cols-1 gap-4 lg:col-span-3">
                <section aria-labelledby="section-2-title">

                    <dl className="mb-3 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-1 md:divide-y-0 md:divide-x">
                    <div className="px-4 sm:p-6">
                    <dt className="text-lg font-medium text-gray-900">
                        Daftar Pegawai Berhak Menerima Satyalancana Karya Satya
                            </dt>
                </div>
                <div className="grid md:grid-cols-4 pb-2 px-6 gap-4">
                    <div class="w-full pb-2">
                        <select className="appearance-none block w-full px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option value="10">10 Tahun</option>
                            <option value="20">20 Tahun</option>
                            <option value="30">30 Tahun</option>
                        </select>
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
                                                        NO
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        KODE
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        BULAN
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        SMTR
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        TUKIN TRANSFER
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Aksi
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
                                                            RP 20.000.000
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            <button
                                                                type="button"
                                                                onClick={() => router.push({
                                                                    pathname: '/profil/keuangan/rekap',
                                                                    query: { id: tunjangan.id },
                                                                })}
                                                                className="mx-2 py-1 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 "
                                                            >
                                                                Rekap
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => router.push({
                                                                    pathname: '/profil/keuangan/resume',
                                                                    query: { id: tunjangan.id },
                                                                })}
                                                                className="mx-2 py-1 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 "
                                                            >
                                                                Resume
                                                            </button>
                                                            <button
                                                                type="button"
                                                                type="button"
                                                                onClick={() => router.push({
                                                                    pathname: '/profil/keuangan/tukin',
                                                                    query: { id: tunjangan.id },
                                                                })}
                                                                className="mx-2 py-1 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                                                            >
                                                                Tukin
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