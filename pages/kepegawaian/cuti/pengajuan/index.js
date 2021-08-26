import MainLayout from "../../../../components/layouts/MainLayout";
import ModuleNavigation from "../../../../components/navigation/ModuleNavigation";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AddCuti from "../../../../components/kepegawaian/cuti/kelola-cuti/pengajuan/AddCuti";
import config from "../../../../utils/Config";
import { request } from "../../../../components/shared/fetcher/FetcherHooks";


export default function PengajuanPage() {
  const router = useRouter();
  const [loadPage, setLoadPage] = useState(false);
  const token = Cookies.get('token');

useEffect(() => {
    (async () => {
        try {
            const getUser = await request(config.apiHost + '/auth/getUser', '', 'get', true);
            if(getUser.success){
              setLoadPage(true);
            }else{
              // router.push('/login');
            }
        } catch (e) {
            // router.push('/login');
        }
    })();
  }, []);


  if (!loadPage) {
    return <></>;
  }

  return (
    <MainLayout>
      <div className="w-full lg:px-4">
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-5 lg:gap-8">
          <ModuleNavigation />
          <AddCuti />
        </div>
      </div>
    </MainLayout>
  );
}
