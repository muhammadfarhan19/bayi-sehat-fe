import React from "react";

export default function ExampleLineGraph() {

  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:col-span-4">
        <div className="rounded-lg bg-white shadow py-5 border-b border-gray-200  mb-3">
          <div className="flex items-center justify-center w-full ">
            <div className="w-full px-5">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="lg:flex w-full justify-between">
                    <h3 className="text-gray-600 dark:text-gray-400 leading-5 text-base md:text-xl font-bold">
                      Performa Keuangan
                </h3>
                    <div className="flex items-center justify-between lg:justify-start mt-2 md:mt-4 lg:mt-0">
                      <div className="lg:ml-14">
                        <div className="bg-gray-100 dark:bg-gray-700 ease-in duration-150 hover:bg-gray-200 py-1 px-3 rounded-lg">
                          <select className="text-xs text-gray-600 dark:text-gray-400 outline-none border-0  bg-transparent focus: focus:border-0">
                            <option className="leading-1">SetDitjenDikti</option>
                            <option className="leading-1">DitBelmawa</option>
                            <option className="leading-1">DitKelembagaan</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <canvas id="myChart" width="100%" height={50} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
