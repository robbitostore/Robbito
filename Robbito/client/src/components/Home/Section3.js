import React, { useEffect, useState } from "react";
import "./home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from "../../utils/ThemeContext";
import { HiScissors } from "react-icons/hi2";
import axios from "axios";
import Loader from "../../utils/Loader";
import { useNavigate } from "react-router-dom";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const YourSliderComponent = () => {
  const { theme } = useTheme();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Get ALl Services
  const getAllService = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/service/get/services`
      );

      if (data.success) {
        setServices(data.services);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllService();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="relative min-h-[80vh] ">
      <h1
        className={`text-center py-4 text-3xl italic sm:text-4xl heading font-semibold ${
          theme === "dark" ? "text-white" : " text-black"
        } `}
      >
        What WE DO
      </h1>
      {/* <div className="relative flex items-center justify-center gap-[1rem]">
        <span className={` `}>
          <HiScissors className="h-6 w-6 text-[#ae880a]" />
        </span>
        <span
          className={`w-[.7rem] h-[.7rem] rounded-full ${
            theme === "dark" ? "bg-[#ae880a]" : "bg-[#ae880a]"
          }`}
        ></span>
        <span
          className={`w-[3rem] h-[1px] ${
            theme === "dark" ? "bg-gray-100" : "bg-gray-900"
          }`}
        ></span>
        <span
          className={`w-[8rem] h-[1px] ${
            theme === "dark" ? "bg-gray-500" : "bg-gray-300"
          }`}
        ></span>
        <span
          className={`w-[3rem] h-[1px] ${
            theme === "dark" ? "bg-gray-100" : "bg-gray-900"
          }`}
        ></span>
        <span
          className={`w-[.7rem] h-[.7rem] rounded-full ${
            theme === "dark" ? "bg-[#ae880a]" : "bg-[#ae880a]"
          }`}
        ></span>
        <span className={`rotate-180 `}>
          <HiScissors className="h-6 w-6 text-[#ae880a]" />
        </span>
      </div> */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className=" py-8 px-3 ">
          <Slider {...settings}>
            {services?.map((item, index) => (
              <div key={index} className=" px-4 mt-4">
                <div
                  className={`relative min-h-[22rem] overflow-hidden rounded-md shadow-md border hover:scale-[1.03]  transition-all duration-200 cursor-pointer ${
                    theme === "dark"
                      ? "bg-gray-800 hover:shadow-gray-700"
                      : " bg-gray-100 hover:shadow-gray-300"
                  }`}
                  onClick={() => navigate(`/service/detail/${item?._id}`)}
                >
                  <img
                    src={item?.image}
                    alt="cardImage"
                    className="h-[14rem] w-full"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-center">
                      {item?.title}
                    </h3>
                    <p className="text-center">
                      {" "}
                      {item?.shotDesc?.length > 70
                        ? item?.shotDesc?.slice(0, 70) + "..."
                        : item?.shotDesc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
      <div className=" flex items-center justify-center pb-8 pt-6">
        <button className="btn" onClick={() => navigate("/services")}>
          See our services
        </button>
      </div>
    </div>
  );
};

export default YourSliderComponent;
