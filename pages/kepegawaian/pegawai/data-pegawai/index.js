import MainLayout from "../../../../components/layouts/MainLayout";
import ModuleNavigation from "../../../../components/navigation/ModuleNavigation";

export default function DataPegawaiPage() {
  return (
    <MainLayout>
      <div className="w-full lg:px-4">
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-5 lg:gap-8">
          <ModuleNavigation />
          <div className="grid grid-cols-1 gap-4 lg:col-span-4">
              
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
            cumque qui expedita tenetur ipsa tempore laboriosam blanditiis iusto
            velit commodi consectetur voluptate eveniet, saepe dolores corporis
            modi animi sapiente ducimus.
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
