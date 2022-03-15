import { withAuthenticatedPage } from '../../../components/hocs/AuthenticatedPage';
import { withReduxPage } from '../../../components/hocs/ReduxPage';
import LeftMenu from '../../../components/MainLayout/LeftMenu';
import MainLayout from '../../../components/MainLayout/MainLayout';
import DetailDirektoratPage from '../../../components/PetaJabatanPage/DetailDirektoratPage';
import DetailPetaJabatanPage from '../../../components/PetaJabatanPage/DetailPetaJabatanPage';
import PetaJabatanPage from '../../../components/PetaJabatanPage/PetaJabatanPage';
import { filterMenu } from '../../../utils/Components';
import { getQueryString } from '../../../utils/URLUtils';

function PesertaJabatan() {
  const menu = filterMenu();
  const { jabatanId, direktoratId } = getQueryString();

  return (
    <>
      <MainLayout>
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
          <LeftMenu navigation={menu} />

          <div className="grid grid-cols-1 gap-4 lg:col-span-3">
            <section aria-labelledby="section-1-title">
              <div className="rounded-lg bg-white shadow">
                <div>
                  {typeof jabatanId === 'undefined' ?
                    <PetaJabatanPage />
                    :
                    typeof direktoratId !== 'undefined' ?
                      <DetailDirektoratPage />
                      :
                      <DetailPetaJabatanPage />
                  }
                </div>
              </div>
            </section>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default withReduxPage()(withAuthenticatedPage()(PesertaJabatan));
