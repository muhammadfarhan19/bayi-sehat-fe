import { useEffect, useState } from "react";

export default function ListPangkat() {
    const [tahun, setTahun] = useState([]);
    const [bulan, setBulan] = useState([]);

    const stats = [
        {
            name: "Kekurangan Pegawai",
            stat: "10",
            changeType: "increase",
        },
        {
            name: "Jabatan Struktural Tersedia",
            stat: "20",
            changeType: "increase",
        },
        {
            name: "Jabatan Fungsional Tersedia",
            stat: "30",
            changeType: "decrease",
        },
    ];

    const kepangkatan = [
        {
            no: "1",
            nip: "196612251987022001",
            nama: "AAN SRIWIDAYATI",
            unit: "SEKRETARIAT DIREKTORAT JENDERAL PENDIDIKAN TINGGI",
            gol: "III/d",
            tmt: "2017-04-01, 25 thn 2 bln",
        },
        {
            no: "2",
            nip: "196612251987022001",
            nama: "AHMAD TAUFIK",
            unit: "SEKRETARIAT DIREKTORAT JENDERAL PENDIDIKAN TINGGI",
            gol: "III/b",
            tmt: "2017-04-01, 25 thn 2 bln",
        },
        {
            no: "3",
            nip: "196612251987022001",
            nama: "DEWI RATIH",
            unit: "SEKRETARIAT DIREKTORAT JENDERAL PENDIDIKAN TINGGI",
            gol: "III/d",
            tmt: "2017-04-01, 25 thn 2 bln",
        },
    ];

    useEffect(() => {
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
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-2-title">

                    <dl className="mb-3 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-1 md:divide-y-0 md:divide-x">
                        <div className="px-4 sm:p-6">
                            <dt className="text-lg font-medium text-gray-900">
                                Monitoring data kenaikan pangkat Jabatan Fungsional Umum
                            </dt>
                        </div>
                        <div className="grid md:grid-cols-4 py-2 px-6 gap-4">
                            <div class="w-full pb-2">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Tahun</label>
                                <select className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option value="0">Semua</option>
                                    {tahun.map((data) => (
                                        <option value={data}>{data}</option>
                                    ))}
                                </select>
                            </div>
                            <div class="w-full pb-2">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Bulan</label>
                                <select className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    {bulan.map((data, i) => (
                                        <>
                                            <option value={data} selected={i === new Date().getMonth()}>{data}</option>
                                        </>
                                    ))}
                                </select>
                            </div>
                            <div class="w-full pb-2 col-span-2">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Unit Kerja</label>
                                <select className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-300 disabled:opacity-50" disabled>
                                    <option value="">Sekretariat Direktorat Jenderal Pendidikan Tinggi</option>
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
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                                                        Unit Kerja
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Golongan
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        TMT, MK AWAL
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {kepangkatan.map((kepangkatan, kepangkatanIdx) => (
                                                    <tr
                                                        key={kepangkatanIdx}
                                                        className={
                                                            kepangkatanIdx % 2 === 0
                                                                ? "bg-white hover:bg-gray-100"
                                                                : "bg-gray-50 hover:bg-gray-100"
                                                        }
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {kepangkatan.no}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {kepangkatan.nip}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900 truncate">
                                                            {kepangkatan.nama}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {kepangkatan.unit}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {kepangkatan.gol}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {kepangkatan.tmt}
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