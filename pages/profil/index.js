import MainLayout from "../../components/layouts/MainLayout";
import { Tab } from "@headlessui/react";
import Head from "next/head";

import ModuleNavigation from "../../components/navigation/ModuleNavigation";

const user = {
  name: "Rian Ardiana Prapanca",
  handle: "chelseahagon",
  email: "mantap@mail.me",
  role: "Web Developer",
  imageId: "1550525811-e5869dd03032",
  imageUrl:
    "https://dikti.kemdikbud.go.id/wp-content/uploads/2020/03/cropped-logo-dikbud.png",
};
import menu from "./menu"
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function DataDiriPegawai() {
  const data_pegawai = [
    {
      judul: "Unit kerja",
      deskripsi: "SEKRETARIAT DIREKTORAT JENDERAL PENDIDIKAN TINGGI",
    },
    {
      judul: "Nomor batch",
      deskripsi: "2914-00101",
    },
    {
      judul: "NIP / NIP lama",
      deskripsi: "196305071990022001 / 131878350",
    },
    {
      judul: "Tempat, tanggal lahir",
      deskripsi: "Sukabumi, 07-05-1963",
    },
    {
      judul: "Tanggal CPNS",
      deskripsi: "01-02-1990",
    },
    {
      judul: "Status Kepegawaian",
      deskripsi: "PNS",
    },
    {
      judul: "Jabatan",
      deskripsi: "Rangkap Jabatan",
    },
    {
      judul: "Golongan",
      deskripsi: "IV/c",
    },
    {
      judul: "Tanggal mulai golongan",
      deskripsi: "01-10-2017",
    },
    {
      judul: "Pangkat",
      deskripsi: "Pembina Utama Muda",
    },
    {
      judul: "Masa kerja",
      deskripsi: "27 tahun, 8 bulan",
    },
    {
      judul: "Status",
      deskripsi: "Aktif",
    },
    {
      judul: "Karpeg",
      deskripsi: "F 160772",
    },
  ];
  return (
    <table className="w-full">
      {data_pegawai.map((data) => (
        <tr className="border-b ">
          <td className="py-2 text-sm">{data.judul}</td>
          <td className="py-2 text-sm">{data.deskripsi}</td>
        </tr>
      ))}
    </table>
  );
}
function DataDiriPribadi() {
  const data_pribadi = [
    {
      judul: "Jenis Kelamin",
      deskripsi: "Perempuan",
    },
    {
      judul: "Status",
      deskripsi: "Menikah",
    },
    {
      judul: "Jumlah Anak",
      deskripsi: "3",
    },
    {
      judul: "Nomor Induk Kependudukan",
      deskripsi: "321001002003004",
    },
    {
      judul: "Email",
      deskripsi: "email@mail.me",
    },
    {
      judul: "Alamat",
      deskripsi: "Lorem",
    },
    {
      judul: "Nomor Pokok Wajib Pajak",
      deskripsi: "11.22.33.44.55.66.77",
    },
    {
      judul: "BPJS",
      deskripsi: "001002003004005",
    },
  ];
  return (
    <table className="w-full">
      {data_pribadi.map((data) => (
        <tr className="border-b ">
          <td className="py-2 text-sm">{data.judul}</td>
          <td className="py-2 text-sm">{data.deskripsi}</td>
        </tr>
      ))}
    </table>
  );
}
function RiwayatPendidikan() {
  const riwayat_pendidikan = [
    {
      jenjang: "S3",
      lembaga: "Universitas Brawijaya",
      prodi: "Ilmu Pertanian",
      tgl_lulus: "19-08-2016",
      no_ijazah: "001002003004005",
    },
    {
      jenjang: "S2",
      lembaga: "Universitas Brawijaya",
      prodi: "Ilmu Tanaman, Ilmu Pertanian",
      tgl_lulus: "13-02-2013",
      no_ijazah: "001002003004005",
    },
    {
      jenjang: "S1",
      lembaga: "Institut Pertanian Bogor",
      prodi: "Hama dan Penyakit Tumbuhan",
      tgl_lulus: "12-12-1987",
      no_ijazah: "001002003004005",
    },
  ];
  return (
    <div className="-my-2 overflow-x-auto sm:mx-0 ">
      <div className="py-2 align-start inline-block min-w-full sm:px-0 lg:px-0">
        <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="w-full rounded-lg table-auto text-sm">
            <thead className="bg-white min-w-full divide-y">
              <tr>
                <th
                  scope="col"
                  className=" py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                >
                  Jenjang
                </th>
                <th
                  scope="col"
                  className=" py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                >
                  Lembaga
                </th>
                <th
                  scope="col"
                  className=" py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                >
                  Program studi
                </th>
                <th
                  scope="col"
                  className=" py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                >
                  Tanggal lulus
                </th>
                <th
                  scope="col"
                  className=" py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                >
                  Nomor Ijazah
                </th>
                <th
                  scope="col"
                  className=" py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                >
                  Lampiran
                </th>
              </tr>
            </thead>
            <tbody>
              {riwayat_pendidikan.map((data) => (
                <tr className="border-b">
                  <td className="py-4 whitespace-nowrap">{data.jenjang}</td>
                  <td className="py-4 whitespace-nowrap">{data.lembaga}</td>
                  <td className="py-4 whitespace-nowrap">{data.prodi}</td>
                  <td className="py-4 whitespace-nowrap">{data.tgl_lulus}</td>
                  <td className="py-4 whitespace-nowrap">{data.no_ijazah}</td>
                  <td className="py-4 whitespace-nowrap"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TabBiodata() {
  const tabs = [
    { name: "Data Diri Pegawai", href: "#", current: true },
    { name: "Data Diri Pribadi", href: "#", current: false },
    { name: "Riwayat Pendidikan", href: "#", current: false },
  ];
  return (
    <div className="rounded-lg bg-white shadow px-4 py-5 border-b border-gray-200 sm:px-6 mb-3">
      <div className="mb-3">
        <Tab.Group vertical>
          <Tab.List className="mb-3">
            {tabs.map((tab) => (
              <Tab
                className={({ selected }) =>
                  selected
                    ? "border-indigo-500 text-indigo-600 whitespace-nowrap pb-2 px-3 border-b-2  text-sm focus:outline-none"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hitespace-nowrap pb-2 px-3 border-b-2  text-sm focus:outline-none"
                }
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className="active:outline-none">
              <DataDiriPegawai />
            </Tab.Panel>
            <Tab.Panel>
              <DataDiriPribadi />
            </Tab.Panel>
            <Tab.Panel>
              <RiwayatPendidikan />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

export default function Profil() {
  return (
    <MainLayout>
      <Head>
        <title>{user.name} | Intra DIKTI</title>
      </Head>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">Profil</h1>
        {/* Main 3 column grid */}
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-4 lg:gap-8">
          <ModuleNavigation />
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-1-title">
              <h2 className="sr-only" id="section-1-title">
                Profil
              </h2>

              {/* Profile Info */}
              <div className="rounded-lg bg-white overflow-hidden shadow mb-3">
                <h2 className="sr-only" id="profile-overview-title">
                  Profile Overview
                </h2>
                <div className="bg-white p-6">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex  items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="mx-auto h-14 w-14 rounded-full"
                          src={user.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className=" text-left ml-2 sm:mt-0  sm:text-left">
                        <p className="text-sm  font-bold text-gray-900 sm:text-2xl">
                          {user.name}
                        </p>
                        <p className="text-xs sm:text-sm  font-medium text-gray-600">
                          {user.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <TabBiodata />
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
