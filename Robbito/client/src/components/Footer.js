import React, { useEffect, useState } from "react";
import { useTheme } from "../utils/ThemeContext";
import { FaInstagram, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { BiLoaderAlt } from "react-icons/bi";

export default function Footer() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [footerData, setFooterData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/subscribe/create/subscription`,
        { email }
      );
      if (data?.success) {
        setLoading(false);
        toast.success("Congratulations! You are successfully subscribed.");
        setEmail("");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // Get Footer Info
  const getFooter = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/layout/get/layout/Footer`
      );
      setFooterData(data?.layoutData?.footer);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getFooter();
  }, []);
  return (
    <div
      className={`w-full py-[1rem] px-4 ${
        theme === "dark" ? "bg-black" : "bg-gray-50"
      } `}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 sm:gap-4">
        {/* Section1 */}
        <div className="">
          <div className="w-full flex items-center justify-center sm:hidden">
            <img
              src={
                theme === "dark"
                  ? "/Robbito logo png.png"
                  : "/Robbito logo png.png"
              }
              alt="logo"
              className="w-[8rem] h-[8rem] mt-[-1.5rem] rounded-md"
            />
          </div>
          <h3
            className={`text-lg font-semibold ml-0 sm:ml-[1.1rem] ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            <span className="highlight font-bold  text-xl">Contact</span> Us
          </h3>
          <div className="flex flex-col gap-[1.4rem] mt-[1rem] ">
            <ul className="flex flex-col gap-[0rem] ">
              {/*  */}
              <li
                className={`flex items-center ${
                  !footerData?.name && "hidden"
                }  py-3 px-4 rounded-lg gap-[1rem] ${
                  theme === "dark"
                    ? "hover:bg-gray-900 "
                    : "hover:bg-yellow-800/10"
                } `}
              >
                <FaUser />{" "}
                <span className="text-[1rem] font-[500]">
                  {footerData?.name}
                </span>
              </li>
              {/*  */}
              <li
                className={`flex items-center ${
                  !footerData?.email && "hidden"
                }  py-3 px-4 rounded-lg gap-[1rem] ${
                  theme === "dark"
                    ? "hover:bg-gray-900 "
                    : "hover:bg-yellow-800/10"
                } `}
              >
                <MdEmail />{" "}
                <span className="text-[1rem] font-[500]">
                  {footerData?.email}
                </span>
              </li>
              {/*  */}
              <li
                className={`flex items-center py-3 px-4 ${
                  !footerData?.address && "hidden"
                } rounded-lg gap-[1rem] ${
                  theme === "dark"
                    ? "hover:bg-gray-900 "
                    : "hover:bg-yellow-800/10"
                } `}
              >
                <FaLocationDot />{" "}
                <span className="text-[1rem] font-[500]">
                  {footerData?.address}
                </span>
              </li>
              {/*  */}
              <li
                className={`flex items-center py-3  ${
                  !footerData?.phone && "hidden"
                } px-4 rounded-lg gap-[1rem] ${
                  theme === "dark"
                    ? "hover:bg-gray-900 "
                    : "hover:bg-yellow-800/10"
                } `}
              >
                <FaPhoneVolume />{" "}
                <span className="text-[1rem] font-[500]">
                  {footerData?.phone}
                </span>
              </li>
              {/*  */}
              <li
                className={`flex items-center  ${
                  !footerData?.telephone && "hidden"
                } py-3 px-4 rounded-lg gap-[1rem] ${
                  theme === "dark"
                    ? "hover:bg-gray-900 "
                    : "hover:bg-yellow-800/10"
                } `}
              >
                <MdOutlinePhoneAndroid />{" "}
                <span className="text-[1rem] font-[500]">
                  {footerData?.telephone}
                </span>
              </li>
              {/*  */}
            </ul>
          </div>
        </div>
        {/* Section2 */}
        <div className="sm:flex flex-col items-center justify-center gap-1 w-full hidden">
          <img
            src={
              theme === "dark"
                ? "/Robbito logo png.png"
                : "/Robbito logo png.png"
            }
            alt="logo"
            className="w-[12rem] h-[12rem] mt-[-1.5rem] rounded-md"
          />
          <span
            className={`text-[17px] font-semibold text-center w-full ${
              theme === "dark" ? "text-gray-200" : " text-gray-500"
            } `}
          >
            Bespoke Tailoring done to perfection by offering in depth
            craftsmanship.
          </span>

          <div className="flex items-center gap-6 mt-6">
            <Link
              to="https://www.facebook.com/Robbito.Official"
              target="_blank"
            >
              <FaFacebook className="h-10 w-10 text-blue-600 hover:text-blue-700 hover:scale-[1.07] transition duration-200" />
            </Link>
            <Link to="https://wa.link/gv385i" target="_blank">
              <IoLogoWhatsapp className="h-11 w-11 text-green-400 hover:scale-[1.07] hover:text-green-500 transition duration-200" />
            </Link>
            <Link
              to="https://www.instagram.com/Robbito.Official"
              target="_blank"
            >
              <FaInstagram className="h-10 w-10 bg-gradient-to-br py-[2px] text-white rounded-lg from-fuchsia-700 via-pink-600 to-orange-400 hover:scale-[1.07] transition duration-200" />
            </Link>
          </div>

          <div className="mt-6">
            <span className="font-medium text-center text-lg">
              © 2024 Robbito, Inc. All rights reserved.
            </span>
          </div>
        </div>
        {/* Section3 */}
        <div className="flex flex-col gap-4">
          <h3 className={`text-lg font-semibold`}>
            <span className="highlight font-bold text-xl">Subscribe</span> to
            our newsletter & Offers
          </h3>
          <span
            className={`text-[16px] ${
              theme === "dark" ? "text-gray-100" : " text-gray-600"
            } `}
          >
            The latest news, articles, and resources, sent to your inbox weekly.
          </span>
          <div className="w-full mt-4 ">
            <form
              onSubmit={handleSubmit}
              className="w-full mt-4 flex items-center gap-2 sm:gap-4"
            >
              <input
                type="email"
                required
                value={email}
                placeholder="Enter your email"
                className={`w-full h-[2.8rem] rounded-md shadow-md px-3 border-2 outline-none ${
                  theme === "dark"
                    ? "border-gray-300 bg-gray-800"
                    : "border-gray-500"
                } `}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="px-3 rounded-md h-[2.8rem]  text-white cursor-pointer shadow-md hover:shadow-lg font-medium bg-yellow-700 hover:bg-yellow-800 transition duration-200 hover:scale-[1.03]">
                {loading ? (
                  <BiLoaderAlt className="h-5 w-5 text-white animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          </div>
        </div>
        {/* Mobile Screen */}
        <div className="flex flex-col items-center justify-center gap-1  sm:hidden">
          <div className="flex items-center gap-6 mt-6">
            <Link
              to="https:/www.facebook.com/Robbito.Official"
              target="_blank"
              title="Facebook"
            >
              <FaFacebook className="h-10 w-10 text-blue-600 hover:text-blue-700 hover:scale-[1.07] transition duration-200" />
            </Link>
            <Link to="https://wa.link/gv385i" target="_blank" title="WhatsApp">
              <IoLogoWhatsapp className="h-11 w-11 text-green-500 hover:scale-[1.07] hover:text-green-600 transition duration-200" />
            </Link>
            <Link
              to="https://www.instagram.com/Robbito.Official"
              target="_blank"
              title="Instagram"
            >
              <FaInstagram className="h-10 w-10 bg-gradient-to-br py-[2px] rounded-lg text-white from-blue-500 via-pink-600 to-orange-400 hover:scale-[1.07] transition duration-200" />
            </Link>
          </div>

          <div className="mt-6 w-full flex items-center justify-center">
            <span className="font-medium text-center text-lg">
              © 2024 Robbito, Inc. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
