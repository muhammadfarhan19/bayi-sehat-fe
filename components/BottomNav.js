import {
  CalendarIcon,
  UserIcon,
  HomeIcon,
  DatabaseIcon,
  TemplateIcon,
} from "@heroicons/react/solid";
import Link from "next/link";

function BottomNav(props) {
  return (
    <div className="mx-5 mb-2 fixed bottom-0 left-0 right-0 lg:hidden">
      <div className="flex w-full justify-center bg-white border border-gray-100 rounded-full py-3 shadow-2xl px-1">
        <Link href="/">
          <a className="flex-grow rounded-full text-center text-indigo-500">
            
              <HomeIcon className="w-6 h-6 mx-auto" />
              <div className="text-xs">Beranda</div>
            
          </a>
        </Link>
        <div className="flex-grow text-center text-gray-500">
          <Link href="#">
            <a href="">
              <CalendarIcon className="w-6 h-6 mx-auto" />
              <div className="text-xs">Kalender</div>
            </a>
          </Link>
        </div>
        <div className="flex-grow text-center text-gray-500">
          <Link href="/menu">
            <a href="">
              <TemplateIcon className="w-6 h-6 mx-auto" />
              <div className="text-xs">Administrasi</div>
            </a>
          </Link>
        </div>
        <div className="flex-grow text-center text-gray-500">
          <Link href="/profil">
            <a href="">
              <UserIcon className="w-6 h-6 mx-auto" />
              <div className="text-xs">Profil</div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BottomNav;
