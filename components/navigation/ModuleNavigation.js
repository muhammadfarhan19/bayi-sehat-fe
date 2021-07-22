import { ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, shallowEqual } from 'react-redux';
import { useRouter } from "next/router";
import { useModule } from '../shared/fetcher/FetcherHooks';
import { Disclosure } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ModuleNavigation = () => {
  const module = useModule();
  const [data, setData] = useState([])
  const router = useRouter();
  const app = router.pathname.toString().split('/')[1];
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
            {data.map((item, i) =>
              !item.children ? (
                <div key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      router.asPath == item.href
                        ? "bg-gray-100 text-gray-900 py-3"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "group flex items-center px-3 py-3 text-sm font-medium rounded-md"
                    )}
                  >
                    {item.name}
                  </a>
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
                          "group flex items-center px-3 py-3 text-sm font-medium rounded-md w-full"
                        )}
                      >

                        {item.name}
                        <ChevronRightIcon className={classNames(
                          open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                          'ml-auto flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
                        )} />
                      </Disclosure.Button>
                      <Disclosure.Panel className="space-y-1">
                        {item.children.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="group w-full flex items-center pl-10 pr-2 py-3 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                          >
                            {subItem.name}
                          </a>
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
