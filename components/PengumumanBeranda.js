import { Tab } from "@headlessui/react";
import Link from "next/link";
import { UserGroupIcon , PencilAltIcon, ClockIcon} from "@heroicons/react/solid";
const PengumumanBeranda = () => {
  const data = [
    {
      id: "1",
      judul: "Pengumuman 1",
      isi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo facere dolorum, eum blanditiis natus sit at corporis earum eos voluptas aut alias optio nesciunt modi magni incidunt velit consequuntur similique.",
      lampiran: "",
      created_at:'2021-08-12T17:22:46.143105+07:00',
      created_by:'system',
      unit_kerja: "Sekretariat Direktorat Jenderal Dikti",
    },
    {
      id: "2",
      judul: "Pengumuman 2",
      isi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti voluptatibus tempore obcaecati fuga labore quos repudiandae soluta, accusantium ab ipsum consequatur aspernatur cupiditate? Dignissimos, voluptatem? Commodi tenetur necessitatibus fugiat voluptates incidunt cumque voluptas, non illum, dicta voluptatem molestias, adipisci architecto!",
      lampiran: "",
      created_at:'2021-08-12T17:22:46.143105+07:00',
      created_by:'system',
      unit_kerja: "Tata Usaha Setditjen",
    },

    {
      id: "3",
      judul: "Pengumuman 3",
      isi: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium ipsa esse quas porro earum corrupti quidem sequi, excepturi cum est, eveniet odit, rerum illum facilis distinctio sint repellat ab? Cum obcaecati dicta incidunt pariatur ullam rem minima ab, atque esse dolorum eligendi illum repellat delectus dolorem id possimus. Quibusdam, ratione?",
      lampiran: "",
      created_at:'2021-08-12T17:22:46.143105+07:00',
      created_by:'system',
      unit_kerja: "Data dan Informasi Setditjen",
    },
  ];

  function tanggal(date) {
    let res = new Date(date)
    res = res.toLocaleDateString('id-ID',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) +' '+ res.toLocaleTimeString()
    return res
  }
  return (
    <div className="rounded-3xl lg:rounded-lg bg-white overflow-hidden shadow mb-3 p-5">
      <h3 className="text-lg font-bold mb-3 text-center sm:text-left">
        Pengumuman
      </h3>

      <Tab.Group>
        <Tab.Panels>
          {data.map((dt) => (
            <Tab.Panel className="my-3">
              <h4 className="font-medium">{dt.judul}</h4>
              <p className="text-sm">{dt.isi}</p>
              <a href="#" className="text-xs text-indigo-600 hover:underline">
                Lampiran
              </a>

              <div className="my-3">
                <div className="text-xs flex">
                  <UserGroupIcon className="h-3 w-3 mr-2" /> {dt.unit_kerja}
                </div>
                <div className="text-xs flex">
                  <PencilAltIcon className="h-3 w-3 mr-2" /> {dt.created_by}
                </div>
                <div className="text-xs flex">
                  <ClockIcon className="h-3 w-3 mr-2" /> {tanggal(dt.created_at)}
                </div>
              </div>

            </Tab.Panel>
          ))}
        </Tab.Panels>
        <Tab.List>
          {data.map((dt, idx) => (
            <Tab
              className={({ selected }) =>
                selected
                  ? "rounded-full focus:outline-none  text-xs h-7 w-7 mx-1 text-gray-50 items-center justify-center bg-gray-700"
                  : "rounded-full focus:outline-none  text-xs h-7 w-7  mx-1 text-gray-700 items-center justify-center bg-gray-50 hover:bg-gray-200"
              }
            >
              {idx + 1}
            </Tab>
          ))}
          <Link href="/pengumuman">
            <a className="rounded-full focus:outline-none focus:bg-opacity-50 text-xs text-gray-700 hover:text-indigo-600 px-4 py-2">
              Lihat semua
            </a>
          </Link>
        </Tab.List>
      </Tab.Group>
    </div>
  );
};

export default PengumumanBeranda;
