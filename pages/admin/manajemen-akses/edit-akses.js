import React from "react";
import PageEditAkses from "../../../components/admin/manajemen-akses/PageEditAkses";
import MainLayout from "../../../components/layouts/MainLayout";
import ModuleNavigation from "../../../components/navigation/ModuleNavigation";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { expiry } from "../../../components/shared/fetcher/FetcherHooks";


function Akses() {
  const router = useRouter();
  const [loadPage, setLoadPage] = useState(false);

  const check = expiry();

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
        console.log(e)
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
