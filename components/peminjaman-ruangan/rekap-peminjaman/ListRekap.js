import { AdjustmentsIcon, CalendarIcon } from '@heroicons/react/outline';
import moment from 'moment';
import * as React from 'react';
import config from '../../../utils/Config';
import { request } from '../../shared/fetcher/FetcherHooks';

export default function ListRekap() {
    const [showAdvancedFilter, setshowAdvancedFilter] = React.useState(true);
    const [data, setData] = React.useState([])

    function toggleAdvancedFilter() {
        setshowAdvancedFilter(!showAdvancedFilter);
    }

    React.useEffect(() => {
        (async () => {
            try {
                const getData = await request(config.apiHost + '/peminjaman-ruangan-rekap', '', 'get', true);
                setData(getData.responseData.data)
            } catch (e) {
                console.log(e)
            }
        })();
    }, []);

    return (
        <div className="grid grid-cols-1 lg:col-span-4">
            <section aria-labelledby="section-2-title">

                <dl className="mb-2 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-1 md:divide-y-0 md:divide-x">
                    <div className="flex align-center mb-3 pt-3 px-6 pt-6">
                        <div className="text-lg font-medium text-gray-900 my-auto">
                            Kelola Peminjaman
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
                    </div>

                    {showAdvancedFilter ? (
                        <div className="grid grid-cols-4 gap-2 px-6 py-4">
                            <div className="pr-1">
                                <label className="block text-gray-700 text-sm mb-2"> Nama Ruangan</label>
                                <select className="appearance-none block w-full px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option value="">Semua</option>
                                </select>
                            </div>

                            <div className="px-1">
                                <label className="block text-gray-700 text-sm mb-2"> Tanggal Peminjaman</label>
                                <select className="appearance-none block w-full px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option value="">Semua</option>
                                </select>
                            </div>

                            <div className="px-1">
                                <label className="block text-gray-700 text-sm mb-2"> Status Pengajuan</label>
                                <select className="appearance-none block w-full px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option value="">Semua</option>
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
                                    <table className="w-full mt-4 overflow-visible rounded-lg bg-gray-100 table-auto">
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
                                                    Ruangan
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Tgl Peminjaman
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Waktu Peminjaman
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Nama PJ
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
                                                    Unit Kerja
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    No HP
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Kegiatan
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Jumlah Peserta
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Kebutuhan Fasilitas
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Undangan Rapat
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.length > 0 ? (
                                                <>
                                                    {data.map((data, idx) => (
                                                        <tr className="text-center bg-white hover:bg-gray-100">
                                                            <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                                {idx+1}
                                                            </td>
                                                            <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                                {data.ruangan}
                                                            </td>
                                                            <td className="px-6 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">
                                                              
                                                                {moment(data?.tangganl_peminjamam).format("DD/MM/YYYY")}
                                                            </td>
                                                            <td className="px-6 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">
                                                                {moment(data?.jam_mulai).format("H:m:s")} - {moment(data?.jam_selesai).format("H:m:s")}
                                                            </td>
                                                            <td className="px-6 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">
                                                                {data.nama_pic}
                                                            </td>
                                                            <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                                {data.nip}
                                                            </td>
                                                            <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                                {data.unit_kerja}
                                                            </td>
                                                            <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                                {data.nomor_telepon}
                                                            </td>
                                                            <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                                {data.kegiatan}
                                                            </td>
                                                            <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                                {data.jumlah_peserta}
                                                            </td>
                                                            <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                                {data.kebutuhan_fasilitas}
                                                            </td>
                                                            <td className="px-6 py-4 text-xs font-medium text-blue-800">
                                                                {data.undangan_rapat}
                                                            </td>

                                                            
                                                         
                                                        </tr>
                                                        
                                                    ))}

                                                </>
                                            ) : (
                                                <tr className="text-center bg-white hover:bg-gray-100">
                                                    <td className="px-6 py-4 text-xs font-medium text-gray-900" colSpan="12">
                                                        Data tidak ditemukan
                                                    </td>
                                                </tr>
                                            )}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </dl>
            </section>
        </div>
    )
}