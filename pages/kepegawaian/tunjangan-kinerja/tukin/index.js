import MainLayout from "../../../../components/layouts/MainLayout";
import ModuleNavigation from "../../../../components/navigation/ModuleNavigation";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Tukin from "../../../../components/kepegawaian/tunjangan-kinerja/Tukin";

export default function TukinPage() {
  const router = useRouter();
  const [loadPage, setLoadPage] = useState(false);
  const token = Cookies.get('token');

  useEffect(() => {
    if (typeof token === 'undefined') {
      router.push('/login');
    } else {
      setLoadPage(true);
    }
  }, [token])


  if (!loadPage) {
    return <></>;
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          <ModuleNavigation />
          <Tukin />
        </div>
      </div>
    </MainLayout>
  );
}
