import MainLayout from "../components/layouts/MainLayout";
import {
  CalendarIcon,
  LocationMarkerIcon,
  UsersIcon,
  ClockIcon,
} from "@heroicons/react/solid";


import Link from "next/link";
import Head from "next/head";
import TambahLogKegiatan from "../components/TambahLogKegiatan";
import TaskKepegawaian from "../components/TaskKepegawaian";
import PengumumanBeranda from "../components/PengumumanBeranda";
import NavIconBeranda from "../components/NavIconBeranda";
import KartuProfilBeranda from "../components/KartuProfilBeranda";
import KegiatanHariIni from "../components/KegiatanHariIni";
import InfoKehadiranDashboard from "../components/InfoKehadiranDashboard";


const navigation = [
  { name: "Profil", href: "#", current: true, count: "5" },
  { name: "Kalender Kegiatan", href: "#", current: false },
  { name: "Gaji dan Honor", href: "#", current: false, count: "19" },
  { name: "Kepegawaian", href: "#", current: false, count: "20+" },
  { name: "Barang Milik Negara", href: "#", current: false },
  { name: "Pengaturan", href: "#", current: false },
];
const user = {
  name: "Chelsea Hagon",
  handle: "chelseahagon",
  email: "chelseahagon@example.com",
  role: "Human Resources Manager",
  imageId: "1550525811-e5869dd03032",
  imageUrl:
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const positions = [
  {
    id: 0,
    title: "WFO 1",
    type: "Wajib",
    location: "Luring",
    department: "Tata Usaha",
    closeDate: "2020-01-07",
    closeDateFull: "7:30 - 15:30",
  },
  {
    id: 1,
    title: "Rapat Pengumuman PKKM",
    type: "Narasumber",
    location: "Luring",
    department: "Tata Usaha",
    closeDate: "2020-01-07",
    closeDateFull: "19:00",
  },
  {
    id: 2,
    title: "Rapat Pengembangan Super Apps DIKTI",
    type: "Peserta",
    location: "Luring",
    department: "Data dan Informasi",
    closeDate: "2020-01-07",
    closeDateFull: "19:00",
  },
  {
    id: 3,
    title: "Rapat Pengembangan Sistem Manajemen Reviewer",
    type: "Peserta",
    location: "Daring",
    department: "Tata Usaha",
    closeDate: "2020-01-14",
    closeDateFull: "19:00",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  return (
    <MainLayout>
      <Head>
        <title>Intra DIKTI</title>
      </Head>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">Page title</h1>
        {/* Main 3 column grid */}
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          {/* Left column */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-1">
            <section aria-labelledby="section-1-title">
              <h2 className="sr-only" id="section-1-title">
                lorem mantap
              </h2>

              {/* Profile Info */}
              <div className="rounded-lg bg-white overflow-hidden shadow mb-3">
                <h2 className="sr-only" id="profile-overview-title">
                  Profile Overview
                </h2>
                <KartuProfilBeranda></KartuProfilBeranda>
                
              </div>
              <KegiatanHariIni/>
            </section>
          </div>
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus optio, aspernatur et, at dolorem aliquid ut saepe culpa tempora vero earum ducimus vitae obcaecati quos, architecto cum incidunt reprehenderit. Debitis, sapiente saepe. Aliquid corrupti sunt suscipit quo, est similique atque, porro sint vero at voluptatem necessitatibus sapiente enim officia, pariatur praesentium. Cumque dolorem dolorum vitae unde alias a iure nisi sapiente commodi? Explicabo tempora, ea aliquid soluta, culpa necessitatibus atque quaerat deleniti consequatur itaque recusandae porro qui deserunt odit dolorum ratione error totam amet est impedit dolorem alias harum quis ut? Iste fugit earum commodi facere id adipisci veritatis dolorum esse. Id, non. Suscipit adipisci laudantium esse at nesciunt ex deserunt velit earum inventore maxime accusamus quae dignissimos, odio exercitationem deleniti sapiente ad quia possimus dolor assumenda autem? Fugit tempora dignissimos eos corrupti iure vitae consectetur atque! Nulla, excepturi consectetur? Itaque laudantium reiciendis, provident non eveniet impedit alias earum. Saepe enim nostrum eaque beatae? Numquam vel culpa voluptas dolor ipsum at beatae deleniti ullam eveniet, voluptate eaque cum, autem alias doloribus. Cumque earum autem molestiae debitis cupiditate nam eum porro voluptatem sit hic blanditiis, quibusdam quaerat sapiente atque harum! Ipsum nulla itaque necessitatibus sed enim sint exercitationem aperiam corporis! Rem, quia nobis doloribus beatae dolor nisi. Recusandae aspernatur facilis dicta quam quasi perspiciatis nisi molestiae et praesentium at repellat quisquam amet veniam suscipit labore harum temporibus maiores sunt error natus, debitis quibusdam nemo corporis beatae. Impedit repudiandae commodi deleniti, unde sit odit nobis, consectetur voluptatem placeat dolore at ea nisi mollitia quia beatae laudantium dolores, amet vel assumenda praesentium? Ad, impedit. Natus, ad provident. Necessitatibus vero explicabo incidunt repellendus doloribus ratione nobis architecto. Numquam tenetur veniam architecto eaque fugiat vitae ea laborum nulla, maiores cum, nesciunt quae. Voluptates quisquam deleniti error laboriosam quod eaque ex officiis fugiat nulla exercitationem et, eum quasi facere tempore fuga. Molestiae asperiores sit pariatur minus aliquam eaque? Repellat, fugiat! Expedita sint libero ducimus aut autem optio facilis dolorem dicta repellendus consectetur, aperiam quasi culpa! Tempora nesciunt voluptatibus assumenda maiores tenetur, iure omnis ratione quis vitae exercitationem, numquam eos dolore sed voluptas dicta dolor magnam eveniet mollitia, facilis nostrum quibusdam harum nobis veritatis alias. Distinctio rerum similique modi maxime temporibus iusto mollitia, odio, et nisi necessitatibus, sapiente explicabo labore fugiat repellat unde animi. Placeat sequi officia, dolorum ab deleniti incidunt quas quasi facere fugiat, voluptatibus facilis, ipsa asperiores magnam. Quae, quas? Nesciunt hic repellat expedita sint! Architecto aliquam voluptatum officiis, facere pariatur at minima numquam ratione eligendi praesentium incidunt voluptatibus unde tempore illo illum iste dicta atque officia laboriosam quia! Vero ex labore cumque et rem culpa commodi ipsam itaque similique reiciendis dignissimos maxime, ut tenetur amet delectus aliquam eius recusandae distinctio quo asperiores doloremque non quod impedit. Quibusdam officia porro dolorem aspernatur enim! Ullam necessitatibus tempore in perferendis vel, ipsa nostrum, harum autem quam illo inventore, voluptate amet impedit atque accusamus dolorum voluptatibus iure adipisci veritatis officiis facere! Laborum reprehenderit doloremque in esse ea harum, dolor consequatur minus fugiat accusamus corrupti quisquam? Odio veniam corporis necessitatibus! Dolores quo, minima nisi quidem libero impedit totam, quis molestiae error architecto labore odit consequuntur. Exercitationem eos distinctio dolor iure debitis nostrum, inventore aliquid eveniet placeat quidem nam veritatis quas dolores ipsa numquam. Accusamus quibusdam repellendus quaerat magnam tempora placeat ratione eos quas obcaecati non unde saepe cum sunt facere sapiente inventore debitis eaque rerum, aliquam adipisci cupiditate libero sint vero. Modi blanditiis eaque consequatur maiores molestias cupiditate fugit ex quaerat sit, nisi ratione quisquam esse aspernatur delectus, sed et. Earum aperiam placeat nostrum, explicabo similique pariatur sequi! Recusandae obcaecati dolores, nisi est explicabo eligendi quia illo molestiae doloremque, eos iure nihil nemo atque quibusdam modi iusto rerum eveniet delectus. Natus sint molestiae quasi sapiente velit, voluptates sed hic, dolores deleniti, distinctio ea? Voluptatibus dolores magni vitae, rerum, neque molestiae assumenda praesentium quibusdam possimus autem officiis quidem libero atque aliquam ad impedit doloribus dignissimos. Dicta enim consequatur placeat ex quas aperiam, voluptate iure dolores sint, molestiae earum deserunt esse recusandae officiis accusantium deleniti, reiciendis aut! Saepe, laborum culpa numquam atque et harum cumque incidunt possimus maiores minima nobis? Nesciunt molestiae libero officia adipisci quos quaerat aliquam repellendus natus soluta suscipit et, praesentium, autem aliquid est optio provident a minima repellat nam. Molestiae repudiandae illum voluptate enim incidunt nisi esse illo dicta nihil. Natus deserunt voluptate aliquam voluptas explicabo tempora, quaerat odit aut nulla, repellendus ex autem cum voluptates. Odit adipisci dolor quam, ullam rerum temporibus totam necessitatibus excepturi quae quas accusamus quisquam possimus perferendis nihil eveniet. At cupiditate repellendus facilis, maiores esse non! Magnam officiis illum inventore minus quam odit labore libero dolore tempora facere! Repellat fugiat illum velit quis optio culpa sapiente, voluptatibus accusamus, cumque provident quasi unde. Consequatur neque fugiat, est delectus laboriosam ullam officia sed eos iusto sunt esse nemo deleniti doloribus quae architecto suscipit reprehenderit placeat nesciunt expedita rem eligendi enim earum asperiores! Debitis odit veritatis rem obcaecati eum a nostrum consectetur reprehenderit sit? Consequatur doloremque cumque error eveniet, consectetur debitis incidunt. Distinctio, repellendus. Magni, voluptate quasi, eveniet labore dolore ipsum ratione pariatur quia ex tempora amet esse accusantium dignissimos doloribus enim minus, distinctio repellendus cum veniam aspernatur voluptatibus exercitationem blanditiis corporis? Id, ipsum, rem corporis excepturi dolores maiores ratione et hic modi mollitia quibusdam! Aliquam molestias praesentium dolorem nihil repellat, delectus eligendi sed, voluptatibus, asperiores architecto in recusandae vel! Reiciendis iure sint vel corporis voluptatum eius officia iste est sapiente harum laborum esse doloribus natus vitae, quia reprehenderit veniam cumque adipisci? Natus accusamus earum tenetur consectetur ab magnam sapiente incidunt dicta, fuga ea alias nemo vel velit veritatis voluptate iste sunt ipsa vero quam dolorem? Voluptatum aliquam doloremque omnis explicabo dolor accusantium facere magni voluptates voluptatem, in non molestias at voluptas tempore odio quibusdam perferendis quas ab esse cumque labore? Ab vero, quaerat aut animi soluta dignissimos adipisci quasi quo tempore eum, illum consectetur. Maxime facere velit nisi optio adipisci saepe voluptas atque placeat aliquam omnis! Officiis culpa quas minima rem dolores ducimus quia minus? Sed, molestias! Exercitationem ullam voluptates nihil dicta ratione fugit.

          {/* Right column */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-2-title">
              <h2 className="sr-only" id="section-2-title">
                Section title
              </h2>
              <PengumumanBeranda />
              <NavIconBeranda />
              <TambahLogKegiatan />
              <TaskKepegawaian />
              <InfoKehadiranDashboard/>
              <div className="rounded-lg bg-white overflow-hidden shadow"></div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
