import { withAuthenticatedPage } from '../../../components/hocs/AuthenticatedPage';
import { withReduxPage } from '../../../components/hocs/ReduxPage';
import DaftarKepegawaian from '../../../components/KepegawaianPage/DaftarKepegawaian/DaftarKepegawaian';
import LeftMenu from '../../../components/MainLayout/LeftMenu';
import MainLayout from '../../../components/MainLayout/MainLayout';
import { filterMenu } from '../../../utils/Components';

function DaftarJabatan() {
  const menu = filterMenu();
  return (
    <MainLayout>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
        <LeftMenu navigation={menu} />

        <div className="grid grid-cols-1 gap-4 lg:col-span-3">
          <section aria-labelledby="section-1-title">
            <div className="rounded-lg bg-white shadow">
              <DaftarKepegawaian />
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

export default withReduxPage()(withAuthenticatedPage()(DaftarJabatan));
