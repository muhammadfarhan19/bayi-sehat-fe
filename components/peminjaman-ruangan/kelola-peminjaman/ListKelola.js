import { AdjustmentsIcon, CalendarIcon } from '@heroicons/react/outline';
import * as React from 'react';
import config from '../../../utils/Config';
import { request } from '../../shared/fetcher/FetcherHooks';

export default function ListKelola() {
    const [showAdvancedFilter, setshowAdvancedFilter] = React.useState(true);
    const [data, setData] = React.useState([])

    function toggleAdvancedFilter() {
        setshowAdvancedFilter(!showAdvancedFilter);
    }

    React.useEffect(() => {
        (async () => {
            try {
                const getData = await request(config.apiHost + '/peminjaman-ruangan-kelola', '', 'get', true);
                console.log(getData)
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
                </dl>
            </section>

            <div className="w-full flex rounded-md bg-white shadow px-6 py-6">
                <div>
                    <p className="font-semibold text-2xl text-gray-500">1</p>
                </div>
                <div className="flex-col pl-10">
                    <p className="font-normal text-sm text-gray-500">Ruang VIP Lantai 2</p>
                    <div className="flex mt-2">
                        <CalendarIcon className="h-4 w-4 mr-1 my-auto text-gray-500" />
                        <p className="font-normal text-sm my-auto text-gray-500">10 Jul 2021</p>

                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-500 h-4 w-4 ml-9 mr-1 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="font-normal text-sm my-auto text-gray-500">09:00 - 10:00</p>
                    </div>
                    <div className="flex mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-500 h-4 w-4 mr-1 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        <p className="font-normal text-sm my-auto text-gray-500">Rapat Program Kompetisi Kampus Merdeka</p>
                    </div>
                    <div className="flex mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-500 h-4 w-4 mr-1 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <p className="font-normal text-sm my-auto text-gray-500">Joko Santosa</p>
                    </div>
                </div>
                <div className="ml-auto my-auto">
                    <button
                        className="inline-flex items-center bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600"
                    >
                        Proses
                    </button>
                </div>
            </div>
        </div>
    )
}