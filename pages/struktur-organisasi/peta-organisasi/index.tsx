import { withAuthenticatedPage } from '../../../components/shared/hocs/AuthenticatedPage';
import { withReduxPage } from '../../../components/shared/hocs/ReduxPage';
import usePersonalData from '../../../components/shared/hooks/usePersonalData';
import LeftMenu from '../../../components/shared/MainLayout/LeftMenu';
import MainLayout from '../../../components/shared/MainLayout/MainLayout';
import DetailPetaOrganisasiPage from '../../../components/StrukturOrganisasi/PetaOrganisasiPage/DetailPetaOrganisasiPage';
import PetaOrganisasiPage from '../../../components/StrukturOrganisasi/PetaOrganisasiPage/PetaOrganisasiPage';
import { getQueryString } from '../../../utils/URLUtils';

function PetaOrganisasi() {
  const personalPegawai = usePersonalData();
  const { id } = getQueryString<{ id?: string }>();

  if (!personalPegawai?.unit_kerja_id) {
    return <></>;
  }

  return (
    <MainLayout>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
        <LeftMenu />

        <div className="grid grid-cols-1 gap-4 lg:col-span-3">
          <section aria-labelledby="section-1-title">
            {typeof id !== 'undefined' ? (
              <DetailPetaOrganisasiPage />
            ) : (
              <PetaOrganisasiPage unit_kerja_id={personalPegawai?.unit_kerja_id} />
            )}
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

export default withReduxPage()(withAuthenticatedPage()(PetaOrganisasi));
