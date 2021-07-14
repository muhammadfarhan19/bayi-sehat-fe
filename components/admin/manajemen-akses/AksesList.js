import Link from "next/link";

const AccessGroup = [
    {
        name: "Admin TU",
    },
    {
        name: "Staff TU",
    },
];

export default function AksesList() {
    return (
        <div className="col-span-2">
            <div className="rounded-lg bg-white shadow border-b border-gray-200 mb-3 p-5">
                <div className="flex mb-2">
                    <div className="text-lg font-medium ">Akses Grup </div>
                    <div className="  ml-auto">
                        <button className="bg-gray-600 py-2 px-5 rounded-lg  hover:bg-gray-700 text-white">
                            Tambah Akses Grup
                  </button>
                    </div>
                </div>
                <hr />
                {AccessGroup.map((akses, aksesId) => (
                    <div className="">
                        <div className="flex py-3">
                            <div className="my-auto">{akses.name}</div>
                            <div className="ml-auto">
                                <Link href="/admin/manajemen-akses/edit-akses">
                                    <button className="bg-gray-600 text-xs py-2 px-5 rounded-lg  hover:bg-gray-700 text-white">
                                        Lihat
                        </button>
                                </Link>
                            </div>
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    )

}
