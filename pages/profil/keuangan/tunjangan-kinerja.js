import MainLayout from "../../../components/layouts/MainLayout";
import ModuleNavigation from "../../../components/navigation/ModuleNavigation";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ListTunjangan from "../../../components/profil/tunjangan-kinerja/ListTunjangan";
import config from "../../../utils/Config";
import { expiry } from "../../../components/shared/fetcher/FetcherHooks";


export default function TukinProfilePage() {
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
          <ListTunjangan />
        </div>
      </div>
    </MainLayout>
  );
}
