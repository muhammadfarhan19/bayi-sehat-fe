import ModuleNavigation from "../../../../../components/navigation/ModuleNavigation";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AddCuti from "../../../../../components/profil/kepegawaian/cuti/pengajuan/AddCuti";
import { expiry } from "../../../../../components/shared/fetcher/FetcherHooks";
import MainLayout from "../../../../../components/layouts/MainLayout";


export default function PengajuanPage() {
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
      <div className="w-full lg:px-4">
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-5 lg:gap-8">
          <ModuleNavigation />
          <AddCuti />
        </div>
      </div>
    </MainLayout>
  );
}
