import ListBukuTamu from "../../components/kunjungan/buku-tamu/ListBukuTamu";
import MainLayout from "../../components/layouts/MainLayout";
import ModuleNavigation from "../../components/navigation/ModuleNavigation";
import ListKelola from "../../components/peminjaman-ruangan/kelola-peminjaman/ListKelola";

export default function PeminjamanRuangan() {
    const menu = [
        {
          name: "Kelola Peminjaman",
          href: "/peminjaman-ruangan/kelola-peminjaman",
          current: false,
        },
        {
          name: "Rekap Peminjaman",
          href: "/peminjaman-ruangan/rekap",
          current: false,
        },
        {
            name: "Pengajuan Peminjaman",
            href: "/peminjaman-ruangan/pengajuan-peminjaman",
            current: false,
          },
          {
            name: "Jadwal Ruangan",
            href: "/peminjaman-ruangan/jadwal-ruangan",
            current: false,
          },
    ]

    return (
        <MainLayout>
            <div className="w-full lg:px-4">
                <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-5 lg:gap-8">
                    <ModuleNavigation menu={menu} />
                    <ListKelola />
                </div>
            </div>
        </MainLayout>
    )
}