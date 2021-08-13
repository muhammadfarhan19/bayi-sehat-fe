import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import MainLayout from '../../components/layouts/MainLayout';
import UserList from '../../components/admin/manajemen-user/UserList';
import ModuleNavigation from '../../components/navigation/ModuleNavigation';
import { expiry } from '../../components/shared/fetcher/FetcherHooks';

function index() {
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
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-4 lg:gap-8">
          <ModuleNavigation />
          <UserList />
        </div>
      </div>
    </MainLayout>
  );
}

export default index;
