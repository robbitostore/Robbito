import React from "react";
import { useTheme } from "../../utils/ThemeContext";
import { HiScissors } from "react-icons/hi2";
import { GiRolledCloth } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export default function Section2() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[90vh] px-4 mt-[4rem]">
      {/* <h1
        className={`text-center heading py-4 text-3xl sm:text-4xl font-semibold ${
          theme === "dark" ? "text-white" : " text-black"
        } `}
      >
        Exploring the Artistry Behind Our Tailoring
      </h1> */}
      {/*  */}
      {/* <div className="relative flex items-center justify-center gap-[1rem]">
        <span className={` `}>
          <HiScissors className="h-6 w-6 text-[#ae880a]" />
        </span>
        <span
          className={`w-[7rem] sm:w-[9rem] h-[1px] border-b-2 border-dashed border-yellow-600 `}
        ></span>
        <GiRolledCloth className="h-6 w-6 text-[#ae880a]" />
        <span
          className={`w-[7rem] sm:w-[9rem] h-[1px] border-b-2 border-dashed border-yellow-600 `}
        ></span>
        <span className={`rotate-180 `}>
          <HiScissors className="h-6 w-6 text-[#ae880a]" />
        </span>
      </div> */}
      {/*  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-4 py-4  mt-4 ">
        <div className="">
          <img
            src="/data/intro image.png"
            alt="about"
            className="w-full h-full rounded-lg"
          />
        </div>
        <div className="flex flex-col  gap-4">
          {/* <h1
            className={`text-start text-3xl heading font-semibold  ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Introduction
          </h1> */}
          <p
            className={`text-start text-[16px]   ${
              theme === "dark" ? "text-gray-200" : "text-gray-800"
            }`}
          >
            We are taking dress making orders from around the world. Regardless
            of the ethnicity of fashion our professionals are equipped to create
            exactly as per your directions. At Robbito everything is done
            in-house.
          </p>
          <p
            className={`text-start text-[16px] mt-4   ${
              theme === "dark" ? "text-gray-200" : "text-gray-800"
            }`}
          >
            All required dress making departments under one roof at our purpose
            built factory powered by environmentally friendly renewable energy.{" "}
            <br /> We cater to all three segments of dress making demands, that
            is; you can either send us a picture of your reference article and
            we create it exactly like that or you have conceptualised the dress
            in your mind and you explain it to us to bring that dress to life,
          </p>
          <p
            className={`text-start text-[16px] mt-4   ${
              theme === "dark" ? "text-gray-200" : "text-gray-800"
            }`}
          >
            we guarantee to delight you with the outcome or you can ask one of
            ours highly creative designers to create a dress from scratch
            according to your dress niche.
          </p>

          <div className="flex items-start mt-6 w-full ">
            <button className="btn" onClick={() => navigate("/create/order")}>
              Booking Now
            </button>
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2  gap-8 sm:gap-4 py-4  mt-4 ">
        <div className="flex flex-col items-center gap-4">
          <h1
            className={`text-start text-3xl font-semibold  ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Crafting Timeless Styles with Passion and Precision
          </h1>
          <p
            className={`text-start text-[16px]   ${
              theme === "dark" ? "text-gray-200" : "text-gray-800"
            }`}
          >
            🎩 The Art of Tailoring at Robbito At Robbito, the art of tailoring
            is a symphony of skill and creativity. Our artisans, guided by a
            tradition of excellence, weave dreams into fabric with every
            measured cut and precise stitch. From the initial sketch to the
            final fitting, each garment bears the hallmark of meticulous
            craftsmanship.
          </p>
          <p
            className={`text-start text-[16px] mt-4   ${
              theme === "dark" ? "text-gray-200" : "text-gray-800"
            }`}
          >
            ✂ Step into Robbito's world, where icons adorn the atelier as
            guardians of tradition and symbols of innovation. The golden
            scissors, emblazoned with intricate patterns, embody the precision
            and mastery that define our craft. The needle and thread,
            intertwined in a dance of artistry, represent the seamless fusion of
            tradition and modernity.
          </p>
          <p
            className={`text-start text-[16px] mt-4   ${
              theme === "dark" ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Step into Robbito's world, where icons adorn the atelier as
            guardians of tradition and symbols of innovation. The golden
            scissors, emblazoned with intricate patterns, embody the precision
            and mastery that define our craft. The needle and thread,
            intertwined in a dance of artistry, represent the seamless fusion of
            tradition and modernity.
          </p>
          <div className="flex items-start mt-6 w-full ">
            <button className="btn" onClick={() => navigate("/create/order")}>
              Booking Now
            </button>
          </div>
        </div>
        <div className="">
          <img src="/About.png" alt="about" />
        </div>
      </div> */}
    </div>
  );
}
