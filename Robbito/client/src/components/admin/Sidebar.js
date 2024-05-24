import React, { useEffect } from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import { LiaHandScissorsSolid } from "react-icons/lia";
import { BsFileEarmarkText } from "react-icons/bs";
import { BsCashCoin } from "react-icons/bs";
// import { TbBrandGoogleAnalytics } from "react-icons/tb";
// import { LiaUsersCogSolid } from "react-icons/lia";
// import { TbFileAnalytics } from "react-icons/tb";
import { GoGear } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/authContext";
import { useTheme } from "../../utils/ThemeContext";
import { MdUnsubscribe } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";

export default function Sidebar({ hide, setHide }) {
  const router = useNavigate();
  const { active, setActive } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    const pathArray = window.location.pathname.split("/");
    const fileIdFromPath = pathArray[2];
    setActive(fileIdFromPath);

    // exlint-disable-next-line
  }, [setActive]);

  return (
    <div
      className={`w-full h-screen py-2 ${
        theme === "dark"
          ? "bg-gray-900 hover:shadow-gray-600"
          : "bg-white hover:shadow-gray-300"
      } } `}
    >
      <div className=" hidden sm:flex items-center justify-end pr-1 ">
        {hide ? (
          <AiOutlineMenuUnfold
            onClick={() => setHide(!hide)}
            className="h-6 w-6 cursor-pointer hover:text-yellow-700 transition-all duration-150"
          />
        ) : (
          <AiOutlineMenuFold
            onClick={() => setHide(!hide)}
            className="h-6 w-6 cursor-pointer hover:text-yellow-700 transition-all duration-150"
          />
        )}
      </div>
      {/*  */}
      <div className="relative w-full  py-3 h-[calc(100vh-7rem)] pb-[4rem] sm:pb-[3rem] overflow-y-auto message">
        <div className="relative w-full   flex flex-col gap-4 overflow-y-auto allMessages py-1 pb-6 pr-1 message">
          {/* 1 */}
          <div
            className={` mainbtn relative h-[2.6rem] rounded-r-3xl cursor-pointer shadow-sm  ${
              theme === "dark"
                ? "bg-gray-800 hover:shadow-gray-600"
                : "bg-gray-300 hover:shadow-gray-300"
            } filter drop-shadow-md  overflow-hidden`}
            onClick={() => {
              router("/admin/dashboard");
            }}
            title="Dashboard"
          >
            <div
              className="adminbtn absolute h-full sidebtn z-[20] hover:bg-yellow-700" //
              style={{
                width: active === "dashboard" && "100%",
                background: `#CA8A04`,
              }}
              title="Dashboard"
            ></div>
            <div className="relative w-full h-full flex items-center px-2 z-30 bg-transparent">
              {hide ? (
                <LuLayoutDashboard
                  className="h-7 w-7 cursor-pointer ml-2"
                  style={{ color: active === "dashboard" && "#fff" }}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <LuLayoutDashboard
                    className="h-6 w-6 cursor-pointer ml-2"
                    style={{ color: active === "dashboard" && "#fff" }}
                  />
                  <span
                    className="text-[16px] font-[400]"
                    style={{ color: active === "dashboard" && "#fff" }}
                  >
                    Dashboard
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* 2 */}
          <div
            className={` mainbtn relative h-[2.6rem] rounded-r-3xl cursor-pointer shadow-sm  ${
              theme === "dark"
                ? "bg-gray-800 hover:shadow-gray-600"
                : "bg-gray-300 hover:shadow-gray-300"
            } filter drop-shadow-md  overflow-hidden`}
            onClick={() => {
              router("/admin/services");
            }}
            title="Services Catalogs"
          >
            <div
              className="adminbtn absolute h-full  sidebtn z-[20]"
              style={{
                width: active === "services" && "100%",
                background: `#CA8A04`,
              }}
              title="Services"
            ></div>
            <div className="relative w-full h-full flex items-center px-2 z-30 bg-transparent">
              {hide ? (
                <LiaHandScissorsSolid
                  className="h-7 w-7 cursor-pointer ml-2"
                  style={{ color: active === "services" && "#fff" }}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <LiaHandScissorsSolid
                    className="h-6 w-6 cursor-pointer ml-2"
                    style={{ color: active === "services" && "#fff" }}
                  />
                  <span
                    className="text-[16px] font-[400]"
                    style={{ color: active === "services" && "#fff" }}
                  >
                    Service Catalog
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* 3 */}
          <div
            className={` mainbtn relative h-[2.6rem] rounded-r-3xl cursor-pointer shadow-sm  ${
              theme === "dark"
                ? "bg-gray-800 hover:shadow-gray-600"
                : "bg-gray-300 hover:shadow-gray-300"
            } filter drop-shadow-md  overflow-hidden`}
            onClick={() => {
              router("/admin/gallery");
            }}
            title="Gallery"
          >
            <div
              className="adminbtn absolute h-full  sidebtn z-[20]"
              style={{
                width: active === "gallery" && "100%",
                background: `#CA8A04`,
              }}
            ></div>
            <div className="relative w-full h-full flex items-center px-2 z-30 bg-transparent">
              {hide ? (
                <GrGallery
                  className="h-7 w-7 cursor-pointer ml-2"
                  style={{ color: active === "gallery" && "#fff" }}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <GrGallery
                    className="h-6 w-6 cursor-pointer ml-2"
                    style={{ color: active === "gallery" && "#fff" }}
                  />
                  <span
                    className="text-[16px] font-[400]"
                    style={{ color: active === "gallery" && "#fff" }}
                  >
                    Gallery
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* 4 */}

          {/* 5 */}
          <div
            className={` mainbtn relative h-[2.6rem] rounded-r-3xl cursor-pointer shadow-sm  ${
              theme === "dark"
                ? "bg-gray-800 hover:shadow-gray-600"
                : "bg-gray-300 hover:shadow-gray-300"
            } filter drop-shadow-md  overflow-hidden`}
            onClick={() => {
              router("/admin/blogs");
            }}
            title="Blogs"
          >
            <div
              className="adminbtn absolute h-full  sidebtn z-[20]"
              style={{
                width: active === "blogs" && "100%",
                background: `#CA8A04`,
              }}
            ></div>
            <div className="relative w-full h-full flex items-center px-2 z-30 bg-transparent">
              {hide ? (
                <BsFileEarmarkText
                  className="h-7 w-7 cursor-pointer ml-2"
                  style={{ color: active === "blogs" && "#fff" }}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <BsFileEarmarkText
                    className="h-6 w-6 cursor-pointer ml-2"
                    style={{ color: active === "blogs" && "#fff" }}
                  />
                  <span
                    className="text-[16px] font-[400]"
                    style={{ color: active === "blogs" && "#fff" }}
                  >
                    Blogs
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* 6 */}
          <div
            className={` mainbtn relative h-[2.6rem] rounded-r-3xl cursor-pointer shadow-sm  ${
              theme === "dark"
                ? "bg-gray-800 hover:shadow-gray-600"
                : "bg-gray-300 hover:shadow-gray-300"
            } filter drop-shadow-md  overflow-hidden`}
            onClick={() => {
              router("/admin/messages");
            }}
            title="Messages"
          >
            <div
              className="adminbtn absolute h-full  sidebtn z-[20]"
              style={{
                width: active === "messages" && "100%",
                background: `#CA8A04`,
              }}
            ></div>
            <div className="relative w-full h-full flex items-center px-2 z-30 bg-transparent">
              {hide ? (
                <FaCommentDots
                  className="h-7 w-7 cursor-pointer ml-2"
                  style={{ color: active === "messages" && "#fff" }}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <FaCommentDots
                    className="h-6 w-6 cursor-pointer ml-2"
                    style={{ color: active === "messages" && "#fff" }}
                  />
                  <span
                    className="text-[16px] font-[400]"
                    style={{ color: active === "messages" && "#fff" }}
                  >
                    Messages
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 7 */}
          <div
            className={` mainbtn relative h-[2.6rem] rounded-r-3xl cursor-pointer shadow-sm  ${
              theme === "dark"
                ? "bg-gray-800 hover:shadow-gray-600"
                : "bg-gray-300 hover:shadow-gray-300"
            } filter drop-shadow-md  overflow-hidden`}
            onClick={() => {
              router("/admin/orders");
            }}
            title="Orders"
          >
            <div
              className="adminbtn absolute h-full  sidebtn z-[20]"
              style={{
                width: active === "orders" && "100%",
                background: `#CA8A04`,
              }}
            ></div>
            <div className="relative w-full h-full flex items-center px-2 z-30 bg-transparent">
              {hide ? (
                <BsCashCoin
                  className="h-7 w-7 cursor-pointer ml-2"
                  style={{ color: active === "orders" && "#fff" }}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <BsCashCoin
                    className="h-6 w-6 cursor-pointer ml-2"
                    style={{ color: active === "orders" && "#fff" }}
                  />
                  <span
                    className="text-[16px] font-[400] "
                    style={{ color: active === "orders" && "#fff" }}
                  >
                    Orders
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* 8 */}
          <div
            className={` mainbtn relative h-[2.6rem] rounded-r-3xl cursor-pointer shadow-sm  ${
              theme === "dark"
                ? "bg-gray-800 hover:shadow-gray-600"
                : "bg-gray-300 hover:shadow-gray-300"
            } filter drop-shadow-md  overflow-hidden`}
            onClick={() => {
              router("/admin/subscription");
            }}
            title="Subscription"
          >
            <div
              className="adminbtn absolute h-full  sidebtn z-[20]"
              style={{
                width: active === "subscription" && "100%",
                background: `#CA8A04`,
              }}
            ></div>
            <div className="relative w-full h-full flex items-center px-2 z-30 bg-transparent">
              {hide ? (
                <MdUnsubscribe
                  className="h-7 w-7 cursor-pointer ml-2"
                  style={{ color: active === "subscription" && "#fff" }}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <MdUnsubscribe
                    className="h-6 w-6 cursor-pointer ml-2"
                    style={{ color: active === "subscription" && "#fff" }}
                  />
                  <span
                    className="text-[16px] font-[400] "
                    style={{ color: active === "subscription" && "#fff" }}
                  >
                    Subscribe
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* HR */}
          {/* <hr className="my-2" /> */}
          {/* <h4 className="text-[16] font-semibold px-2">Analytics</h4> */}

          {/* <div
            className={` mainbtn relative h-[2.6rem] rounded-r-3xl cursor-pointer shadow-sm  ${
              theme === "dark"
                ? "bg-gray-800 hover:shadow-gray-600"
                : "bg-gray-300 hover:shadow-gray-300"
            } filter drop-shadow-md  overflow-hidden`}
            onClick={() => {
              router("/admin/user-analytics");
            }}
          >
            <div
              className="adminbtn absolute h-full  sidebtn z-[20]"
              style={{
                width: active === "user-analytics" && "100%",
                background: `#CA8A04`,
              }}
            ></div>
            <div className="relative w-full h-full flex items-center px-2 z-30 bg-transparent">
              {hide ? (
                <LiaUsersCogSolid
                  className="h-7 w-7 cursor-pointer ml-2"
                  style={{ color: active === "user-analytics" && "#fff" }}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <LiaUsersCogSolid
                    className="h-6 w-6 cursor-pointer ml-2"
                    style={{ color: active === "user-analytics" && "#fff" }}
                  />
                  <span
                    className="text-[16px] font-[400] "
                    style={{ color: active === "user-analytics" && "#fff" }}
                  >
                    Services Analytics
                  </span>
                </div>
              )}
            </div>
          </div> */}

          {/* 2 */}
          {/* <div
            className={` mainbtn relative h-[2.6rem] rounded-r-3xl cursor-pointer shadow-sm  ${
              theme === "dark"
                ? "bg-gray-800 hover:shadow-gray-600"
                : "bg-gray-300 hover:shadow-gray-300"
            } filter drop-shadow-md  overflow-hidden`}
            onClick={() => {
              router("/admin/channel-analytics");
            }}
          >
            <div
              className="adminbtn absolute h-full  sidebtn z-[20]"
              style={{
                width: active === "channel-analytics" && "100%",
                background: `#CA8A04`,
              }}
            ></div>
            <div className="relative w-full h-full flex items-center px-2 z-30 bg-transparent">
              {hide ? (
                <TbBrandGoogleAnalytics
                  className="h-7 w-7 cursor-pointer ml-2"
                  style={{ color: active === "channel-analytics" && "#fff" }}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <TbBrandGoogleAnalytics
                    className="h-6 w-6 cursor-pointer ml-2"
                    style={{
                      color: active === "channel-analytics" && "#fff",
                    }}
                  />
                  <span
                    className="text-[16px] font-[400] "
                    style={{
                      color: active === "channel-analytics" && "#fff",
                    }}
                  >
                    Gallery Analytics
                  </span>
                </div>
              )}
            </div>
          </div> */}

          {/* 3 */}
          {/* <div
            className={` mainbtn relative h-[2.6rem] rounded-r-3xl cursor-pointer shadow-sm  ${
              theme === "dark"
                ? "bg-gray-800 hover:shadow-gray-600"
                : "bg-gray-300 hover:shadow-gray-300"
            } filter drop-shadow-md  overflow-hidden`}
            onClick={() => {
              router("/admin/subscription-analytics");
            }}
          >
            <div
              className="adminbtn absolute h-full  sidebtn z-[20]"
              style={{
                width: active === "subscription-analytics" && "100%",
                background: `#CA8A04`,
              }}
            ></div>
            <div className="relative w-full h-full flex items-center px-2 z-30 bg-transparent">
              {hide ? (
                <TbFileAnalytics
                  className="h-7 w-7 cursor-pointer ml-1"
                  style={{
                    color: active === "subscription-analytics" && "#fff",
                  }}
                />
              ) : (
                <div className="flex items-center gap-1">
                  <TbFileAnalytics
                    className="h-6 w-6 cursor-pointer ml-2"
                    style={{
                      color: active === "subscription-analytics" && "#fff",
                    }}
                  />
                  <span
                    className="text-[16px] font-[400] "
                    style={{
                      color: active === "subscription-analytics" && "#fff",
                    }}
                  >
                    Subscription Analytic
                  </span>
                </div>
              )}
            </div>
          </div> */}
          {/* 4 */}

          <hr className="my-2" />
          <h4 className="text-[16] font-semibold px-2">Settings</h4>
          <div
            className={` mainbtn relative h-[2.6rem] rounded-r-3xl cursor-pointer shadow-sm  ${
              theme === "dark"
                ? "bg-gray-800 hover:shadow-gray-600"
                : "bg-gray-300 hover:shadow-gray-300"
            } filter drop-shadow-md  overflow-hidden`}
            onClick={() => {
              router("/admin/layout-settings");
            }}
            title="Layout-settings"
          >
            <div
              className="adminbtn absolute h-full  sidebtn z-[20]"
              style={{
                width: active === "layout-settings" && "100%",
                background: `#CA8A04`,
              }}
              title="Layout-settings"
            ></div>
            <div className="relative w-full h-full flex items-center px-2 z-30 bg-transparent">
              {hide ? (
                <GoGear
                  className="h-7 w-7 cursor-pointer ml-2"
                  style={{ color: active === "layout-settings" && "#fff" }}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <GoGear
                    className="h-6 w-6 cursor-pointer ml-2"
                    style={{ color: active === "layout-settings" && "#fff" }}
                  />
                  <span
                    className="text-[16px] font-[400] "
                    style={{ color: active === "layout-settings" && "#fff" }}
                  >
                    Layout Settings
                  </span>
                </div>
              )}
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
}
