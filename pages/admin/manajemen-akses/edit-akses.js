import React from "react";
import PageEditAkses from "../../../components/admin/manajemen-akses/PageEditAkses";
import MainLayout from "../../../components/layouts/MainLayout";
import ModuleNavigation from "../../../components/navigation/ModuleNavigation";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { request } from "../../../components/shared/fetcher/FetcherHooks";
import config from "../../../utils/Config";


function Akses() {
  const router = useRouter();
  const [loadPage, setLoadPage] = useState(false);

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ModuleNavigation />
          <PageEditAkses />
        </div>
      </div>
    </MainLayout>
  );
}

export default Akses;
