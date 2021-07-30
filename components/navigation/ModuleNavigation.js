import { ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useRouter } from "next/router";
import { useModule } from "../shared/fetcher/FetcherHooks";
import { Disclosure } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ModuleNavigation = ({menu}) => {
  const module = useModule();
  const [data, setData] = useState([]);
  const router = useRouter();
  const app = router.pathname.toString().split("/")[1];
  const [count, setCount] = useState(0);

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
    if(menu){
      setData(menu)
    }else{
      (async () => {
        try {
          const getModule = await module(app);
          setData(getModule);
          console.log(getModule)
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 lg:col-span-1 transition duration-500 ease-in-out">
      <section aria-labelledby="section-1-title">
        <div className="rounded-lg bg-white shadow border-b border-gray-200 mb-3">
          <nav className="space-y-1" aria-label="Sidebar">
            {data.map((item, i) =>
              !item.children ? (
                <div key={item.name} className="transition duration-500 ease-in">
                  <Link href={item.href}>
                    <a
                      className={classNames(
                        router.asPath == item.href
                          ? "bg-gray-50 py-3  border-2 border-gray-50"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "transition duration-300 ease-in-out transform   hover:scale-105 group flex items-center px-3 py-3 text-sm rounded-md font-medium active:ring-0 border-2 border-white"
                      )}
                    >
                      {item.name}
                    </a>
                  </Link>
                </div>
              ) : (
                <Disclosure as="div" key={item.name} className="space-y-1">
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={classNames(
                          router.asPath == item.href
                            ? "bg-gray-100 text-gray-900 py-3"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "transition duration-300 ease-in-out transform  hover:scale-105 group flex items-center px-3 py-3 text-sm font-medium rounded-md w-full focus:outline-none focus:bg-gray-50"
                        )}
                      >
                        {item.name}
                        <ChevronRightIcon
                          className={classNames(
                            open ? "text-gray-400 rotate-90" : "text-gray-300",
                            "ml-auto flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150"
                          )}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="space-y-1">
                        {item.children.map((subItem) => (
                          <Link
                            href={subItem.href}
                          >
                            <a
                              key={subItem.name}
                              className="group w-full flex items-center pl-10 pr-2 py-3 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 border-b border-gray-100"
                            >
                              {subItem.name}
                            </a>
                          </Link>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              )
            )}
          </nav>
        </div>
      </section>
    </div>
  );
};

export default ModuleNavigation;
