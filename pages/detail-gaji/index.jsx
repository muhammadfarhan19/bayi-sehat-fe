import * as React from 'react';

import DetailGajiPegawai from '../../components/Dashboard/DetailGajiPegawai/DetailGajiPegawai';
import { withAuthenticatedPage } from '../../components/shared/hocs/AuthenticatedPage';
import { withReduxPage } from '../../components/shared/hocs/ReduxPage';
import LeftMenu from '../../components/shared/MainLayout/LeftMenu';
import MainLayout from '../../components/shared/MainLayout/MainLayout';

function GajiPegawai() {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
        <LeftMenu />
        <div className="grid grid-cols-1 gap-4 lg:col-span-3">
          <DetailGajiPegawai />
        </div>
      </div>
    </MainLayout>
  );
}

export default withReduxPage()(withAuthenticatedPage()(GajiPegawai));
