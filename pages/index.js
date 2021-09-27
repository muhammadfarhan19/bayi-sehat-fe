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
import { useRouter } from 'next/router';
import { expiry, getUser, request } from "../components/shared/fetcher/FetcherHooks";
import BottomNav from "../components/BottomNav";
import WorkInProgress from "../components/WorkInProgress";
import config from "../utils/Config";


export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [loadPage, setLoadPage] = useState(false);
  const check = expiry();

  useEffect(() => {
    (async () => {
      try {
        const getData = await request(config.apiHost + '/auth/getUser', '', 'get', true);
        console.log(getData)
        setUser(getData.responseData.data)
      } catch (e) {
        console.log(e)
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      try {
        const checkExpiry = await check();
        if (checkExpiry.responseData.data !== null) {
          setLoadPage(true);
        } else {
          router.push('/login');
        }
      } catch (e) {
        router.push('/login');
      }
    })();
  }, []);


  if (!loadPage) {
    return <></>;
  }

  return (
    <MainLayout>
      
      <div className="container mx-auto pb-10">
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          <div className="grid grid-cols-1 gap-1 lg:col-span-1">
            <section aria-labelledby="section-1-title">
                <KartuProfilBeranda user={JSON.stringify(user)} />
              
              {/* <RealisasiSkp /> */}
              <KegiatanHariIni />

            </section>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-2-title">
              {/* <PengumumanBeranda /> */}
              <WorkInProgress/>
              {/* <NavIconBeranda /> */}
              {/* <TambahLogKegiatan /> */}
              {/* <TaskKepegawaian /> */}
              {/* <InfoKehadiranDashboard /> */}
              <div className="rounded-lg bg-white overflow-hidden shadow"></div>
            </section>
          </div>
        </div>
      </div>
      <BottomNav/>
    </MainLayout>
  );
}
