import MainLayout from "../../../components/layouts/MainLayout";
import ModuleNavigation from "../../../components/navigation/ModuleNavigation";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Satya from "../../../components/kepegawaian/satyalencana/Satya";
import config from "../../../utils/Config";
import { request } from "../../../components/shared/fetcher/FetcherHooks";



export default function SatyaPage() {
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-4 lg:gap-8">
          <ModuleNavigation />
          <Satya />
        </div>
      </div>
    </MainLayout>
  );
}
