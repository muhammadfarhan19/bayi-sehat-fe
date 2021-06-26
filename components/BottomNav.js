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
    <div className="mx-5 mb-2 fixed bottom-0 left-0 right-0">
      <div className="flex w-full justify-center bg-white rounded-full py-3 shadow px-1">
        <div className="flex-grow text-center text-indigo-500">
          <Link href="#">
            <a href="">
              <HomeIcon className="w-6 h-6 mx-auto" />
              <div className="text-xs">Beranda</div>
            </a>
          </Link>
        </div>
        <div className="flex-grow text-center text-gray-500">
          <Link href="#">
            <a href="">
              <CalendarIcon className="w-6 h-6 mx-auto" />
              <div className="text-xs">Kalender</div>
            </a>
          </Link>
        </div>
        <div className="flex-grow text-center text-gray-500">
          <Link href="#">
            <a href="">
              <TemplateIcon className="w-6 h-6 mx-auto" />
              <div className="text-xs">Admin</div>
            </a>
          </Link>
        </div>
        <div className="flex-grow text-center text-gray-500">
          <Link href="#">
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
