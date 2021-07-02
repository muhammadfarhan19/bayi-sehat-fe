import React from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/solid";
const tasks = [
  {
    subjek: "Pengajuan cuti",
    nilai: "20",
    link: "#",
  },
  {
    subjek: "Klaim kehadiran",
    nilai: "15",
    link: "#",
  },
  {
    subjek: "Tidak hadir",
    nilai: "16",
    link: "#",
  },
];

function InfoKehadiranDashboard(props) {
  return (
    <div className="rounded-lg bg-white overflow-hidden shadow mb-3 p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Kehadiran</h3>
        <button className="bg-indigo-600 rounded-lg text-gray-100 px-6 py-2 text-xs hover:bg-indigo-700">
          Detail
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
        {tasks.map((task) => (
          <Link href={task.link}>
            <a className="rounded hover:bg-gray-100 px-3 py-5">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-indigo-600 rounded text-center text-white items-center flex">
                  <div className="mx-auto text-lg font-bold">{task.nilai}</div>
                </div>
                <div className="col-span-2">
                  <div className="font-semibold text-sm">{task.subjek}</div>
                  <div className="text-xs text-gray-500">Belum ditanggapi</div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <button className="text-center flex justify-center w-full border border-gray-200 rounded-lg py-1 hover:bg-gray-100">
        <ChevronDownIcon className="w-6" />
      </button>
    </div>
  );
}

export default InfoKehadiranDashboard;
