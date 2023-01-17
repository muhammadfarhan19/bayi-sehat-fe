import React from 'react';

import KlaimCutiSakit from '../../components/CutiSakitPage/KlaimCutiSakit';
import { withAuthenticatedPage } from '../../components/shared/hocs/AuthenticatedPage';
import { withReduxPage } from '../../components/shared/hocs/ReduxPage';
import LeftMenu from '../../components/shared/MainLayout/LeftMenu';
import MainLayout from '../../components/shared/MainLayout/MainLayout';

function CutiSakit() {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
        <LeftMenu />
        <div className="grid grid-cols-1 gap-4 lg:col-span-3">
          <KlaimCutiSakit />
        </div>
      </div>
    </MainLayout>
  );
}

export default withReduxPage()(withAuthenticatedPage()(CutiSakit));
