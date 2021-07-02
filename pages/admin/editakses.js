import React from "react";
import AdminNav from "../../components/AdminNav";
import MainLayout from "../../components/layouts/MainLayout";

const aksess = [
  {
    id: 1,
    nama: "Lihat Menu Kepegawaian",
  },
  {
    id: 2,
    nama: "Lihat Menu Keuangan",
  },
  {
    id: 2,
    nama: "Lihat Absen",
  },
];

function editakses(props) {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="">
            <div className="bg-white rounded-md ">
              <AdminNav />
            </div>
          </div>

          <div className="col-span-2">
            <div className="rounded-lg bg-white shadow border-b border-gray-200 p-5 mb-3">
              <div className="flex mb-3">
                <div className="text-lg font-medium">Admin TU</div>
              </div>
              <hr />
              {aksess.map((akses) => (
                <div className="">
                  <div className="flex py-3">
                    <label className="" for={"akses-"+akses.id}>
                      {akses.nama}
                    </label>
                    <div className="ml-auto">
                      <input type="checkbox" id={"akses-"+akses.id} />
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default editakses;
