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
  const { id, type } = getQueryString<{ id: string; type: string }>();

  return (
    <MainLayout>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
        <LeftMenu />

        <div className="grid grid-cols-1 gap-4 lg:col-span-3">
          <section aria-labelledby="section-1-title">
            {typeof type !== 'undefined' ? (
              <AddRekapPage type={type} id={id} />
            ) : typeof id === 'undefined' ? (
              <RekapDinasPage />
            ) : (
              <DetailRekapPage />
            )}
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

export default withReduxPage()(withAuthenticatedPage({ resourceId: NavigationId.KEPEGAWAIAN })(RekapDinas));
