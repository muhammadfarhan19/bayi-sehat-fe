import { ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, shallowEqual } from 'react-redux';
import { useRouter } from "next/router";
import { useModule } from '../shared/fetcher/FetcherHooks';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ModuleNavigation = () => {
  const module = useModule();
  const [data, setData] = useState([])
  const router = useRouter();
  const app = router.pathname.toString().split('/')[1];

  //   const [data , setData] = useState([]);
  //   const getModule = useSelector(state => {
  //     return {
  //       module: state.ModuleReducer.module,
  //     };
  //   }, shallowEqual);


  //   useEffect(() => {
  //     setData(getModule.module)
  //   }, [getModule]);

  useEffect(() => {
    (async () => {
      try {
        const getModule = await module(app);
        setData(getModule)
      } catch (e) {
        console.log(e)
      }
    })();
  }, [])

  return (
    <div className="grid grid-cols-1 gap-4 lg:col-span-1">
      <section aria-labelledby="section-1-title">
        <div className="rounded-lg bg-white shadow border-b border-gray-200 mb-3">
          <nav className="space-y-1" aria-label="Sidebar">
            {data.map((item) => (
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
        </div>
      </section>
    </div>
  );
};

export default ModuleNavigation;
