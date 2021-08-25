import MainLayout from "../../../components/layouts/MainLayout";
import ModuleNavigation from "../../../components/navigation/ModuleNavigation";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import TabelDataKehadiran from "../../../components/kepegawaian/kehadiran/TabelDataKehadiran";
import TabelKlaimKehadiran from "../../../components/kepegawaian/kehadiran/TabelKlaimKehadiran";
import menu from "../dev_menu";

export default function Kehadiran() {
  const router = useRouter();
  const [loadPage, setLoadPage] = useState(false);
  const token = Cookies.get("token");
  
  useEffect(() => {
    if (typeof token === "undefined") {
      router.push("/login");
    } else {
      setLoadPage(true);
    }
  }, [token]);

  if (!loadPage) {
    return <></>;
  }

  return (
    <MainLayout>
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-4 lg:gap-8">
          <ModuleNavigation menu={menu} />
          <div className="grid grid-cols-1 gap-4 lg:col-span-3 transition duration-500 ease-in-out">
              <TabelKlaimKehadiran/>
              <TabelDataKehadiran/>
          </div>
        </div>
    </MainLayout>
  );
}
