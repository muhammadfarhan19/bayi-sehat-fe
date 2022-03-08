import * as React from 'react';
import { useDispatch } from 'react-redux';

import { setModal, setSnackbar } from '../action/CommonAction';
import DashboardPage from '../components/Dashboard/DashboardPage';
import { withAuthenticatedPage } from '../components/hocs/AuthenticatedPage';
import { withReduxPage } from '../components/hocs/ReduxPage';
import LeftMenu from '../components/MainLayout/LeftMenu';
import MainLayout from '../components/MainLayout/MainLayout';
import { filterMenu } from '../utils/Components';

function Kepegawaian() {
  const menu = filterMenu();

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setSnackbar({ show: true, message: 'Test Snackbar' }));
    dispatch(setModal({ show: true, message: 'Test Modal' }));
  });

  return (
    <MainLayout>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
        <LeftMenu navigation={menu} />
        <div className="grid grid-cols-1 gap-4 lg:col-span-3">
          <DashboardPage />
        </div>
      </div>
    </MainLayout>
  );
}

export default withReduxPage()(withAuthenticatedPage()(Kepegawaian));
