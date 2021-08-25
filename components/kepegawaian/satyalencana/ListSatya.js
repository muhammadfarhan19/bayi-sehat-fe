import { useEffect, useState } from 'react';
import {useGetLencana} from '../../shared/fetcher/kepegawaian/FetcherKepegawaian'

export default function ListSatya() {
    const getList = useGetLencana();
    const [satya,setSatya] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const getSatya = await getList();
                setSatya(getSatya)
            } catch (e) {
                console.log(e)
            }
        })();
    }, []);
    

    return (
        <>
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
                    </dl>

                    <div className="rounded-lg bg-white shadow border-b border-gray-200 mb-3">
                        <div className="flex ">
                            <div className="-my-2 overflow-x-auto sm:mx-0 ">
                                <div className="py-2 align-start inline-block min-w-full sm:px-0 lg:px-0">
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="w-full rounded-lg bg-gray-100 table-fixed">
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
                                                        NIP
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
                                                        Masa Kerja
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {satya.map((satya, satyaIdx) => (
                                                    <tr
                                                        key={satyaIdx}
                                                        className={
                                                            satyaIdx % 2 === 0
                                                                ? "bg-white hover:bg-gray-100"
                                                                : "bg-gray-50 hover:bg-gray-100"
                                                        }
                                                    >
                                                        <td className="w-10 px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {satyaIdx+1}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {satya.nip}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900 truncate">
                                                            {satya.nama}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {satya.masa_kerja}
                                                        </td>
                                                        
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}