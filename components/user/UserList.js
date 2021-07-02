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
    return (
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

    )
}