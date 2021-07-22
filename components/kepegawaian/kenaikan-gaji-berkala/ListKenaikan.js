export default function ListKenaikan() {

    const kgb = [
        {
            no: "1",
            nip: "196710012001121002",
            nama: "WAHYU PUJIATMOKO",
            gol: "II/b",
            mk_awal: "2014-10-01, 17th 9bln",
            mk_baru: "2014-10-01, 17th 0bln",
            status: "Belum Berhak",
        },
        {
            no: "2",
            nip: "196710012001121002",
            nama: "WAHYU PUJIATMOKO",
            gol: "II/b",
            mk_awal: "2014-10-01, 17th 9bln",
            mk_baru: "2014-10-01, 17th 0bln",
            status: "Belum Berhak",
        },
        {
            no: "3",
            nip: "196612251987022001",
            nama: "WAHYU PUJIATMOKO",
            gol: "II/b",
            mk_awal: "2014-10-01, 17th 9bln",
            mk_baru: "2014-10-01, 17th 0bln",
            status: "Belum Berhak",
        },
    ];

    return (
        <>
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-2-title">

                    <dl className="mb-3 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-1 md:divide-y-0 md:divide-x">
                        <div className="px-4 sm:p-6">
                            <dt className="text-lg font-medium text-gray-900">
                                Monitoring Data KGB
                            </dt>
                        </div>
                        <div className="grid md:grid-cols-4 pb-2 px-6 gap-4">
                            <div class="w-full pb-2 ">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Unit Kerja</label>
                                <select className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option value="">SETDITJEN DIKTI</option>
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
                                                        Gol
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        TMT, MK AWAL
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        TMT, MK BARU
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {kgb.map((kgb, kgbIdx) => (
                                                    <tr
                                                        key={kgbIdx}
                                                        className={
                                                            kgbIdx % 2 === 0
                                                                ? "bg-white hover:bg-gray-100"
                                                                : "bg-gray-50 hover:bg-gray-100"
                                                        }
                                                    >
                                                        <td className="w-10 px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {kgb.no}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {kgb.nip}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900 truncate">
                                                            {kgb.nama}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {kgb.gol}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {kgb.mk_awal}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {kgb.mk_baru}
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