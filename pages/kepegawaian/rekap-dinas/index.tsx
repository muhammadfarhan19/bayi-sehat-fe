import AddRekapPage from '../../../components/KepegawaianPage/RekapDinasPage/AddRekapPage';
import DetailRekapPage from '../../../components/KepegawaianPage/RekapDinasPage/DetailRekapPage';
import RekapDinasPage from '../../../components/KepegawaianPage/RekapDinasPage/RekapDinasPage';
import { withAuthenticatedPage } from '../../../components/shared/hocs/AuthenticatedPage';
import { withReduxPage } from '../../../components/shared/hocs/ReduxPage';
import LeftMenu from '../../../components/shared/MainLayout/LeftMenu';
import MainLayout from '../../../components/shared/MainLayout/MainLayout';
import { NavigationId } from '../../../constants/NavigationList';
import { getQueryString } from '../../../utils/URLUtils';

function RekapDinas() {
  const { dinas_id, type } = getQueryString<{ dinas_id: string; type: string }>();

  return (
    <MainLayout>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
        <LeftMenu />

        <div className="grid grid-cols-1 gap-4 lg:col-span-3">
          <section aria-labelledby="section-1-title">
            {typeof type !== 'undefined' ? (
              <AddRekapPage type={type} dinas_id={dinas_id} />
            ) : typeof dinas_id === 'undefined' ? (
              <RekapDinasPage />
            ) : (
              <DetailRekapPage dinas_id={dinas_id} />
            )}
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

export default withReduxPage()(withAuthenticatedPage({ resourceId: NavigationId.KEPEGAWAIAN })(RekapDinas));
