import MainLayout from "../../../components/layouts/MainLayout";
import ModuleNavigation from "../../../components/navigation/ModuleNavigation";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ListPangkat from "../../../components/kepegawaian/kepangkatan/ListPangkat";
import config from "../../../utils/Config";
import { expiry } from "../../../components/shared/fetcher/FetcherHooks";



export default function Posisi() {
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
          <ListPangkat />
        </div>
      </div>
    </MainLayout>
  );
}
