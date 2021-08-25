import MainLayout from "../components/layouts/MainLayout";
import TambahLogKegiatan from "../components/TambahLogKegiatan";
import TaskKepegawaian from "../components/TaskKepegawaian";
import PengumumanBeranda from "../components/PengumumanBeranda";
import NavIconBeranda from "../components/NavIconBeranda";
import KartuProfilBeranda from "../components/KartuProfilBeranda";
import KegiatanHariIni from "../components/KegiatanHariIni";
import InfoKehadiranDashboard from "../components/InfoKehadiranDashboard";
import RealisasiSkp from "../components/RealisasiSkp";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../middleware/auth";
import { useUser } from "../components/shared/fetcher/FetcherHooks";

export default function Home() {
  const [user, setUser] = useState(null);
  const getUser = useUser;
  const router = useRouter();
  useEffect(async () => {
    if(!user){
      try {
        let rUser = await getUser();
        setUser(rUser);
      } catch (e) {
        router.push('/login');
      }
    }
  }, [user]);

  return (
    <MainLayout>
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          <div className="grid grid-cols-1 gap-4 lg:col-span-1">
            <section aria-labelledby="section-1-title">
                <KartuProfilBeranda user={JSON.stringify(user)} />
              
              {/* <RealisasiSkp /> */}
              {/* <KegiatanHariIni /> */}
            </section>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-2-title">
              <PengumumanBeranda />
              {/* <NavIconBeranda /> */}
              {/* <TambahLogKegiatan /> */}
              {/* <TaskKepegawaian /> */}
              {/* <InfoKehadiranDashboard /> */}
              <div className="rounded-lg bg-white overflow-hidden shadow"></div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
