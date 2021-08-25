import { Fragment, useEffect, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  BellIcon,
  MenuIcon,
  XIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { ArrowCircleRightIcon, SearchIcon } from "@heroicons/react/solid";
import MainNav from "../navigation/AppNavigation";
import Head from "next/head";

import Link from "next/link";
import BottomNav from "../BottomNav";
import Cookies from "js-cookie";
import { useUser } from "../shared/fetcher/FetcherHooks";
import { useStore } from "react-redux";
import { useRouter } from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export async function getServerSideProps(context) {
  auth();

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function MainLayout({ children }) {
  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('refreshtoken');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Intra DIKTI</title>

        <link rel="manifest" href="/manifest.json" />

        <link rel="icon" href="/icon-192x192.png" type="image/png"></link>

        <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
        <meta name="theme-color" content="#317EFB" />

        <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
        <script
          defer
          src="https://cdn.tuk.dev/dev/light-dark-switch.js"
        ></script>
      </Head>
      <Popover as="header" className="pb-24 bg-indigo-600">
        {({ open }) => (
          <>
            <div className="container mx-auto px-3 md:px-0">
              <div className="flex py-5 flex items-center justify-center lg:justify-between">
                {/* Logo */}
                <div className=" left-0 flex-shrink-0 lg:static">
                  <Link href="/">
                    <a className="flex">
                      <span className="sr-only">DIKTI</span>
                      <img
                        className="md:h-12 h-8 w-auto"
                        src="https://dikti.kemdikbud.go.id/wp-content/uploads/2020/03/cropped-logo-dikbud.png"
                        alt="Workflow"
                      />
                      <div className="text-white my-auto ml-2 lg:block hidden font-nunito text-3xl tracking-wide font-semibold">
                        Intra DIKTI
                      </div>
                    </a>
                  </Link>
                </div>
                <div className="text-white my-auto mx-auto font-nunito text-lg lg:hidden tracking-wide font-semibold">
                  Intra DIKTI
                </div>

                {/* Right section on desktop */}
                <div className="ml-0">

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative flex-shrink-0">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="bg-white rounded-full flex text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://dikti.kemdikbud.go.id/wp-content/uploads/2020/03/cropped-logo-dikbud.png"
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right z-40 absolute -right-2 mt-2 w-64 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <Link href="/profil">
                                  <a
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "flex px-4 py-2 text-sm text-gray-700 "
                                    )}
                                  >
                                    <span className="rounded-full bg-gray-500 h-5 w-5">
                                      <img
                                        src="https://dikti.kemdikbud.go.id/wp-content/uploads/2020/03/cropped-logo-dikbud.png"
                                        className="h-5 w-5"
                                      />
                                    </span>
                                    <span className="ml-2">{user.nama}</span>
                                  </a>
                                </Link>
                              )}
                            </Menu.Item>
                            {/* <Menu.Item>
                              {({ active }) => (
                                <Link href="/profil">
                                  <a
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "flex px-4 py-2 text-sm text-gray-700 "
                                    )}
                                  >
                                    <ArrowCircleRightIcon className="h-5 w-5 text-gray-600" />
                                    <span className="ml-2">Role 1</span>
                                  </a>
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link href="/profil">
                                  <a
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "flex px-4 py-2 text-sm text-gray-700 "
                                    )}
                                  >
                                    <ArrowCircleRightIcon className="h-5 w-5 text-gray-600" />
                                    <span className="ml-2">Role 2</span>
                                  </a>
                                </Link>
                              )}
                            </Menu.Item> */}
                            <hr />
                            <Menu.Item>
                              {({ active }) => (
                                <Link href="/login">
                                  <a
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700 flex"
                                    )}
                                    onClick={handleLogout}
                                  >
                                    <LogoutIcon className="h-5 w-5 text-red-600" />
                                    <span className="ml-2 ">Keluar</span>
                                  </a>
                                </Link>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>

              </div>
              <MainNav />
            </div>

            <Transition.Root show={open} as={Fragment}>
              <div className="lg:hidden">
                <Transition.Child
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="duration-150 ease-in"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Overlay
                    static
                    className="z-20 fixed inset-0 bg-black bg-opacity-25"
                  />
                </Transition.Child>

                <Transition.Child
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="duration-150 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Popover.Panel
                    focus
                    static
                    className="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top"
                  >
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                      <div className="pt-3 pb-2">
                        <div className="flex items-center justify-between px-4">
                          <div>
                            <img
                              className="h-8 w-auto"
                              src="https://dikti.kemdikbud.go.id/wp-content/uploads/2020/03/cropped-logo-dikbud.png"
                              alt="Workflow"
                            />
                          </div>
                          <div className="-mr-2">
                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none ">
                              <span className="sr-only">Close menu</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                          </div>
                        </div>
                        <div className="mt-3 px-2 space-y-1">
                          <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                          >
                            Home
                          </a>
                          <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                          >
                            Profile
                          </a>
                          <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                          >
                            Resources
                          </a>
                          <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                          >
                            Company Directory
                          </a>
                        </div>
                      </div>
                      <div className="pt-4 pb-2">
                        <div className="flex items-center px-5">
                          <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/User-Pict-Profil.svg/682px-User-Pict-Profil.svg.png"
                              alt=""
                            />
                          </div>
                          <div className="ml-3 min-w-0 flex-1">
                            <div className="text-base font-medium text-gray-800 truncate">
                              Rebecca Nicholas
                            </div>
                            <div className="text-sm font-medium text-gray-500 truncate">
                              rebecca.nicholas@example.com
                            </div>
                          </div>
                          <button className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="mt-3 px-2 space-y-1">
                          <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                          >
                            Your Profile
                          </a>
                          <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                          >
                            Settings
                          </a>
                          <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                          >
                            Sign out
                          </a>
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition.Child>
              </div>
            </Transition.Root>
          </>
        )}
      </Popover>
      
      <main className="-mt-24 pb-8 container mx-auto ">{children}</main>
      
      <div className="mx-3"></div>
      
      <BottomNav />

      <footer>
        <div className="container mx-auto">
          <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
            <span className="block sm:inline">
              &copy; 2021 Tata Usaha Setditjen DIKTI.
            </span>{" "}
            <span className="block sm:inline">All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
