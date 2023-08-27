import * as React from 'react';

import DetailRekapPage from '../../../components/KepegawaianPage/RekapDinasPage/DetailRekapPage';
import DetailNotificationPage from '../../../components/Notification/NotificationDetailPage/NotificationDetailPage';
import CardHeader from '../../../components/shared/CardHeader';
import { withAuthenticatedPage } from '../../../components/shared/hocs/AuthenticatedPage';
import { withReduxPage } from '../../../components/shared/hocs/ReduxPage';
import LeftMenu from '../../../components/shared/MainLayout/LeftMenu';
import MainLayout from '../../../components/shared/MainLayout/MainLayout';
import { Case, Default, Switch } from '../../../utils/Components';
import { getQueryString } from '../../../utils/URLUtils';

function DetailNotification() {
  const { date, dinas_id } = getQueryString<{ pegawai_id: string; date: string; dinas_id: string }>();
  return (
    <MainLayout>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
        <LeftMenu />
        <div className="grid grid-cols-1 gap-4 lg:col-span-3">
          <CardHeader />
          <Switch>
            <Case condition={typeof date !== 'undefined' && date !== ''}>
              <DetailNotificationPage />
            </Case>
            <Default>
              <DetailRekapPage dinas_id={dinas_id} viewOnly={true} />
            </Default>
          </Switch>
        </div>
      </div>
    </MainLayout>
  );
}

export default withReduxPage()(withAuthenticatedPage()(DetailNotification));
