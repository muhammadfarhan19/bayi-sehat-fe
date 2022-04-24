import DataKepegawaian from '../../../components/KepegawaianPage/DataKepegawaian/DataKepegawaian';
import DetailPegawai from '../../../components/KepegawaianPage/DataKepegawaian/DetailPegawai/DetailPegawai';
import { withAuthenticatedPage } from '../../../components/shared/hocs/AuthenticatedPage';
import { withReduxPage } from '../../../components/shared/hocs/ReduxPage';
import LeftMenu from '../../../components/shared/MainLayout/LeftMenu';
import MainLayout from '../../../components/shared/MainLayout/MainLayout';
import { NavigationId } from '../../../constants/NavigationList';
import { getQueryString } from '../../../utils/URLUtils';

function DataPegawai() {
  const { pegawai_id } = getQueryString();

  return (
    <MainLayout>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
        <LeftMenu />

        <div className="grid grid-cols-1 gap-4 lg:col-span-3">
          <section aria-labelledby="section-1-title">
            <div>{typeof pegawai_id === 'undefined' ? <DataKepegawaian /> : <DetailPegawai />}</div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

export default withReduxPage()(withAuthenticatedPage({ resourceId: NavigationId.KEPEGAWAIAN })(DataPegawai));
