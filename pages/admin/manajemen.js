import Link from "next/link";
import React from "react";
import AdminNav from "../../components/AdminNav";
import MainLayout from "../../components/layouts/MainLayout";
const AccessGroup = [
  {
    name: "Admin TU",
  },
  {
    name: "Staff TU",
  },
];

function manajemen(props) {
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
            <div className="rounded-lg bg-white shadow border-b border-gray-200 mb-3 p-5">
              <div className="flex mb-2">
                <div className="text-lg font-medium ">Akses Grup </div>
                <div className="  ml-auto">
                  <button className="bg-gray-600 py-2 px-5 rounded-lg  hover:bg-gray-700 text-white">
                    Tambah Akses Grup
                  </button>
                </div>
              </div>
              <hr />
              {AccessGroup.map((akses, aksesId) => (
                <div className="">
                  <div className="flex py-3">
                    <div className="my-auto">{akses.name}</div>
                    <div className="ml-auto">
                      <Link href="/admin/editakses">
                        <button className="bg-gray-600 text-xs py-2 px-5 rounded-lg  hover:bg-gray-700 text-white">
                          Lihat
                        </button>
                      </Link>
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

export default manajemen;
