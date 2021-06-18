import Link from "next/link";
const tasks = [
  {
    subjek: "Pengajuan Cuti",
    nilai: "20",
    link: "#",
  },
  {
    subjek: "Klaim Kehadiran",
    nilai: "15",
    link: "#",
  },
  {
    subjek: "Kenaikan Pangkat",
    nilai: "15",
    link: "#",
  },
];

function TaskKepegawaian() {
  return (
    <div className="rounded-lg bg-white overflow-hidden shadow mb-3 p-5">
      <h3 className="text-lg font-semibold mb-3">Kepegawaian</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
    </div>
  );
}

export default TaskKepegawaian;
