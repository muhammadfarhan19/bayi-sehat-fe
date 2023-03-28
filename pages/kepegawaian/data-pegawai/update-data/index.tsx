import UpdateDataPegawai from '../../../../components/KepegawaianPage/DataKepegawaian/DetailPegawai/DataDiriPegawai/UpdateDataPegawai';
import { withAuthenticatedPage } from '../../../../components/shared/hocs/AuthenticatedPage';
import { withReduxPage } from '../../../../components/shared/hocs/ReduxPage';
import LeftMenu from '../../../../components/shared/MainLayout/LeftMenu';
import MainLayout from '../../../../components/shared/MainLayout/MainLayout';
import { NavigationId } from '../../../../constants/NavigationList';

function UpdateData() {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
        <LeftMenu />

        <div className="grid grid-cols-1 gap-4 lg:col-span-3">
          <section aria-labelledby="section-1-title">
            <div>
              <UpdateDataPegawai />
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

export default withReduxPage()(withAuthenticatedPage({ resourceId: NavigationId.KEPEGAWAIAN })(UpdateData));
