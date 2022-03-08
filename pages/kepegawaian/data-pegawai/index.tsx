import { withAuthenticatedPage } from '../../../components/hocs/AuthenticatedPage';
import { withReduxPage } from '../../../components/hocs/ReduxPage';
import DataKepegawaian from '../../../components/KepegawaianPage/DataKepegawaian/DataKepegawaian';
import DetailPegawai from '../../../components/KepegawaianPage/DataKepegawaian/DetailPegawai/DetailPegawai';
import LeftMenu from '../../../components/MainLayout/LeftMenu';
import MainLayout from '../../../components/MainLayout/MainLayout';
import { filterMenu } from '../../../utils/Components';
import { getQueryString } from '../../../utils/URLUtils';

function DataPegawai() {
  const menu = filterMenu();
  const { nip } = getQueryString();

  return (
    <MainLayout>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
        <LeftMenu navigation={menu} />

        <div className="grid grid-cols-1 gap-4 lg:col-span-3">
          <section aria-labelledby="section-1-title">
            <div>{typeof nip === 'undefined' ? <DataKepegawaian /> : <DetailPegawai />}</div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

export default withReduxPage()(withAuthenticatedPage()(DataPegawai));
