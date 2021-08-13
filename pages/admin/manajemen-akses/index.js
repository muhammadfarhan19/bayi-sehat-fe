import React from "react";
import ModuleNavigation from "../../../components/navigation/ModuleNavigation";
import MainLayout from "../../../components/layouts/MainLayout";
import AksesList from "../../../components/admin/manajemen-akses/AksesList";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { expiry } from "../../../components/shared/fetcher/FetcherHooks";

function Akses() {
  const router = useRouter();
  const [loadPage, setLoadPage] = useState(false);
  const token = Cookies.get('token');

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
          <AksesList />
        </div>
      </div>
    </MainLayout>
  );
}

export default Akses;
