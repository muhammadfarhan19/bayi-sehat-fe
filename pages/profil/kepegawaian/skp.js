import React from "react";
import MainLayout from "../../../components/layouts/MainLayout";
import ProfilNav from "../../../components/ProfilNav";

function skp(props) {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-4 lg:gap-8">
          <div className="grid grid-cols-1 gap-4 lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <ProfilNav />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-5">
              <div className="text-xl font-medium">Sasaran Kerja Pegawai</div>
            </div>
            <div className="bg-white rounded-lg shadow p-5">
              <div className="mb-3">
                <div className="font-semibold mb-2">
                  Perkembangan Sasaran Kerja
                </div>
                <hr />
              </div>
              <div className="mb-3">
                <div className="grid grid-cols-4 mb-2">
                  <div className="text-sm col-span-3">Dokumen</div>
                  <div className="text-sm text-right">
                    4/6
                    <span className="py-1 px-2 bg-gray-200 rounded ml-3">60%</span>
                  </div>
                </div>
                <hr />
              </div>
              <div className="mb-3">
                <div className="grid grid-cols-4 mb-2">
                  <div className="text-sm col-span-3">Proposal</div>
                  <div className="text-sm text-right">
                    4/6
                    <span className="py-1 px-2 bg-gray-200 rounded ml-3">60%</span>
                  </div>
                </div>
                <hr />
              </div>
              <div className="mb-3">
                <div className="grid grid-cols-4 mb-2">
                  <div className="text-sm col-span-3">Kegiatan</div>
                  <div className="text-sm text-right">
                    4/6
                    <span className="py-1 px-2 bg-gray-200 rounded ml-3">60%</span>
                  </div>
                </div>
                <hr />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-5">
              <div className="mb-3">
                <div className="font-semibold mb-2">
                  Uraian Tugas Jabatan
                </div>
                <hr />
              </div>
              <div className="mb-3">
                <div className="grid grid-cols-1 sm:grid-cols-4 mb-2">
                  <div className="text-sm sm:col-span-3 mb-3 sm:mb-0">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores nulla blanditiis nisi. Ipsa at rerum recusandae laudantium officia accusamus, repudiandae, excepturi nam sapiente, eius voluptate exercitationem inventore quae nisi ipsam.</div>
                  <div className="text-sm text-center sm:text-right">
                      Dokumen
                    4/6
                    <span className="py-1 px-2 bg-gray-200 rounded ml-3">60%</span>
                  </div>
                </div>
                <hr />
              </div>
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default skp;
