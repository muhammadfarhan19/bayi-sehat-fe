import React from 'react';

import UpdateProfPic from '../../components/KepegawaianPage/DataKepegawaian/DetailPegawai/UpdateProfPic';
import { withAuthenticatedPage } from '../../components/shared/hocs/AuthenticatedPage';
import { withReduxPage } from '../../components/shared/hocs/ReduxPage';
import LeftMenu from '../../components/shared/MainLayout/LeftMenu';
import MainLayout from '../../components/shared/MainLayout/MainLayout';

function UpdateProfilePicture() {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
        <LeftMenu />
        <div className="grid grid-cols-1 gap-4 lg:col-span-3">
          <UpdateProfPic />
        </div>
      </div>
    </MainLayout>
  );
}

export default withReduxPage()(withAuthenticatedPage()(UpdateProfilePicture));
