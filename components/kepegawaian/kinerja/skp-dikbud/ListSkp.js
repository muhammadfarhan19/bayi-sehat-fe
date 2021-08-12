import { useEffect, useState } from "react";
import config from '../../../../utils/Config'
import { request } from '../../../shared/fetcher/FetcherHooks';

export default function ListPangkat() {
    const [tahun, setTahun] = useState([]);
    const [bulan, setBulan] = useState([]);
    const [skp,setSkp] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const getSkp = await request(config.apiHost + '/skp-dikbud', '', 'get', true);
                setSkp(getSkp.responseData)
            } catch (e) {
                console.log(e)
            }
        })();
        setBulan([])
        getYear()
        getMonth()
    }, []);

    const getYear = () => {
        for (let i = 2021; i >= 2010; i--) {
            setTahun(state => [...state, i])
        }
    }

    const getMonth = () => {
        const list = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        for (let i = 0; i < 12; i++) {
            setBulan(state => [...state, list[i]])
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-4 lg:col-span-3">
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
                                    type="submit"
                                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Download
                                </button>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-4 py-2 px-6 gap-4">
                            <div class="w-full pb-2 col-span-2">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Unit Kerja</label>
                                <select className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option value="">Setditjen Dikti</option>
                                </select>
                            </div>
                            <div class="w-full pb-2">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Bulan</label>
                                <select className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    {bulan.map((data, i) => (
                                        <>
                                            <option value={data} selected={i === new Date().getMonth()}>{data} 2021</option>
                                        </>
                                    ))}
                                </select>
                            </div>

                        </div>
                    </dl>

                    <div className="rounded-lg bg-white shadow border-b border-gray-200 mb-3">
                        <div className="flex ">
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
                                                        Jabatan
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Nilai
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {skp.map((skp, skpIdx) => (
                                                    <tr
                                                        key={skpIdx}
                                                        className={
                                                            skpIdx % 2 === 0
                                                                ? "bg-white hover:bg-gray-100"
                                                                : "bg-gray-50 hover:bg-gray-100"
                                                        }
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {skpIdx+1}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {skp.nip}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900 truncate">
                                                            {skp.nama}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {skp.nama_jabatan}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {skp.nilai}
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