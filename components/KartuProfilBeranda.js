import Link from "next/link";
import Presensi from "./Presensi";
import { useEffect, useState } from "react";

const stats = [
  { label: "Kehadiran", value: "100%", link: "/profil/kepegawaian/kehadiran" },
  // { label: "Kegiatan", value: 3, link: "/#" },
];

function KartuProfilBeranda(props) {
  // const [user, setUser] = useState(null);
  const [load, setload] = useState(false);
  const user = JSON.parse(props.user);

  // if(test!=null){
  //   return <>{props.user} {test.nip}</>
  // }else{
  //   return <>Kosong?</>
  // }

  if(user != null){
    return (
      <div className="bg-white rounded-3xl lg:rounded-lg shadow">
        <div className="bg-white p-6 rounded-3xl">
          <div className="text-center">
            <div className="text-center">
              <div className="flex-shrink-0">
                <img
                  className="mx-auto h-20 w-20 rounded-full"
                  src="https://dikti.kemdikbud.go.id/wp-content/uploads/2020/03/cropped-logo-dikbud.png"
                  alt=""
                />
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 ">
                <Link href="/profil">
                  <a className="text-lg font-bold text-gray-900 hover:text-indigo-600 hover:underline">
                    {user.nama}
                  </a>
                </Link>
                <p className="text-xs font-medium text-gray-600">{user.nip}</p>
                <p className="text-xs font-medium text-gray-600">
                  {user.jabatan && user.jabatan.map((item)=><span key="item">{item} <br /></span>)}
                </p>
  
                <Presensi></Presensi>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t   grid grid-flow-col">
          {stats.map((stat) => (
            <Link href={stat.link} key={stat.link}>
              <a
                key={stat.label}
                className=" py-5 text-sm  font-medium text-center hover:bg-gray-50"
              >
                <div className="text-gray-900">{stat.value}</div>{" "}
                <div className="text-gray-600 text-xs text-indigo-600">
                  {stat.label}
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    );
  } else{
    return <></>
  }
}

export default KartuProfilBeranda;
