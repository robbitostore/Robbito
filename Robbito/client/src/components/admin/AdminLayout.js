import React, { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import Header from "../Header";
import Sidebar from "./Sidebar";
import { useAuth } from "../../utils/authContext";
import Spinner from "../../utils/Spinner";
import { useTheme } from "../../utils/ThemeContext";
import ServiceModal from "../../pages/admin/services/ServiceModal";
import GalleryModal from "../../pages/admin/gallery/GalleryModal";

export default function AdminLayout({
  children,
  isShow,
  setIsShow,
  serviceId,
  getAllService,
  setServiceId,
  open,
  setOpen,
  getAllGallery,
}) {
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(true);
  const { theme } = useTheme();
  const { auth } = useAuth();
  if (!auth?.token || auth?.user?.role !== "admin") {
    return <Spinner />;
  }
  return (
    <>
      <div className="relative w-full h-screen">
        <Header />
        <div
          className={` w-full flex-1 gap-1 flex h-screen  fixed top-0 left-0 overflow-hidden ${
            theme === "dark" ? "bg-gray-950" : "bg-white"
          } mt-[4rem] sm:mt-[4.5rem]`}
        >
          {!show && (
            <div className=" flex sm:hidden  absolute top-2 left-3 z-50">
              <IoMenu
                onClick={() => setShow(true)}
                size={25}
                className="hover:text-blue-500 transition-all duration-150"
              />
            </div>
          )}
          <div
            className={`hidden sm:flex  transition-all duration-200 ${
              hide ? "w-[5rem]" : "w-[13rem]"
            }`}
          >
            <Sidebar hide={hide} setHide={setHide} />
          </div>
          {show && (
            <div className=" absolute top-0 left-0 flex   sm:hidden z-20 w-[13rem] pt-[2rem]  border-r-[2px]  border-gray-600">
              <div className="absolute top-2 right-3">
                <IoClose
                  onClick={() => setShow(false)}
                  size={25}
                  className="hover:text-blue-500 transition-all duration-150"
                />
              </div>
              <Sidebar />
            </div>
          )}
          <div className="flex-[1.8] border-r-red-500  pt-[2.5rem] overflow-x-auto hidden1  sm:pt-0 border-l-[2px]  ">
            {children}
          </div>
        </div>
        {/* ---------Add Modal-----*/}
        {isShow && (
          <div className="absolute top-0 left-0 py-4 w-full h-full bg-black/90 flex items-center justify-center">
            <ServiceModal
              setIsShow={setIsShow}
              serviceId={serviceId}
              getAllService={getAllService}
              setServiceId={setServiceId}
            />
          </div>
        )}

        {open && (
          <div className="absolute top-0 left-0 py-4 w-full h-full bg-black/90 flex items-center justify-center">
            <GalleryModal
              setIsShow={setOpen}
              serviceId={serviceId}
              getAllGallery={getAllGallery}
              setServiceId={setServiceId}
            />
          </div>
        )}
      </div>
    </>
  );
}
