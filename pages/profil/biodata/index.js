import { Tab } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BottomNav from "../../../components/BottomNav";
import MainLayout from "../../../components/layouts/MainLayout";
import ModuleNavigation from "../../../components/navigation/ModuleNavigation";
import { getUser, request, useUser } from "../../../components/shared/fetcher/FetcherHooks";
import { useGetBiodata } from "../../../components/shared/fetcher/profil/FetcherProfil";
import FetcherLoading from "../../../components/shared/loading/fetcherLoading";
import config from "../../../utils/Config";
import menu from "../../../constants/menu";

function KartuProfil(props) {
  const user = JSON.parse(props.user);

  if (user != null) {
    return (
      <div className="bg-white shadow rounded p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex  items-center">
            <div className="flex-shrink-0">
              <img
                className="mx-auto h-14 w-14 rounded-full"
                src="https://dikti.kemdikbud.go.id/wp-content/uploads/2020/03/cropped-logo-dikbud.png"
                alt=""
              />
            </div>
            <div className=" text-left ml-2 sm:mt-0  sm:text-left">
              <p className="text-sm  font-bold text-gray-900 sm:text-2xl">
                {user.nama}
              </p>
              <p className="text-xs sm:text-sm  font-medium text-gray-600">
                {user.jabatan &&
                  user.jabatan.map((item) => (
                    <span key="item">
                      {item} <br />
                    </span>
                  ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>

      </>
    );
  }
}

function TabBiodata({ biodata }) {
  const tabs = [
    { name: "Data Diri Pegawai", href: "#", current: true },
    { name: "Data Diri Pribadi", href: "#", current: false },
    { name: "Riwayat Pendidikan", href: "#", current: false },
  ];
  if (biodata) {
    return (
      <div className="rounded-lg bg-white shadow px-4 py-5 border-b border-gray-200 sm:px-6 mb-3">
        <div className="mb-3">
          <Tab.Group vertical>
            <Tab.List className="mb-3 flex">
              {tabs.map((tab) => (
                <Tab
                  className={({ selected }) =>
                    selected
                      ? "flex-grow border-indigo-500 text-indigo-600 whitespace-nowrap pb-2 px-3 border-b-2  text-sm focus:outline-none"
                      : "flex-grow border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hitespace-nowrap pb-2 px-3 border-b-2  text-sm focus:outline-none"
                  }
                  key={tab.name}
                >
                  {tab.name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <DataDiriPegawai data={biodata.data_pegawai} />
              </Tab.Panel>
              <Tab.Panel>
                <DataDiriPribadi data={biodata.data_diri} />
              </Tab.Panel>
              <Tab.Panel>
                <DataDiriPendidikan data={biodata.riwayat_pendidikan} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
function DataDiriPegawai({ data }) {
  function tanggal(tgl) {
    const dt = new Date(tgl);
    return dt.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  const data_pegawai = [
    {
      judul: "Unit kerja",
      deskripsi: data.unit_kerja,
    },
    {
      judul: "Nomor batch",
      deskripsi: data.batch,
    },
    {
      judul: "NIP",
      deskripsi: data.nip,
    },
    {
      judul: "NIP lama",
      deskripsi: data.nip_lama,
    },
    {
      judul: "Tempat, tanggal lahir",
      deskripsi: data.tempat_lahir + ", " + tanggal(data.tanggal_lahir),
    },
    {
      judul: "Tanggal CPNS",
      deskripsi: tanggal(data.tmt_pns),
    },
    {
      judul: "Status Kepegawaian",
      deskripsi: data.status_cpns_pns,
    },
    {
      judul: "Jabatan",
      deskripsi: data.jabatan.map((dt) => {
        return (
          <>
            {dt} <br />
          </>
        );
      }),
    },
    {
      judul: "Golongan",
      deskripsi: data.golongan,
    },
    {
      judul: "Tanggal mulai golongan",
      deskripsi: tanggal(data.tmt_golongan),
    },
    {
      judul: "Pangkat",
      deskripsi: data.pangkat,
    },
    // {
    //   judul: "Masa kerja",
    //   deskripsi: "27 tahun, 8 bulan",
    // },
    {
      judul: "Status",
      deskripsi: data.status,
    },
    {
      judul: "Karpeg",
      deskripsi: data.kartu_pegawai,
    },
  ];
  return (
    <table className="w-full text-left text-sm">
      <tbody>
        {data_pegawai.map((data) => (
          <tr className="border-b " key={data.judul}>
            <th className="py-2 text-sm ">{data.judul}</th>
            <td className="py-2 text-sm">{data.deskripsi}</td>
          </tr>
        ))}
      </tbody>
      {/* {JSON.stringify(data)} */}
    </table>
  );
}
function DataDiriPribadi({ data }) {
  const data_pribadi = [
    {
      judul: "Jenis Kelamin",
      deskripsi: data.jenis_kelamin,
    },
    {
      judul: "Status Perkawinan",
      deskripsi: data.status_nikah,
    },
    {
      judul: "Jumlah Anak",
      deskripsi: data.jumlah_anak,
    },
    {
      judul: "Nomor Induk Kependudukan",
      deskripsi: data.nomor_ktp,
    },
    {
      judul: "Email",
      deskripsi: data.email,
    },
    {
      judul: "Alamat",
      deskripsi: data.alamat,
    },
    {
      judul: "Nomor Pokok Wajib Pajak",
      deskripsi: data.npwp,
    },
    {
      judul: "BPJS",
      deskripsi: data.bpjs,
    },
  ];
  return (
    <table className="w-full text-sm">
      <tbody>
        {data_pribadi.map((data) => (
          <tr className="border-b " key={data.judul}>
            <th className="py-2 text-sm text-left">{data.judul}</th>
            <td className="py-2 text-sm">{data.deskripsi}</td>
          </tr>
        ))}
      </tbody>
      {/* {JSON.stringify(data)} */}
    </table>
  );
}
function DataDiriPendidikan({ data }) {
  function tanggal(tgl) {
    const dt = new Date(tgl);
    return dt.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className="-my-2 overflow-x-auto sm:mx-0 ">
      <div className="py-2 overflow-visible  align-start inline-block min-w-full sm:px-0 lg:px-0">
        <div className=" overflow-visible border-b border-gray-200 sm:rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 px-2">Jenjang</th>

                <th className="py-2 px-2">Lembaga</th>
                <th className="py-2 px-2 truncate">Program Studi</th>
                <th className="py-2 px-2">Tanggal Lulus</th>
                <th className="py-2 px-2">Nomor Ijazah</th>
              </tr>
            </thead>
            <tbody>
              {data.map((dt) => (
                <tr className="border-b">
                  <td className="py-2 px-2">{dt.jenjang}</td>
                  <td className="py-2 px-2 truncate">{dt.lembaga}</td>
                  <td className="py-2 px-2 truncate">{dt.prodi}</td>
                  <td className="py-2 px-2 truncate">{tanggal(dt.tanggal_lulus)}</td>
                  <td className="py-2 px-2">{dt.nomor_ijazah}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function Biodata(params) {
  const [user, setUser] = useState(null);
  const [biodata, setBiodata] = useState(null);

  // useEffect(async () => {
  //   if (!user) {
  //     try {
  //       let rUser = await doGetUser();
  //       setUser(rUser);
  //     } catch (e) {
  //       router.push("/login");
  //     }
  //   }
  //   if (!biodata) {
  //     try {
  //       const data = await getBiodata(user.id);
  //       setBiodata(data);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  // }, [user]);


  useEffect(() => {
    (async () => {
      try {
        const getData = await request(config.apiHost + '/auth/getUser', '', 'get', true);
        setUser(getData.responseData.data)
        if(getData.responseData.status === 'SUCCESS'){
          const getData2 = await request(config.apiHost + '/users/' + getData.responseData.data.id + '/biodata', '', 'get', true);
          setBiodata(getData2.responseData.data);
        }
      } catch (e) {
        console.log(e)
      }
    })();
  }, []);

  return (
    <MainLayout>
      {/* Main 3 column grid */}
      <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-4 lg:gap-8">
        {/* <ModuleNavigation menu={menu} /> */}
        <div className="grid grid-cols-1 gap-2 lg:col-span-4">
          <KartuProfil user={JSON.stringify(user)} />
          <TabBiodata biodata={biodata} />
        </div>
      </div>
      <BottomNav/>
    </MainLayout>
  );
}
