import MainLayout from "../../../components/layouts/MainLayout";
import ModuleNavigation from "../../../components/navigation/ModuleNavigation";
import ListKepangkatan from "../../../components/profil/kepangkatan/ListKepangkatan";
import menu from "../../../constants/menu";

export default function Kepangkatan() {
  return (
    <MainLayout>
      <div className="w-full lg:px-4">
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-5 lg:gap-8">
          <ModuleNavigation menu={menu} />
          <ListKepangkatan />
        </div>
      </div>
    </MainLayout>
  );
}
