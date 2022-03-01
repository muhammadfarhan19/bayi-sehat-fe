import React from 'react';

import DashboardPage from '../components/Dashboard/DashboardPage';
import { withAuthenticatedPage } from '../components/hocs/AuthenticatedPage';
import { withReduxPage } from '../components/hocs/ReduxPage';
import LeftMenu from '../components/MainLayout/LeftMenu';
import MainLayout from '../components/MainLayout/MainLayout';
import { filterMenu } from '../utils/Components';

const navigation = filterMenu();

function Dashboard() {
  return (
    <MainLayout>
      {/* Main 3 column grid */}
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Left column */}
        <LeftMenu navigation={navigation} />

        {/* Right column */}
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <DashboardPage />
        </div>
      </div>
    </MainLayout>
  );
}

export default withReduxPage()(withAuthenticatedPage()(Dashboard));
