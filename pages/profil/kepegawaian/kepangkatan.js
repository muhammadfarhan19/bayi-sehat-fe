import MainLayout from "../../../components/layouts/MainLayout";
import ModuleNavigation from "../../../components/navigation/ModuleNavigation";
import ListKepangkatan from "../../../components/profil/kepangkatan/ListKepangkatan";
import menu from "../menu";

export default function Kepangkatan() {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-4 lg:gap-8">
          <ModuleNavigation menu={menu} />
          <ListKepangkatan />
        </div>
      </div>
    </MainLayout>
  );
}
