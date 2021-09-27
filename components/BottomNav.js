import {
  CalendarIcon,
  UserIcon,
  HomeIcon,
  DatabaseIcon,
  TemplateIcon,
} from "@heroicons/react/solid";
import Link from "next/link";

import { useRouter } from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function BottomNav(props) {
  const router = useRouter();
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden">
      <div className="flex w-full justify-center bg-white rounded-t-3xl border border-gray-100 py-3 shadow-2xl px-1">
        <Link href="/">
          <a
            className={classNames(
              router.asPath == "/" ? "text-indigo-500" : "text-gray-500",
              "flex-grow rounded-full text-center "
            )}
          >
            <HomeIcon className="w-6 h-6 mx-auto" />
            <div className="text-xs">Beranda</div>
          </a>
        </Link>
        <Link href="/kalender">
          <a className={classNames(
              router.asPath == "/kalender" ? "text-indigo-500" : "text-gray-500",
              "flex-grow rounded-full text-center "
            )}>
            <CalendarIcon className="w-6 h-6 mx-auto" />
            <div className="text-xs">Kalender</div>
          </a>
        </Link>
        {/* <Link href="/menu">
          <a className="flex-grow rounded-full text-center text-gray-100">
            <img
              className="w-16 h-16 -my-4 p-2 rounded-full mx-auto"
              src="https://dikti.kemdikbud.go.id/wp-content/uploads/2020/03/cropped-logo-dikbud.png"
              alt="Workflow"
            />
          </a>
        </Link> */}
        <Link href="/menu">
          <a
            className={classNames(
              router.asPath == "/menu" ? "text-indigo-500" : "text-gray-500",
              "flex-grow rounded-full text-center "
            )}
          >
            <TemplateIcon className="w-6 h-6 mx-auto" />
            <div className="text-xs">Menu</div>
          </a>
        </Link>
        <Link href="/profil">
        <a
            className={classNames(
              router.asPath == "/profil" ? "text-indigo-500" : "text-gray-500",
              "flex-grow rounded-full text-center "
            )}
          >
            <UserIcon className="w-6 h-6 mx-auto" />
            <div className="text-xs">Profil</div>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default BottomNav;
