import { useEffect, useState } from "react";

export default function ListPensiun() {

    const [tahun, setTahun] = useState([]);

    const pensiun = [
        {
            no: "1",
            nip: "196710012001121002",
            nama: "WAHYU PUJIATMOKO",
            gol: "III/d, 2014-10-01",
            pensiun: "2021-01-01",
        },
        {
            no: "2",
            nip: "196710012001121002",
            nama: "WAHYU PUJIATMOKO",
            gol: "III/d, 2014-10-01",
            pensiun: "2021-01-01",
        },
        {
            no: "3",
            nip: "196612251987022001",
            nama: "WAHYU PUJIATMOKO",
            gol: "III/d, 2014-10-01",
            pensiun: "2021-01-01",
        },
    ];

    useEffect(() => {
        getYear()
    }, []);

    const getYear = () => {
        for (let i = 2021; i >= 2010; i--) {
            setTahun(state => [...state, i])
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-4 lg:col-span-3">
                <section aria-labelledby="section-2-title">

                    <dl className="mb-3 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-1 md:divide-y-0 md:divide-x">
                        <div className="px-4 sm:p-6">
                            <dt className="text-lg font-medium text-gray-900">
                                Data pensiun
                            </dt>
                        </div>
                        <div className="grid md:grid-cols-4 pb-2 px-6 gap-4">
                            <div class="w-full pb-2 ">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Pilih tahun pensiun</label>
                                <select className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    {tahun.map((data, i) => (
                                        <option value={data} selected={i === new Date().getFullYear()}>{data}</option>
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
                                                        GOLONGAN, TMT
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Tanggal Pensiun
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {pensiun.map((pensiun, pensiunIdx) => (
                                                    <tr
                                                        key={pensiunIdx}
                                                        className={
                                                            pensiunIdx % 2 === 0
                                                                ? "bg-white hover:bg-gray-100"
                                                                : "bg-gray-50 hover:bg-gray-100"
                                                        }
                                                    >
                                                        <td className="w-10 px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {pensiun.no}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {pensiun.nip}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900 truncate">
                                                            {pensiun.nama}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {pensiun.gol}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {pensiun.pensiun}
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