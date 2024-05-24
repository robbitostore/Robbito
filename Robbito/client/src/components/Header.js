import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../utils/ThemeContext";
import { MdLightMode } from "react-icons/md";
import { IoMoon } from "react-icons/io5";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    to: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    to: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    to: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    to: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    to: "#",
    icon: ArrowPathIcon,
  },
];
// const callsToAction = [
//   { name: "Watch demo", to: "#", icon: PlayCircleIcon },
//   { name: "Contact", to: "#", icon: PhoneIcon },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const [active, setActive] = useState("1");

  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      setIsSticky(window.scrollY > 400);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsSticky(false);
      }, 3000);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleActive = (value, link) => {
    setActive(value);
    navigate(link);
  };

  return (
    <header
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-gray-200 text-black"
      } ${isSticky ? "sticky top-0 z-50" : ""}`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 py-2 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Robbito</span>
            <img
              className=" h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gray-50"
              src={theme === "dark" ? "/Robbito logo png.png" : "/Logo.jpg"}
              alt="Logo"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 "
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          {/* <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 ">
              Product
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                className={`absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl ${
                  theme === "dark"
                    ? "shadow-gray-800 bg-gray-950 text-white"
                    : " shadow-gray-300 bg-gray-100 text-black"
                } shadow-lg ring-1 ring-gray-900/5`}
              >
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className={`group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 ${
                        theme === "dark"
                          ? "hover:bg-gray-900"
                          : "hover:bg-white"
                      }  `}
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a to={item.to} className="block font-semibold ">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className={`grid grid-cols-2 divide-x shadow-md   bg-gray-100 ${
                    theme === "dark"
                      ? "bg-gray-950 shadow-gray-800 divide-gray-200/15"
                      : "bg-gray-50 shadow-gray-300 divide-gray-900/15"
                  }`}
                >
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      to={item.to}
                      className={`flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6   ${
                        theme === "dark"
                          ? "hover:bg-gray-900 text-gray-100"
                          : "hover:bg-white text-gray-900"
                      }`}
                    >
                      <item.icon
                        className="h-5 w-5 flex-none text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover> */}
          {/* Nav Item */}
          <span
            className={`text-sm font-semibold leading-6 cursor-pointer `}
            onClick={() => {
              navigate("/");
              setActive("1");
            }}
          >
            Home
          </span>

          <span
            className={`text-sm font-semibold leading-6 cursor-pointer `}
            onClick={() => {
              setActive("2");
              navigate("/services");
            }}
          >
            Services
          </span>

          <span
            className={`text-sm font-semibold leading-6  cursor-pointer  `}
            onClick={() => {
              setActive("3");
              navigate("/blogs");
            }}
            style={{ borderBottom: active === "3" ? "2px solid #8f6e00" : "" }}
          >
            Blog & News
          </span>
          <span
            className={`text-sm font-semibold leading-6  cursor-pointer  `}
            onClick={() => {
              setActive("4");
              navigate("/faq");
            }}
          >
            FAQ's
          </span>
          <span
            className={`text-sm font-semibold leading-6  cursor-pointer  `}
            onClick={() => {
              handleActive("5", "/contact");
            }}
          >
            Contact
          </span>
        </Popover.Group>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-5 items-center">
          {/* ------------Theme Change-------- */}
          <div
            className={`flex transition-all duration-200 items-center justify-center p-2  rounded-full shadow-md ${
              theme === "dark"
                ? "shadow-gray-800 bg-gray-300/10"
                : "shadow-gray-300 bg-gray-500/10"
            } shadow-gray-300`}
          >
            {" "}
            <span
              onClick={() => {
                toggleTheme();
              }}
              className="transition-all duration-200"
            >
              {theme === "light" ? (
                <IoMoon className="h-6 w-6 text-dark-800 cursor-pointer" />
              ) : (
                <MdLightMode className="h-6 w-6 text-yellow-500 cursor-pointer" />
              )}
            </span>
          </div>
          <button className="btn" onClick={() => navigate("/create/order")}>
            Order Now
          </button>
          {/* ----------Theme Change---------- */}
          {/* <Link to="#" className="text-sm font-semibold leading-6 ">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link> */}
        </div>
      </nav>

      {/* ----------------------Mobile View----------------- */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel
          className={`fixed inset-y-0 right-0 z-10 w-full overflow-y-auto ${
            theme === "dark"
              ? "bg-gray-950 text-white"
              : "bg-white text-gray-950"
          } px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10`}
        >
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Robbito</span>
              <img
                className="h-12 w-12 rounded-full bg-gray-50"
                src={theme === "dark" ? "/Robbito logo png.png" : "/Logo.jpg"}
                alt="Logo"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 "
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {/* <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={`flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7  ${
                          theme === "dark"
                            ? "hover:bg-gray-800"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        Product
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            to={item.to}
                            className={`block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7  ${
                              theme === "dark"
                                ? "hover:bg-gray-800"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure> */}
                <Link
                  to="/"
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  ${
                    theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/services"
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  ${
                    theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  Services
                </Link>
                <Link
                  to="/blogs"
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  ${
                    theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  Blogs & News
                </Link>
                <Link
                  to="/faq"
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  ${
                    theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  FAQs
                </Link>
                <Link
                  to="/contact"
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  ${
                    theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  Contact
                </Link>
              </div>
              {/*  */}
              <div className="py-6 ">
                {/* ------------Theme Change-------- */}
                <div
                  className={`absolute top-[1.8rem] right-[5rem] z-30 flex transition-all duration-200 items-center justify-center p-[4px]  rounded-full shadow-md ${
                    theme === "dark"
                      ? "shadow-gray-800 bg-gray-300/10"
                      : "shadow-gray-300 bg-gray-500/10"
                  } shadow-gray-300`}
                >
                  <span
                    onClick={() => {
                      toggleTheme();
                    }}
                    className="transition-all duration-200"
                  >
                    {theme === "light" ? (
                      <IoMoon className="h-6 w-6 text-dark-900 cursor-pointer" />
                    ) : (
                      <MdLightMode className="h-6 w-6 text-yellow-500 cursor-pointer" />
                    )}
                  </span>
                </div>

                {/* ----------Theme Change---------- */}
                <button
                  className="btn"
                  onClick={() => navigate("/create/order")}
                >
                  Order Now
                </button>
                {/* <Link
                  to="#"
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  ${
                    theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  Log in
                </Link> */}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
