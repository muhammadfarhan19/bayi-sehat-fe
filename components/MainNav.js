import Link from "next/link";
import { useRouter } from 'next/router'

const navLinks = [
  { title: "Beranda", active: true, link: "/" },
  { title: "Kepegawaian", active: false, link: "/kepegawaian" },
  { title: "Keuangan", active: false, link: "/keuangan" },
  { title: "Barang Milik Negara", active: false, link: "/barang-milik-negara" },
  { title: "Naskah Dinas Elektronik", active: false, link: "/naskah-dinas-elektronik" },
  { title: "Monitoring Program Kegiatan", active: false, link: "/monitoring-program-kegiatan" },
  { title: "Evaluasi Organisasi", active: false, link: "/evaluasi-organisasi" },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function MainNav() {
    const router = useRouter()
  return (
    <div className="hidden lg:block border-t border-white border-opacity-20 py-5">
      <div className="grid grid-cols-2 gap-8 items-center">
        <div className="col-span-2">
          <nav className="flex px-2">
            {navLinks.map((link) => (
              <Link href={link.link}>
                <a
                  key={link.title}
                  className={classNames(
                    router.asPath == link.link  ? "text-white bg-opacity-10" : "text-indigo-100",
                    "text-sm font-medium rounded-md bg-white bg-opacity-0 px-5 mr-1 py-1 hover:bg-opacity-10"
                  )}
                  aria-current={link.active ? "page" : "false"}
                >
                  {link.title}
                </a>
              </Link>
            ))}
          </nav>
        </div>
        {/* <div>
            <div className="max-w-md w-full mx-auto">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative text-white focus-within:text-gray-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <SearchIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  className="block w-full bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
                  placeholder="Search"
                  type="search"
                  name="search"
                />
              </div>
            </div>
          </div> */}
      </div>
    </div>
  );
}

export default MainNav;
