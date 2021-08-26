import React, { useEffect, useState } from 'react';
import { useGetTukin } from '../../shared/fetcher/kepegawaian/FetcherKepegawaian';
import Modal from "./modal/Modal";
import { useRouter } from 'next/router';

export default function TukinProfile() {
    const router = useRouter();

    return (
        <>
            <div className="grid grid-cols-1 gap-4 lg:col-span-4">
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
                                    Tunjangan Kinerja Juni 2021
                                </dt>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="-my-2 overflow-x-auto sm:mx-0 ">
                                <div className="py-2 align-start inline-block min-w-full sm:px-0 lg:px-0">
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="w-full rounded-lg table-fixed">

                                            <tr class="border-b">
                                                <td
                                                    scope="col"
                                                    className="w-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                                                >
                                                    Pengurang Kehadiran (A)
                                                </td>
                                                <td
                                                    scope="col"
                                                    className="w-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                                                >
                                                    6
                                                </td>
                                            </tr>
                                            <tr class="border-b">
                                                <td
                                                    scope="col"
                                                    className="w-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                                                >
                                                    Kehadiran A1 = (100-A)*100%
                                                </td>
                                                <td
                                                    scope="col"
                                                    className="w-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                                                >
                                                    9.4
                                                </td>
                                            </tr>
                                            <tr class="border-b">
                                                <td
                                                    scope="col"
                                                    className="w-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                                                >
                                                    Capaian Individu
                                                </td>
                                                <td
                                                    scope="col"
                                                    className="w-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                                                >
                                                    93.97
                                                </td>
                                            </tr>
                                            <tr class="border-b">
                                                <td
                                                    scope="col"
                                                    className="w-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                                                >
                                                    Capaian B1 = B * 90%
                                                </td>
                                                <td
                                                    scope="col"
                                                    className="w-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                                                >
                                                    90
                                                </td>
                                            </tr>
                                            <tr class="border-b">
                                                <td
                                                    scope="col"
                                                    className="w-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                                                >
                                                    Pengali CPNS (L)
                                                </td>
                                                <td
                                                    scope="col"
                                                    className="w-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                                                >
                                                    1
                                                </td>
                                            </tr>
                                            <tr class="border-b">
                                                <td
                                                    scope="col"
                                                    className="w-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                                                >
                                                    Pengali TUBEL (M)
                                                </td>
                                                <td
                                                    scope="col"
                                                    className="w-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                                                >
                                                    1
                                                </td>
                                            </tr>
                                            <tr class="border-b">
                                                <td
                                                    scope="col"
                                                    className="w-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                                                >
                                                    Tunjangan Kinerja Sesuai Kelas Jabatan
                                                </td>
                                                <td
                                                    scope="col"
                                                    className="w-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                                                >
                                                    Tunjangan Kinerja Sesuai Kelas Jabatan
                                                </td>
                                            </tr>
                                            <tr class="border-b">
                                                <td
                                                    scope="col"
                                                    className="w-full px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase whitespace-nowrap"
                                                >
                                                    Tukin Transfer = (A1+B1)*L*M*0.01
                                                </td>
                                                <td
                                                    scope="col"
                                                    className="w-full px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase whitespace-nowrap"
                                                >
                                                    Rp. 4.704.320,00
                                                </td>
                                            </tr>
                                            

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