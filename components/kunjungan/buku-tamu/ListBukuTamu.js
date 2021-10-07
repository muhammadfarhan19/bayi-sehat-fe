import * as React from 'react'
import { useRouter } from "next/router";
import { AdjustmentsIcon } from "@heroicons/react/solid";
import Modal from './modal/Modal';
import { request } from '../../shared/fetcher/FetcherHooks';
import config from '../../../utils/Config';
import moment from 'moment';

export default function ListBukuTamu() {
    const router = useRouter();
    const [showAdvancedFilter, setshowAdvancedFilter] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [result, setResult] = React.useState(false);
    const [type, setType] = React.useState(0);
    const [tamu, setTamu] = React.useState([]);
    const [dash, setDash] = React.useState([]);
    const [data, setData] = React.useState({});


    function toggleAdvancedFilter() {
        setshowAdvancedFilter(!showAdvancedFilter);
    }

    const refresh = (data) => {
        setResult(data)
        console.log(data)
    }

    const openModal = (tipe, nomor_kartu, nik, id) => {
        setData({
            status: tipe,
            nomor_kartu: nomor_kartu,
            nik: nik,
            id: id
        })
        setOpen(true)
        setResult(false)
        setType(tipe)
    }

    const closeModal = (data) => {
        setOpen(data);
    };

    React.useEffect(() => {
        (async () => {
            try {
                const getTamu = await request(config.apiHost + '/buku-tamu', '', 'get', true);
                const getDash = await request(config.apiHost + '/buku-tamu/hitung-dashboard', '', 'get', true);
                setTamu(getTamu.responseData.data)
                setDash(getDash.responseData.data)
            } catch (e) {
                console.log(e)
            }
        })();
    }, [result]);

    return (
        <>
            {open && <Modal close={closeModal} tipe={type} data={data} result={refresh} />}
            <div className="grid grid-cols-1 gap-4 lg:col-span-4">
                <section aria-labelledby="section-2-title">

                    <dl className="mb-3 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-1 md:divide-y-0 md:divide-x">
                        <div className="grid md:grid-cols-3 px-4 sm:px-6 sm:py-5 gap-4">
                            <div className="w-full col-span-2 self-center flex">
                                <dt className="text-lg font-medium text-gray-900">
                                    Dashboard
                                </dt>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 px-6 sm:pb-6 gap-5">
                            <div className="w-full bg-gray-100 rounded-xl p-6">
                                <dt className="text-sm font-small text-gray-600">
                                    Jumlah Tamu di Dalam Gedung
                                </dt>
                                <dt className="text-3xl font-medium pt-2 text-indigo-600">
                                    {dash[0]?.jmlh_tamu_dalam_gedung}
                                </dt>
                            </div>
                            <div className="w-full bg-gray-100 rounded-xl p-6">
                                <dt className="text-sm font-small text-gray-600">
                                    Jumlah Tamu Hari Ini
                                </dt>
                                <dt className="text-3xl font-medium pt-2 text-indigo-600">
                                    {dash[0]?.jmlh_tamu_hari_ini}
                                </dt>
                            </div>
                            <div className="w-full bg-gray-100 rounded-xl p-6">
                                <dt className="text-sm font-small text-gray-600">
                                    Jumlah Tamu Bulan Ini
                                </dt>
                                <dt className="text-3xl font-medium pt-2 text-indigo-600">
                                    {dash[0]?.jmlh_tamu_bulan_ini}
                                </dt>
                            </div>
                        </div>
                    </dl>
                </section>

                <div className="bg-white rounded-md shadow ">
                    <div className="flex align-center mb-3 pt-3 px-6 pt-6">
                        <div className="text-lg font-medium text-gray-900 my-auto">
                            Daftar Tamu Hari Ini
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
                            <button onClick={() => router.push('/kunjungan/buku-tamu/add')} className="inline-flex items-center px-3 focus:outline-none rounded-md p-2 bg-indigo-600 text-sm border border-indigo-600 text-white ml-1 hover:bg-indigo-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Data Tamu
                            </button>
                        </div>
                    </div>

                    {showAdvancedFilter ? (
                        <div className="grid grid-cols-4 gap-2 px-5 py-6">
                            <div className="pr-1">
                                <label className="block text-gray-700 text-sm mb-2"> Kartu Visitor</label>
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

                            <div className="px-1">
                                <label className="block text-gray-700 text-sm mb-2"> NIK</label>
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
                                    <table className={tamu?.length > 0 ? "w-full mt-4 overflow-visible rounded-lg bg-gray-100 table-auto" : "w-full mt-4 overflow-visible rounded-lg bg-gray-100 table-fixed"}>
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Status
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Kartu
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
                                                    NIK
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Jam Datang
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Jam Pulang
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
                                                    Status Perjanjian
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
                                            {tamu?.length > 0 ? (
                                                <>
                                                    {
                                                        tamu.map(
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
                                                                        {tamu.status === 'MENUNGGU' ?
                                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800 cursor-pointer" onClick={() => { openModal('MENUNGGU', tamu?.nomor_kartu, tamu?.nik, tamu?.id) }}>
                                                                                <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-blue-400" fill="currentColor" viewBox="0 0 8 8">
                                                                                    <circle cx={4} cy={4} r={3} />
                                                                                </svg>
                                                                                Menunggu
                                                                            </span>
                                                                            : tamu.status === 'MASUK' ?
                                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800 cursor-pointer" onClick={() => { openModal('MASUK', tamu?.nomor_kartu, tamu?.nik, tamu?.id) }}>
                                                                                    <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                                                                                        <circle cx={4} cy={4} r={3} />
                                                                                    </svg>
                                                                                    Masuk
                                                                                </span>
                                                                                : tamu.status === 'PULANG' ?
                                                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-yellow-100 text-yellow-800 cursor-pointer" onClick={() => { openModal('PULANG', tamu?.nomor_kartu, tamu?.nik, tamu?.id) }}>
                                                                                        <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-yellow-400" fill="currentColor" viewBox="0 0 8 8">
                                                                                            <circle cx={4} cy={4} r={3} />
                                                                                        </svg>
                                                                                        Pulang
                                                                                    </span>
                                                                                    : <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800 cursor-pointer" onClick={() => { openModal('BATAL', tamu?.nomor_kartu, tamu?.nik, tamu?.id) }}>
                                                                                        <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-gray-400" fill="currentColor" viewBox="0 0 8 8">
                                                                                            <circle cx={4} cy={4} r={3} />
                                                                                        </svg>
                                                                                        Batal
                                                                                    </span>
                                                                        }
                                                                    </td>
                                                                    <td className="w-10 px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                                        {tamu.nomor_kartu}
                                                                    </td>
                                                                    <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                                        {tamu.nama_tamu} <br />
                                                                        {tamu.asal_instansi}
                                                                    </td>
                                                                    <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                                        {tamu.nik}
                                                                    </td>
                                                                    <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                                        {tamu?.waktu_mulai}
                                                                    </td>
                                                                    <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                                        {tamu?.waktu_selesai}
                                                                    </td>
                                                                    <td className="text-indigo-800 px-6 py-4 text-xs font-medium text-gray-900">
                                                                        {tamu.nama_tujuan}
                                                                    </td>
                                                                    <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                                        {tamu.keperluan}
                                                                    </td>
                                                                    <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                                        {tamu.nomor_telepon}
                                                                    </td>
                                                                    <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                                        {tamu.alamat}
                                                                    </td>
                                                                    <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                                        {tamu.status_perjajian === 'YA' ? (
                                                                            'Dengan Perjanjian'
                                                                        ) : (
                                                                            'Tanpa Perjanjian'
                                                                        )}
                                                                    </td>
                                                                    <td className="px-6 py-4 text-xs font-medium text-indigo-800">
                                                                        <button
                                                                            onClick={() => router.push({
                                                                                pathname: '/kunjungan/buku-tamu/edit',
                                                                                query: { id: tamu?.id },
                                                                            })}
                                                                            className="inline-flex items-center px-2 focus:outline-none rounded-md p-1 text-sm border border-indigo-600 ml-1 hover:bg-gray-50"
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                    </td>

                                                                </tr>
                                                            )
                                                        )
                                                    }
                                                </>
                                            ) : (
                                                <tr className="text-center bg-white hover:bg-gray-100">
                                                    <td className="px-6 py-4 text-xs font-medium text-gray-900" colSpan="12">
                                                        Tidak ada tamu hari ini
                                                    </td>
                                                </tr>
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