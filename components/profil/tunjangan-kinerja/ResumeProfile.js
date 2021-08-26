import React, { useEffect, useState } from 'react';
import { useGetTukin } from '../../shared/fetcher/kepegawaian/FetcherKepegawaian';
import Modal from "./modal/Modal";
import { useRouter } from 'next/router';

export default function ResumeProfile() {
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
                                    Resume Tunjangan Kinerja Juni 2021
                                </dt>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="-my-2 overflow-x-auto sm:mx-0 ">
                                <div className="py-2 align-start inline-block min-w-full sm:px-0 lg:px-0">
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="w-full rounded-lg table-fixed">
                                            <thead>
                                                <tr className="border-t border-b">
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        TOTAL HARI
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2"
                                                    >
                                                        6
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        DINAS SPPD
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        6
                                                    </td>
                                                </tr>
                                                <tr className="border-t border-b">
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Hari Kerja
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2"
                                                    >
                                                        9.4
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Dinas Non SPDD
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        0
                                                    </td>
                                                </tr>
                                                <tr className="border-t border-b">
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Libur
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2"
                                                    >
                                                        9.4
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Cuti Tahunan
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        0
                                                    </td>
                                                </tr>
                                                <tr className="border-t border-b">
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Hadir Kerja
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2"
                                                    >
                                                        9.4
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Cuti Sakit
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        0
                                                    </td>
                                                </tr>
                                                <tr className="border-t border-b">
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Hadir OK
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2"
                                                    >
                                                        9.4
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Cuti Alasan Penting
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        0
                                                    </td>
                                                </tr>
                                                <tr className="border-t border-b">
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Total Telat
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2"
                                                    >
                                                        9.4
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Cuti Besar
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2"
                                                    >
                                                        0
                                                    </td>
                                                </tr>
                                                <tr className="border-t border-b">
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Total Jam Telat
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2"
                                                    >
                                                        9.4
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Cuti Melahirkan
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2"
                                                    >
                                                        0
                                                    </td>
                                                </tr>
                                                <tr className="border-t border-b">
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Total SPW
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2"
                                                    >
                                                        9.4
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        CTLN
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2"
                                                    >
                                                        0
                                                    </td>
                                                </tr>
                                                <tr className="border-t border-b">
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Total Jam SPW
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2"
                                                    >
                                                        9.4
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Pengurangan TK
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2"
                                                    >
                                                        0
                                                    </td>
                                                </tr>
                                                <tr className="border-t border-b">
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Total Ijin Terlambat
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2"
                                                    >
                                                        9.4
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Pengurangan Cuti
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2"
                                                    >
                                                        0
                                                    </td>
                                                </tr>
                                                <tr className="border-t border-b">
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Total Ijin PSW
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2"
                                                    >
                                                        9.4
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Pengurangan Ijin
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2"
                                                    >
                                                        0
                                                    </td>
                                                </tr>
                                                <tr className="border-t border-b">
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Pengurangan Telat
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2"
                                                    >
                                                        9.4
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Pengurangan PSW
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2"
                                                    >
                                                        0
                                                    </td>
                                                </tr>
                                                <tr className="border-t border-b">
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Ijin Sakit
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2"
                                                    >
                                                        9.4
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Total Pengurang Kehadiran
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2"
                                                    >
                                                        0
                                                    </td>
                                                </tr>
                                                <tr className="border-t border-b">
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Ijin Masuk
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2"
                                                    >
                                                        9.4
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Uang Makan PNS
                                                    </td>
                                                    <td
                                                        scope="col"
                                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2"
                                                    >
                                                        Rp. 19.280.000,00
                                                    </td>
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