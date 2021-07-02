import React from "react";
import AdminNav from "../../components/AdminNav";
import MainLayout from "../../components/layouts/MainLayout";

function index(props) {
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
            <div className="rounded-lg bg-white shadow border-b border-gray-200 mb-3">
              <div className="flex ">
                <div className="-my-2 overflow-x-auto sm:mx-0 ">
                  <div className="py-2 align-start inline-block min-w-full sm:px-0 lg:px-0">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="w-full rounded-lg bg-gray-100">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Nama Pengguna
                            </th>

                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Nomor Telepon
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              User Group
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* {jabatans.map((jabatan, jabatanIdx) => (
                              <tr
                                key={jabatanIdx}
                                className={
                                  jabatanIdx % 2 === 0
                                    ? "bg-white hover:bg-gray-100"
                                    : "bg-gray-50 hover:bg-gray-100"
                                }
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                  {jabatan.kode}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                  {jabatan.kelas}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900 truncate">
                                  {jabatan.nama}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                  Struktural
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                  {jabatan.terisi}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                                  {jabatan.dibutuhkan}
                                </td>
                              </tr>
                            ))} */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default index;
