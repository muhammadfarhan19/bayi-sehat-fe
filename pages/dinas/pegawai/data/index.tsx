import React from 'react';

import DetailDinasPegawaiData from '../../../../components/DinasPage/DetailDinas/DetailDinasPegawaiData';
import { withAuthenticatedPage } from '../../../../components/shared/hocs/AuthenticatedPage';
import { withReduxPage } from '../../../../components/shared/hocs/ReduxPage';
import LeftMenu from '../../../../components/shared/MainLayout/LeftMenu';
import MainLayout from '../../../../components/shared/MainLayout/MainLayout';
import { NavigationId } from '../../../../constants/NavigationList';

function DinasPegawaiData() {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
        <LeftMenu />
        <div className="grid grid-cols-1 gap-4 lg:col-span-3">
          <DetailDinasPegawaiData />
        </div>
      </div>
    </MainLayout>
  );
}

export default withReduxPage()(withAuthenticatedPage({ resourceId: NavigationId.KEPEGAWAIAN })(DinasPegawaiData));
