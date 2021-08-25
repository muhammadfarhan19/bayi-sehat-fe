import MainLayout from "../../../components/layouts/MainLayout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ExampleLineGraph from "../../../components/ExampleLineGraph";
import ModuleNavigation from "../../../components/navigation/ModuleNavigation";
import Cookies from "js-cookie";

export default function Dashboard() {
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
        <ModuleNavigation />
    
      </div>
    </MainLayout>
  );
}
