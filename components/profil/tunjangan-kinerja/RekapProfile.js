import React, { useEffect, useState } from 'react';
import { useGetTukin } from '../../shared/fetcher/kepegawaian/FetcherKepegawaian';
import Modal from "./modal/Modal";
import { useRouter } from 'next/router';

export default function RekapProfile() {
    const router = useRouter();

    return (
        <>
            <div className="grid grid-cols-1 gap-4 lg:col-span-3">
                <section aria-labelledby="section-2-title">

                    <dl className="mb-3 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-1 md:divide-y-0 md:divide-x">
                        <div className="grid md:grid-cols-1 px-4 sm:px-6 sm:pt-6 gap-4">
                            <div className="w-full col-span-2 self-center flex cursor-pointer" onClick={() => { router.push('/profil/keuangan/tunjangan-kinerja') }}>
                                <dt className="text-md font-sm text-gray-600 flex self-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 float-left flex self-center" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Kembali
                                </dt>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 px-4 sm:p-6 gap-4">

                            <div className="w-full col-span-2 self-center flex">
                                <dt className="text-lg font-medium text-gray-900">
                                    Rekap Tunjangan Kinerja
                                </dt>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="-my-2 overflow-x-auto sm:mx-0 ">
                                <div className="py-2 align-start inline-block min-w-full sm:px-0 lg:px-0">
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="w-full rounded-lg bg-gray-100 table-fixed">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        TANGGAL
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        SHIFT MASUK
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        SHIFT PULANG
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        MASUK
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        PULANG
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        DINAS
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        CUTI
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        IZIN
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
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