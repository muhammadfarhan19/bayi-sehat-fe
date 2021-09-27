
import { useRouter } from "next/router";
import { useEffect,useState } from "react";
import ListBukuTamu from "../../components/kunjungan/buku-tamu/ListBukuTamu";
import MainLayout from "../../components/layouts/MainLayout";
import ModuleNavigation from "../../components/navigation/ModuleNavigation";
import { expiry } from "../../components/shared/fetcher/FetcherHooks";

export default function index() {
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
          <ListBukuTamu />
        </div>
      </div>
    </MainLayout>
  );
}
