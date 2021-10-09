import * as React from 'react'
import { useRouter } from "next/router";
import { AdjustmentsIcon } from "@heroicons/react/solid";
import { request } from '../../shared/fetcher/FetcherHooks';
import config from '../../../utils/Config';
import moment from 'moment';

export default function ListRekapTamu() {
    const router = useRouter();
    const [showAdvancedFilter, setshowAdvancedFilter] = React.useState(false);
    const [tamu, setTamu] = React.useState([]);

    function toggleAdvancedFilter() {
        setshowAdvancedFilter(!showAdvancedFilter);
    }

    // const tamu = [
    //     {
    //         no: '1',
    //         tanggal: '10 Juli 2021',
    //         hari: 'Jumat',
    //         nama: 'Daniel',
    //         asal: 'Wakanda',
    //         nik: '123321456654',
    //         jam_datang: '11.00',
    //         jam_pulang: '12.00',
    //         tujuan: 'Yayat Hendayana, S.s.',
    //         keperluan: 'Rapat Koordinasi',
    //         hp: '08783141432',
    //         alamat: 'Cibinong',
    //         status_perjajian: 'Dengan Perjanjian',
    //         status: '1'
    //     },
    //     {
    //         no: '2',
    //         tanggal: '10 Juli 2021',
    //         hari: 'Jumat',
    //         nama: 'Daniel',
    //         asal: 'Wakanda',
    //         nik: '123321456654',
    //         jam_datang: '11.00',
    //         jam_pulang: '12.00',
    //         tujuan: 'Yayat Hendayana, S.s.',
    //         keperluan: 'Rapat Koordinasi',
    //         hp: '08783141432',
    //         alamat: 'Cibinong',
    //         status_perjajian: 'Dengan Perjanjian',
    //         status: '-1'
    //     }
    // ]

    React.useEffect(() => {
        (async () => {
            try {
                const getTamu = await request(config.apiHost + '/buku-tamu/rekap-tamu', '', 'get', true);
                console.log(getTamu)
                setTamu(getTamu.responseData.data)
            } catch (e) {
                console.log(e)
            }
        })();
    }, []);

    const getDays = (data) => {
        let hari = ''
        const day = moment(data).format("dddd")
        console.log(day)
        
        switch (day) {
            case 'Monday':
                hari = 'Senin'
                break
            case 'Tuesday':
                hari = 'Selasa'
                break
            case 'Wednesday':
                hari = 'Rabu'
                break
            case 'Thursday':
                hari = 'Kamis'
                break
            case 'Friday':
                hari = 'Jumat'
                break
            case 'Saturday':
                hari = 'Sabtu'
                break
            case 'Sunday':
                hari = 'Minggu'
                break
            default:
                hari = ''
        }

        return hari
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-4 lg:col-span-4">
                <div className="bg-white rounded-md shadow ">
                    <div className="flex align-center mb-3 pt-3 px-6 pt-6">
                        <div className="text-lg font-medium text-gray-900 my-auto">
                            Jadwal Kunjungan Tamu
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
                        <div className="grid grid-cols-4 gap-2 px-5 py-6">
                            <div className="pr-1">
                                <label className="block text-gray-700 text-sm mb-2"> Tanggal Awal</label>
                                <input
                                    type="date"
                                    name="c_password"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                />
                            </div>

                            <div className="px-1">
                                <label className="block text-gray-700 text-sm mb-2"> Tanggal Akhir</label>
                                <input
                                    type="date"
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
                                <label className="block text-gray-700 text-sm mb-2"> Asal Instansi</label>
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
                                    <table className="w-full mt-4 overflow-visible rounded-lg bg-gray-100 table-auto" style={{ width: '1900px' }}>
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
                                                    Tanggal
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Hari
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Nama
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                                >
                                                    Asal Instansi
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
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tamu.map(
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
                                                            {tamuIdx + 1}
                                                        </td>
                                                        <td className="w-10 px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {moment(tamu?.tanggal_kunjungan).format("D/M/Y")}
                                                        </td>
                                                        <td className="w-10 px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {getDays(tamu?.tanggal_kunjungan)}
                                                        </td>
                                                        <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                            {tamu.nama_tamu}
                                                        </td>
                                                        <td className="px-6 py-4 text-xs font-medium text-gray-900">
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
                                                            {tamu.tujuan}
                                                        </td>
                                                        <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                            {tamu.keperluan}
                                                        </td>
                                                        <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                            {tamu.nomor_telepon}
                                                        </td>
                                                        <td className="px-6 py-4 text-xs font-medium text-gray-900 tracking-wider">
                                                            {tamu.alamat}
                                                        </td>
                                                        <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                                            {tamu.status_perjanjian == 'YA' ? (
                                                                'Dengan Perjanjian'
                                                            ) : (
                                                                'Tanpa Perjanjian'
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 text-xs font-medium flex">
                                                            {tamu.status === 'KUNJUNGAN' ? (
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-800">
                                                                    Kunjungan
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
                                                                    Dibatalkan
                                                                </span>
                                                            )}
                                                        </td>

                                                    </tr>
                                                )
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