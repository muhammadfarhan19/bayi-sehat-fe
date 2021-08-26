export default function ListPosisi() {
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

    const jabatans = [
        {
            nama: "Arsiparis Ahli Pertama",
            kelas: "8",
            terisi: "0",
            dibutuhkan: "1",
            kode: "JF-38",
        },
        {
            nama: "Arsiparis Penyelia",
            kelas: "8",
            terisi: "0",
            dibutuhkan: "1",
            kode: "JF-39",
        },
        {
            nama: "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            kelas: "8",
            terisi: "0",
            dibutuhkan: "3",
            kode: "JF-40",
        },
        {
            nama: "Pranata SDM Aparatur Penyelia",
            kelas: "8",
            terisi: "0",
            dibutuhkan: "1",
            kode: "JF-41",
        },
        {
            nama: "Analis Anggaran Ahli Pertama",
            kelas: "8",
            terisi: "0",
            dibutuhkan: "1",
            kode: "JF-42",
        },
        {
            nama: "Pranata Keuangan APBN Mahir",
            kelas: "8",
            terisi: "0",
            dibutuhkan: "1",
            kode: "JF-43",
        },
        {
            nama: "Penata Laksana Barang Mahir",
            kelas: "8",
            terisi: "0",
            dibutuhkan: "1",
            kode: "JF-44",
        },
        {
            nama: "Analis Perencanaan",
            kelas: "7",
            terisi: "0",
            dibutuhkan: "0",
            kode: "JA-53",
        },
        {
            nama: "Analis Penegakan Integritas dan Disiplin Sumber Daya Manusia Aparatur",
            kelas: "7",
            terisi: "0",
            dibutuhkan: "0",
            kode: "JA-54",
        },
        {
            nama: "Analis Perencanaan Sumber Daya Manusia Aparatur",
            kelas: "7",
            terisi: "0",
            dibutuhkan: "0",
            kode: "JA-55",
        },
        {
            nama: "Analis Kebijakan Barang Milik Negara(1)",
            kelas: "7",
            terisi: "0",
            dibutuhkan: "0",
            kode: "JA-56",
        },
        {
            nama: "Penyusun Program, Anggaran, dan Laporan(1)",
            kelas: "7",
            terisi: "0",
            dibutuhkan: "0",
            kode: "JA-57",
        },
        {
            nama: "Penyusun Informasi dan Publikasi(1)",
            kelas: "7",
            terisi: "0",
            dibutuhkan: "0",
            kode: "JA-58",
        },
        {
            nama: "Penyusun Program dan Anggaran(1)",
            kelas: "7",
            terisi: "0",
            dibutuhkan: "0",
            kode: "JA-59",
        },
        {
            nama: "Penelaah Kebijakan Pengadaan Barang/Jasa(1)",
            kelas: "7",
            terisi: "0",
            dibutuhkan: "0",
            kode: "JA-60",
        },
        {
            nama: "Penyusun Publikasi dan Informasi(1)",
            kelas: "7",
            terisi: "0",
            dibutuhkan: "0",
            kode: "JA-61",
        },
        {
            nama: "Analis Media dan Jurnalistik(1)",
            kelas: "7",
            terisi: "0",
            dibutuhkan: "0",
            kode: "JA-62",
        },
        {
            nama: "Bendahara Pengeluaran(1)",
            kelas: "7",
            terisi: "0",
            dibutuhkan: "0",
            kode: "JA-63",
        },
        {
            nama: "Penyusun Bahan Kerjasama Pelatihan",
            kelas: "7",
            terisi: "1",
            dibutuhkan: "0",
            kode: "JA-64",
        },
        {
            nama: "Pranata SDM Aparatur Mahir",
            kelas: "7",
            terisi: "0",
            dibutuhkan: "1",
            kode: "JF-106",
        },
        {
            nama: "Arsiparis Mahir",
            kelas: "7",
            terisi: "0",
            dibutuhkan: "1",
            kode: "JF-107",
        },
        {
            nama: "Analis Kerugian Negara",
            kelas: "7",
            terisi: "0",
            dibutuhkan: "4",
            kode: "JA-65",
        },
        {
            nama: "Analis Barang Milik Negara",
            kelas: "7",
            terisi: "4",
            dibutuhkan: "4",
            kode: "JA-66",
        },
        {
            nama: "Penyusun Bahan Informasi dan Publikasi",
            kelas: "7",
            terisi: "2",
            dibutuhkan: "2",
            kode: "JA-67",
        },
        {
            nama: "Penyusun Rancangan Perundang-Undangan",
            kelas: "7",
            terisi: "1",
            dibutuhkan: "3",
            kode: "JA-68",
        },
        {
            nama: "Penyusun Bahan Bantuan Hukum",
            kelas: "7",
            terisi: "0",
            dibutuhkan: "3",
            kode: "JA-69",
        },
        {
            nama: "Penyusun Laporan Keuangan",
            kelas: "7",
            terisi: "2",
            dibutuhkan: "4",
            kode: "JA-70",
        },
        {
            nama: "Analis Organisasi",
            kelas: "7",
            terisi: "0",
            dibutuhkan: "2",
            kode: "JA-71",
        },
        {
            nama: "Analis Jabatan",
            kelas: "7",
            terisi: "0",
            dibutuhkan: "2",
            kode: "JA-72",
        },
        {
            nama: "Analis Sumber Daya Manusia Aparatur",
            kelas: "7",
            terisi: "1",
            dibutuhkan: "3",
            kode: "JA-73",
        },
        {
            nama: "Analis Kerja Sama",
            kelas: "7",
            terisi: "1",
            dibutuhkan: "4",
            kode: "JA-74",
        },
        {
            nama: "Bendahara",
            kelas: "7",
            terisi: "1",
            dibutuhkan: "1",
            kode: "JA-75",
        },
        {
            nama: "Analis Perencanaan, Evaluasi dan Pelaporan",
            kelas: "7",
            terisi: "1",
            dibutuhkan: "3",
            kode: "JA-76",
        },
        {
            nama: "Analis Pengembangan Sarana dan Prasarana",
            kelas: "7",
            terisi: "0",
            dibutuhkan: "2",
            kode: "JA-77",
        },
        {
            nama: "Analis Sistem Informasi dan Jaringan",
            kelas: "7",
            terisi: "0",
            dibutuhkan: "4",
            kode: "JA-78",
        },
        {
            nama: "Penyusun Rencana Kegiatan dan Anggaran",
            kelas: "7",
            terisi: "5",
            dibutuhkan: "6",
            kode: "JA-79",
        },
        {
            nama: "Analis Data dan Informasi",
            kelas: "7",
            terisi: "4",
            dibutuhkan: "5",
            kode: "JA-80",
        },
        {
            nama: "Penata Laksana Barang Terampil",
            kelas: "7",
            terisi: "0",
            dibutuhkan: "1",
            kode: "JF-108",
        },
        {
            nama: "Pengelola Data",
            kelas: "6",
            terisi: "0",
            dibutuhkan: "0",
            kode: "JA-109",
        },
        {
            nama: "Pengolah Data Peraturan Perundang-Undangan(1)",
            kelas: "6",
            terisi: "0",
            dibutuhkan: "0",
            kode: "JA-110",
        },
        {
            nama: "Ajudan",
            kelas: "6",
            terisi: "0",
            dibutuhkan: "1",
            kode: "JA-111",
        },
        {
            nama: "Pengolah Informasi Media",
            kelas: "6",
            terisi: "0",
            dibutuhkan: "0",
            kode: "JA-112",
        },
        {
            nama: "Pengolah Data Mutasi Jabatan Fungsional Dosen(1)",
            kelas: "6",
            terisi: "0",
            dibutuhkan: "0",
            kode: "JA-113",
        },
        {
            nama: "Penyiap Usul Tanda Jasa dan Penghargaan(1)",
            kelas: "6",
            terisi: "0",
            dibutuhkan: "0",
            kode: "JA-114",
        },
        {
            nama: "Pengelola Sarana dan Prasarana Kantor",
            kelas: "6",
            terisi: "1",
            dibutuhkan: "1",
            kode: "JA-115",
        },
        {
            nama: "Pengolah Data dan Informasi(1)",
            kelas: "6",
            terisi: "0",
            dibutuhkan: "0",
            kode: "JA-116",
        },
        {
            nama: "Pengolah Surat Permintaan Pembayaran(1)",
            kelas: "6",
            terisi: "0",
            dibutuhkan: "0",
            kode: "JA-117",
        },
        {
            nama: "Pengolah Data Ketatalaksanaan(1)",
            kelas: "6",
            terisi: "0",
            dibutuhkan: "0",
            kode: "JA-118",
        },
        {
            nama: "Pengolah Data",
            kelas: "6",
            terisi: "3",
            dibutuhkan: "4",
            kode: "JA-119",
        },
        {
            nama: "Pengelola Surat",
            kelas: "6",
            terisi: "0",
            dibutuhkan: "2",
            kode: "JA-120",
        },
        {
            nama: "Pengelola Kepegawaian",
            kelas: "6",
            terisi: "1",
            dibutuhkan: "2",
            kode: "JA-121",
        },
        {
            nama: "Pengelola Data Tata Organisasi dan Tata Laksana",
            kelas: "6",
            terisi: "1",
            dibutuhkan: "3",
            kode: "JA-122",
        },
        {
            nama: "Pengelola Peraturan Perundang-Undangan",
            kelas: "6",
            terisi: "1",
            dibutuhkan: "1",
            kode: "JA-123",
        },
        {
            nama: "Pengolah Data Laporan Keuangan",
            kelas: "6",
            terisi: "1",
            dibutuhkan: "3",
            kode: "JA-124",
        },
        {
            nama: "Pengelola Barang Milik Negara",
            kelas: "6",
            terisi: "1",
            dibutuhkan: "3",
            kode: "JA-125",
        },
        {
            nama: "Pengelola Keuangan",
            kelas: "6",
            terisi: "2",
            dibutuhkan: "3",
            kode: "JA-126",
        },
        {
            nama: "Verifikator Keuangan",
            kelas: "6",
            terisi: "0",
            dibutuhkan: "4",
            kode: "JA-127",
        },
        {
            nama: "Pengelola Data Pelaksanaan Program dan Anggaran",
            kelas: "6",
            terisi: "1",
            dibutuhkan: "3",
            kode: "JA-128",
        },
        {
            nama: "Pengolah Data Penganggaran",
            kelas: "6",
            terisi: "1",
            dibutuhkan: "3",
            kode: "JA-129",
        },
        {
            nama: "Sekretaris",
            kelas: "6",
            terisi: "1",
            dibutuhkan: "3",
            kode: "JA-130",
        },
        {
            nama: "Pengelola Informasi Kerjasama",
            kelas: "6",
            terisi: "0",
            dibutuhkan: "3",
            kode: "JA-131",
        },
        {
            nama: "Pranata SDM Aparatur Terampil",
            kelas: "6",
            terisi: "0",
            dibutuhkan: "2",
            kode: "JF-161",
        },
        {
            nama: "Teknisi Sarana dan Prasarana",
            kelas: "5",
            terisi: "0",
            dibutuhkan: "5",
            kode: "JA-163",
        },
        {
            nama: "Pengadministrasi Persuratan",
            kelas: "5",
            terisi: "1",
            dibutuhkan: "4",
            kode: "JA-164",
        },
        {
            nama: "Pengadministrasi Kepegawaian",
            kelas: "5",
            terisi: "1",
            dibutuhkan: "5",
            kode: "JA-165",
        },
        {
            nama: "Penata Laporan Keuangan",
            kelas: "5",
            terisi: "0",
            dibutuhkan: "0",
            kode: "JA-166",
        },
        {
            nama: "Pengadministrasi Program dan Kerjasama",
            kelas: "5",
            terisi: "0",
            dibutuhkan: "2",
            kode: "JA-167",
        },
        {
            nama: "Penata Dokumen Keuangan(1)",
            kelas: "5",
            terisi: "0",
            dibutuhkan: "0",
            kode: "JA-168",
        },
        {
            nama: "Pengadministrasi Data Peraturan Perundang - Undangan",
            kelas: "5",
            terisi: "0",
            dibutuhkan: "2",
            kode: "JA-169",
        },
        {
            nama: "Pengadministrasi Barang Milik Negara",
            kelas: "5",
            terisi: "1",
            dibutuhkan: "2",
            kode: "JA-170",
        },
        {
            nama: "Pengadministrasi Keuangan",
            kelas: "5",
            terisi: "0",
            dibutuhkan: "6",
            kode: "JA-171",
        },
        {
            nama: "Pengadministrasi Anggaran",
            kelas: "5",
            terisi: "0",
            dibutuhkan: "2",
            kode: "JA-172",
        },
        {
            nama: "Pengadministrasi Umum",
            kelas: "5",
            terisi: "0",
            dibutuhkan: "3",
            kode: "JA-173",
        },
        {
            nama: "Pengadministrasi Sarana dan Prasarana",
            kelas: "5",
            terisi: "0",
            dibutuhkan: "1",
            kode: "JA-174",
        },
        {
            nama: "Petugas Keamanan",
            kelas: "3",
            terisi: "4",
            dibutuhkan: "4",
            kode: "JA-182",
        },
    ];

    return (
        <>
            <div className="grid grid-cols-1 gap-4 lg:col-span-4">
                <section aria-labelledby="section-2-title">
                   
                    <dl className="mb-3 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
                        {stats.map((item) => (
                            <div key={item.name} className="px-4 sm:p-6">
                                <dt className="text-base font-normal text-gray-900">
                                    {item.name}
                                </dt>
                                <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                                    <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                                        {item.stat}
                                    </div>
                                </dd>
                            </div>
                        ))}
                    </dl>

                    <div className="rounded-lg bg-white shadow border-b border-gray-200 mb-3">
                        <div className="flex ">
                            <div className="-my-2 overflow-x-auto sm:mx-0 ">
                                <div className="py-2 align-start inline-block min-w-full sm:px-0 lg:px-0">
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="w-full rounded-lg bg-gray-100">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Kode
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Kelas
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Nama Jabatan
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Jenis
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Terisi
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Dibutuhkan
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {jabatans.map((jabatan, jabatanIdx) => (
                                                    <tr
                                                        key={jabatanIdx}
                                                        className={
                                                            jabatanIdx % 2 === 0
                                                                ? "bg-white hover:bg-gray-100"
                                                                : "bg-gray-50 hover:bg-gray-100"
                                                        }
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {jabatan.kode}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {jabatan.kelas}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900 truncate">
                                                            {jabatan.nama}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            Struktural
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {jabatan.terisi}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                            {jabatan.dibutuhkan}
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