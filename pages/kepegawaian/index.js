import React from 'react';

import DashboardPage from '../../components/Dashboard/DashboardPage';
import MainLayout from '../../components/MainLayout/MainLayout';
import ModuleNavigation from '../../components/Navigation/ModuleNavigation';

export default function Kepegawaian() {
  const menu = [
    { name: 'Dashboard', href: '/kepegawaian' },
    {
      name: 'Pegawai',
      href: '#',
      current: false,
      children: [
        { name: 'Data Pegawai', href: '/kepegawaian/data-pegawai', current: true },
        { name: 'Daftar Jabatan', href: '#', current: false },
        { name: 'Peta Jabatan', href: '#', current: false },
      ],
    },
  ];
  return (
    <MainLayout>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
        <ModuleNavigation menu={menu} />

        <div className="grid grid-cols-1 gap-4 lg:col-span-3">
          <section aria-labelledby="section-1-title">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-6">
                <DashboardPage />
              </div>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
