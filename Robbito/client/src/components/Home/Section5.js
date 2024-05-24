import React from "react";
import { useTheme } from "../../utils/ThemeContext";
import { useNavigate } from "react-router-dom";

export default function Section5() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  return (
    <div className="relative w-full min-h-screen py-10 px-4">
      <img
        src="/b1 (1).png"
        alt="section5"
        className="max-w-[95%]: sm:max-w-[80%] absolute bottom-0 right-0  z-1  "
      />
      <div className="flex items-center justify-center z-10 relative">
        {/* <img
          src="/5.png"
          alt="section5"
          className="max-w-[95%]: sm:max-w-[80%]"
        /> */}
        <h1 className="w-full text-center font-semibold heading italic text-yellow-600 text-5xl sm:text-8xl">
          Our Claim to Fame
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-[4rem]">
        <div className=" w-full h-full">
          <img
            src="/data/ok3.jpg"
            alt="Logo"
            className="rounded-lg relative z-40"
          />
        </div>
        <div className="flex flex-col   gap-6 z-10 relative ">
          <h2
            className={` text-2xl sm:text-4xl font-semibold ${
              theme === "dark" ? "text-white" : "text-black"
            }  `}
          >
            We make your dream dress in an unbelievable budget
          </h2>
          <p
            className={`text-[16px]  ${
              theme === "dark" ? " text-gray-200" : "text-gray-700"
            }`}
          >
            That’s what makes us stand out from other market participants and
            that’s what’s our unique selling point. It’s not just quality
            delivered within a sharp deadline but we also ensure the most
            competitive price quotes. It always feels better when your favourite
            dress has been easy on the pocket as well.
          </p>
          {/* <p
            className={`text-[16] mt-2 ${
              theme === "dark" ? " text-gray-200" : "text-gray-700"
            }`}
          >
            Discover the heritage of Robbito, where classic elegance meets
            contemporary flair. Our about section is a testament to our
            dedication, adorned with symbols reflecting our passion for the art
            of tailoring.
          </p> */}
          <div className="">
            <button className="btn" onClick={() => navigate("/contact")}>
              {" "}
              Book Appointment Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
