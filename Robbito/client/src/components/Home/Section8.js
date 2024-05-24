import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../utils/Loader";
import { useTheme } from "../../utils/ThemeContext";
import { HiScissors } from "react-icons/hi2";

export default function Section8() {
  const { theme } = useTheme();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Get ALl Blogs
  const getAllService = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/blog/get/blogs`
      );

      if (data.success) {
        setServices(data?.blogs.slice(0, 6));
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
    <div className="w-full min-h-[8vh] py-4 px-4 relative overscroll-y-auto scroll pb-[8rem]">
      <div className="flex items-center justify-center flex-col gap-4 w-full ">
        <h1 className="font-semibold italic text-center text-3xl sm:text-4xl heading ">
          All Blogs / News
        </h1>
        {/* <div className="relative flex items-center justify-center gap-[1rem]">
          <span className={` `}>
            <HiScissors className="h-6 w-6 text-[#ae880a]" />
          </span>
          <span
            className={`w-[.7rem] h-[.7rem] rounded-full border-2 border-dashed border-yellow-700`}
          ></span>
          <span
            className={`w-[3rem] h-[1px]  border-[1px] border-dashed border-yellow-700 `}
          ></span>
          <span
            className={`w-[8rem] h-[1px] ${
              theme === "dark" ? "bg-yellow-600" : "bg-yellow-600"
            }`}
          ></span>
          <span
            className={`w-[3rem] h-[1px] border-[1px] border-dashed border-yellow-700`}
          ></span>
          <span
            className={`w-[.7rem] h-[.7rem] rounded-full border-2 border-dashed border-yellow-700 `}
          ></span>
          <span className={`rotate-180 `}>
            <HiScissors className="h-6 w-6 text-[#ae880a]" />
          </span>
        </div> */}
      </div>

      {/*  */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {services?.map((service, index) => (
            <div
              className={`rounded-lg shadow-md  ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-100"
              } cursor-pointer border hover:shadow-xl overflow-hidden`}
              key={service._id}
              onClick={() => navigate(`/blog/detail/${service._id}`)}
            >
              <img
                src={service?.image}
                alt="serviceLogi"
                className="w-full h-[15rem]"
              />
              <div className="flex flex-col gap-2 py-4 px-4 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[19px] font-semibold">
                    {service?.title}
                  </span>
                </div>
                <span className="">
                  {service?.shotDesc?.length > 70
                    ? service?.shotDesc?.slice(0, 70) + "..."
                    : service?.shotDesc}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
