import * as React from 'react';

import BerkasKenaikanPangkat from '../../../components/KepengkatanPage/DetailKepangkatan/BerkasKenaikanPangkat';
import Kepangkatan from '../../../components/KepengkatanPage/Kepangkatan';
import { withAuthenticatedPage } from '../../../components/shared/hocs/AuthenticatedPage';
import { withReduxPage } from '../../../components/shared/hocs/ReduxPage';
import LeftMenu from '../../../components/shared/MainLayout/LeftMenu';
import MainLayout from '../../../components/shared/MainLayout/MainLayout';
import { getQueryString } from '../../../utils/URLUtils';

function DataKepangkatan() {
  const { id } = getQueryString<{ id: string }>();
  return (
    <MainLayout>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
        <LeftMenu />
        <div className="grid grid-cols-1 gap-4 lg:col-span-3">
          {id ? (
            <BerkasKenaikanPangkat />
          ) : (
            <section aria-labelledby="section-1-title">
              <div className="rounded-lg bg-white shadow">
                <Kepangkatan />
              </div>
            </section>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default withReduxPage()(withAuthenticatedPage()(DataKepangkatan));
