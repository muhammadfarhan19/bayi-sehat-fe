import { useRouter } from 'next/router';

const users = [
    {
        no: 1,
        nama: "Kipli",
        jabatan: "Ningrat",
        userGroup: "Admin",
    },
    {
        no: 2,
        nama: "Kipli lagi",
        jabatan: "Sekretaris Keraton Dikti",
        userGroup: "Super Admin",
    },
    {
        no: 3,
        nama: "Lagi lagi Kipli",
        jabatan: "Sultan Temanggung",
        userGroup: "Pegawai",
    },
]

export default function userList() {
    const router = useRouter();
    return (
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-2-title">
                <button
                    type="button"
                    onClick={() => router.push('manajemen-user/tambah-pengguna')}
                    className="inline-flex mb-2 items-center px-4 py-2 border-2 border-white-600 shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 sm:text-sm"
                >
                    Tambah
              </button>
                <div className="rounded-lg bg-white shadow border-b border-gray-200 mb-3">
                    <div className="overflow-x-auto sm:mx-0 ">
                        <div className="py-2 align-start inline-block min-w-full sm:px-0 lg:px-0">
                            <table className="w-full rounded-lg bg-gray-100">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            No
                                    </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama
                                    </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama Jabatan
                                    </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Grup Pengguna
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, userIdx) => (
                                        <tr
                                            key={userIdx}
                                            className={
                                                userIdx % 2 === 0
                                                    ? "bg-white hover:bg-gray-100"
                                                    : "bg-gray-50 hover:bg-gray-100"
                                            }
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                {user.no}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                {user.nama}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                                {user.jabatan}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900 truncate">
                                                {user.userGroup}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}