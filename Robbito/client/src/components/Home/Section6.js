import React from "react";
import "./home.css";
import { FaDraftingCompass } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { useTheme } from "../../utils/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaBuilding } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";

export default function Section6() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  return (
    <div className="relative w-full min-h-[100vh] py-3 px-2 sm:px-6 mt-[3.5rem]">
      <div
        className={`section5-content flex flex-col gap-4 py-6 px-2 sm:px-6 rounded-md shadow-md ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-200 "
        }`}
        style={{
          filter: "contrast(1.1) drop-shadow(.3px .3px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 w-full ">
          <div className=" flex flex-col gap-2">
            <span className="text-lg text-yellow-700 ">
              INNOVATION – CREATIVITY – RELIABILITY
            </span>
            <h1
              className=" text-3xl sm:text-4xl font-bold italic heading  w-full"
              style={{ textShadow: "-1px 1px 0px #888" }}
            >
              Why Choose Robbito?
            </h1>
          </div>
          {/*  */}
          <p
            className={`text-justify text-lg  ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }  `}
          >
            We are very passionate about what we do, adopting to new innovative
            methods, our designers applying seamless creativity. Reliable with
            our quality delivered and also with our delivery timeframe.
          </p>
        </div>

        {/* ----------- */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  mt-[3rem]">
          {/* con1 */}
          <div
            className={`condition1  ${
              theme === "dark" ? "bg-gray-900" : "bg-gray-100"
            } rounded-md py-[1.5rem] px-[1rem]
            shadow-lg cursor-pointer flex flex-col gap-8 items-center justify-start box1`}
          >
            <div className="section5-icon">
              <GiTakeMyMoney className="" />
            </div>
            <h3 className="text-2xl text-center font-semibold">
              Easy payments checkout utility
            </h3>
            <p
              className={`text-base ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              } text-justify `}
            >
              With our convenient payment gateway checkout you can pay through
              your credit/debit card from anywhere in the world all through a
              safe and seamless process
            </p>
            <span className="w-[10rem] h-[2px] rounded-md"></span>
          </div>

          {/* con2 */}

          <Link
            to="https://bjtextiles.com"
            className={`condition1  ${
              theme === "dark" ? "bg-gray-900" : "bg-gray-100"
            } rounded-md py-[1.5rem] px-[1rem]
            shadow-lg cursor-pointer flex flex-col gap-8 items-center justify-start box1`}
            target="_blank"
          >
            <div className="section5-icon2">
              <FaBuilding />
            </div>
            <h3 className="text-2xl text-center font-semibold">
              Robbito is a product of <br /> BJ Textiles (Pvt) Limited.
            </h3>
            <p
              className={`text-base ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              } text-justify `}
            >
              Customised stitching division of BJ Textiles (Pvt) Limited. We
              felt that there is a vast vacuum in the market where the client
              should be facilitated to directly get their dress made from a
              Textile manufacturer
            </p>
            <span className="w-[10rem] h-[2px] rounded-md"></span>
          </Link>
          {/* col3 */}
          <div
            className={`condition1  ${
              theme === "dark" ? "bg-gray-900" : "bg-gray-100"
            } rounded-md py-[1.5rem] px-[1rem]
            shadow-lg cursor-pointer flex flex-col gap-8 items-center justify-start box1`}
          >
            <div className="section5-icon3">
              <FaUsers />
            </div>
            <h3 className="text-2xl text-center  font-semibold">
              User friendly process
            </h3>
            <p
              className={`text-base ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              } text-justify `}
            >
              Robbito values ease of interacting for our clients. Our clients
              can initiate an order just by clicking on our WhatsApp link and
              get connected instantly to our agent.
            </p>
            <span className="w-[10rem] h-[2px] rounded-md"></span>
          </div>
          {/* col4 */}
          <div
            className={`condition1  ${
              theme === "dark" ? "bg-gray-900" : "bg-gray-100"
            } rounded-md py-[1.5rem] px-[1rem]
            shadow-lg cursor-pointer flex flex-col gap-8 items-center justify-start box1`}
          >
            <div className="section5-icon4">
              <IoHome color="purple" size="50" />
            </div>
            <h3 className="text-2xl text-center  font-semibold">
              In-house couture worshop
            </h3>
            <p
              className={`text-base ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              } text-justify `}
            >
              Not only do we have all dress manufacturing departments under one
              roof including cutting, stitching, printing, dyeing and embroidery
              but we also have an in-house couture workshop where our highly
              skilled couture work and block print artists work round the clock
              in shifts to create your masterpieces.
            </p>
            <span className="w-[10rem] h-[2px] rounded-md"></span>
          </div>
          {/* col5 */}
          <div
            className={`condition1  ${
              theme === "dark" ? "bg-gray-900" : "bg-gray-100"
            } rounded-md py-[1.5rem] px-[1rem]
            shadow-lg cursor-pointer flex flex-col gap-8 items-center justify-start box1`}
          >
            <div className="section5-icon5">
              <FaShop color="yellow" size="50" />
            </div>
            <h3 className="text-2xl text-center  font-semibold">
              In-house fabric inventory
            </h3>
            <p
              className={`text-base ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              } text-justify `}
            >
              Our manufacturing facility houses a vast variety of fabrics so
              that work starts on your dress the moment the order is finalised.
            </p>
            <span className="w-[10rem] h-[2px] rounded-md"></span>
          </div>

          {/* col6 */}
          <div
            className={`condition1  ${
              theme === "dark" ? "bg-gray-900" : "bg-gray-100"
            } rounded-md py-[1.5rem] px-[1rem]
            shadow-lg cursor-pointer flex flex-col gap-8 items-center justify-start box1`}
          >
            <div className="section5-icon6">
              <IoLibrary color="green" size="50" />
            </div>
            <h3 className="text-2xl text-center  font-semibold">
              Accessories Library
            </h3>
            <p
              className={`text-base ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              } text-justify `}
            >
              Accessories garnish the dress. We have an elaborate accessories
              library for our designers to utilise while working on your dress.
            </p>
            <span className="w-[10rem] h-[2px] rounded-md"></span>
          </div>

          {/* ----------- */}
        </div>
        <div className="w-full flex items-center justify-center mt-6 mb-6">
          <button className="btn" onClick={() => navigate("/contact")}>
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
