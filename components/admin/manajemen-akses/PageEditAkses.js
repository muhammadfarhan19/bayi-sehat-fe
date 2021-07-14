const akses = [
    {
        id: 1,
        nama: "Lihat Menu Kepegawaian",
    },
    {
        id: 2,
        nama: "Lihat Menu Keuangan",
    },
    {
        id: 2,
        nama: "Lihat Absen",
    },
];

export default function PageEditAkses() {
    return (
        <div className="col-span-2">
            <div className="rounded-lg bg-white shadow border-b border-gray-200 p-5 mb-3">
                <div className="flex mb-3">
                    <div className="text-lg font-medium">Admin TU</div>
                </div>
                <hr />
                {akses.map((akses) => (
                    <div className="">
                        <div className="flex py-3">
                            <label className="" for={"akses-" + akses.id}>
                                {akses.nama}
                            </label>
                            <div className="ml-auto">
                                <input type="checkbox" id={"akses-" + akses.id} />
                            </div>
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    )
}