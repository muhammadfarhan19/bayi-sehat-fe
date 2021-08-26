import MainLayout from "../../../../components/layouts/MainLayout";
import ModuleNavigation from "../../../../components/navigation/ModuleNavigation";
import ListCuti from "../../../../components/profil/kepegawaian/cuti/LIstCuti";

export default function Cuti() {
  return (
    <MainLayout>
      <div className="w-full lg:px-4">
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-5 lg:gap-8">
          <ModuleNavigation />
          <div className="grid grid-cols-1 lg:col-span-3 transition duration-500 ease-in-out">
            <ListCuti />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
