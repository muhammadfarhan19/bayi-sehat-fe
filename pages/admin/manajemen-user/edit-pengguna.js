import MainLayout from "../../../components/layouts/MainLayout";
import EditUser from "../../../components/admin/manajemen-user/EditUser";
import ModuleNavigation from "../../../components/navigation/ModuleNavigation";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { expiry } from "../../../components/shared/fetcher/FetcherHooks";

export default function User() {
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
            <div className="w-full lg:px-4">
                <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-5 lg:gap-8">
                    <ModuleNavigation />
                    <EditUser />
                </div>
            </div>
        </MainLayout>
    );
}
