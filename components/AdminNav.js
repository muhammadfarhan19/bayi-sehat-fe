import { ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";

const navigation = [
  { name: "Daftar Pengguna", href: "/admin", current: true },
  { name: "Manajemen Akses", href: "/admin/manajemen", current: false },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AdminNav = () => {
  return (
    <nav className="space-y-1" aria-label="Sidebar">
      {navigation.map((item) => (
        <>
          <Link href={item.href}>
            <a
              key={item.name}
              className={classNames(
                item.current
                  ? "bg-gray-100 text-gray-900 py-3"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                "group flex items-center px-3 py-3 text-sm font-medium rounded-md"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              <span className="truncate">{item.name}</span>
              {item.count ? (
                <span
                  className={classNames(
                    item.current
                      ? "bg-white"
                      : "bg-gray-100 group-hover:bg-gray-200",
                    "ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
                  )}
                >
                  {item.count}
                </span>
              ) : null}
              {item.treeview ? (
                <ChevronRightIcon className="ml-auto h-5 inline-block py-0.5 px-3 text-xs rounded-full"></ChevronRightIcon>
              ) : null}
              <hr />
            </a>
          </Link>
        </>
      ))}
    </nav>
  );
};

export default AdminNav;
