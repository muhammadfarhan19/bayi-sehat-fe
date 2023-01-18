import React from 'react';

import DetailDinasPegawaiData from '../../../components/DinasPage/DetailDinas/DetailDinasPegawaiData';
import ListDaftarDinas from '../../../components/KeuanganPage/DaftarDinas/ListDaftarDinas';
import { withAuthenticatedPage } from '../../../components/shared/hocs/AuthenticatedPage';
import { withReduxPage } from '../../../components/shared/hocs/ReduxPage';
import LeftMenu from '../../../components/shared/MainLayout/LeftMenu';
import MainLayout from '../../../components/shared/MainLayout/MainLayout';
import { NavigationId } from '../../../constants/NavigationList';
import { getQueryString } from '../../../utils/URLUtils';

function DaftarDinas() {
  const { type } = getQueryString();
  return (
    <MainLayout>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
        <LeftMenu />
        <div className="grid grid-cols-1 gap-4 lg:col-span-3">
          <section aria-labelledby="section-1-title">
            {type === 'detail' ? <DetailDinasPegawaiData /> : <ListDaftarDinas />}
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

export default withReduxPage()(withAuthenticatedPage({ resourceId: NavigationId.KEUANGAN })(DaftarDinas));
