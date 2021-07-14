import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect,useState } from "react";
import { useApplication } from '../shared/fetcher/FetcherHooks';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function AppNavigation() {
  const app = useApplication();
  const [data , setData] = useState([])
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const getApp = await app();
        setData(getApp)
      } catch (e) {
        console.log(e)
      }
    })();
  }, [])
  
  return (
    <div className="hidden lg:block border-t border-white border-opacity-20 py-5">
      <div className="grid grid-cols-2 gap-8 items-center">
        <div className="col-span-2">
          <nav className="flex">
            {data.map((link) => (
              <Link href={link.link}>
                <a
                  key={link.title}
                  className={classNames(
                    router.asPath == link.link
                      ? "text-white bg-opacity-10"
                      : "text-indigo-100",
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
      </div>
    </div>
  );
}

export default AppNavigation;
