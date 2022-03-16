import * as React from 'react';

import DashboardPage from '../components/Dashboard/DashboardPage';
import { withAuthenticatedPage } from '../components/shared/hocs/AuthenticatedPage';
import { withReduxPage } from '../components/shared/hocs/ReduxPage';
import LeftMenu from '../components/shared/MainLayout/LeftMenu';
import MainLayout from '../components/shared/MainLayout/MainLayout';

function Kepegawaian() {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
        <LeftMenu />
        <div className="grid grid-cols-1 gap-4 lg:col-span-3">
          <DashboardPage />
        </div>
      </div>
    </MainLayout>
  );
}

export default withReduxPage()(withAuthenticatedPage()(Kepegawaian));
