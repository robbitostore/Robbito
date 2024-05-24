import React, { useEffect, useState } from "react";
import { useTheme } from "../../utils/ThemeContext";
import { HiScissors } from "react-icons/hi2";
import axios from "axios";
import Loader from "../../utils/Loader";

// const data = [
//   {
//     id: 1,
//     name: "Modern Man Shirts",
//     type: "man shirt",
//     description: "New popular mens coat design 2024 new collection for men",
//     image: "/design1.png",
//   },
//   {
//     id: 2,
//     name: "Modern Man Shirts",
//     type: "winter cloth",
//     description: "New popular mens coat design 2024 new collection for men",
//     image: "/design2.png",
//   },
//   {
//     id: 3,
//     name: "Modern Man Shirts",
//     type: "model design",
//     description: "New popular mens coat design 2024 new collection for men",
//     image: "/design3.png",
//   },
//   {
//     id: 4,
//     name: "Modern Man Shirts",
//     type: "mens coat",
//     description: "New popular mens coat design 2024 new collection for men",
//     image: "/design4.png",
//   },
//   {
//     id: 5,
//     name: "Modern Man Shirts",
//     type: "man shirt",
//     description: "New popular mens coat design 2024 new collection for men",
//     image: "/design5.png",
//   },
//   {
//     id: 6,
//     name: "Modern Man Shirts",
//     type: "girls cloth",
//     description: "New popular mens coat design 2024 new collection for men",
//     image: "/design6.png",
//   },
//   {
//     id: 7,
//     name: "Modern Man Shirts",
//     type: "girls cloth",
//     description: "New popular mens coat design 2024 new collection for men",
//     image: "/design7.jpg",
//   },
//   {
//     id: 8,
//     name: "Modern Man Shirts",
//     type: "girls cloth",
//     description: "New popular mens coat design 2024 new collection for men",
//     image: "/design8.jpg",
//   },
//   {
//     id: 9,
//     name: "Modern Man Shirts",
//     type: "girls cloth",
//     description: "New popular mens coat design 2024 new collection for men",
//     image: "/design9.jpg",
//   },
//   {
//     id: 10,
//     name: "Modern Man Shirts",
//     type: "model design",
//     description: "New popular mens coat design 2024 new collection for men",
//     image: "/d11.jpg",
//   },
//   {
//     id: 11,
//     name: "Modern Man Shirts",
//     type: "model design",
//     description: "New popular mens coat design 2024 new collection for men",
//     image: "/d10.avif",
//   },
//   {
//     id: 12,
//     name: "Modern Man Shirts",
//     type: "man shirt",
//     description: "New popular mens coat design 2024 new collection for men",
//     image: "/home4.jpg",
//   },
// ];

export default function Section4() {
  const { theme } = useTheme();
  const [active, setActive] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [visibleItems, setVisibleItems] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  // Get ALl Categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/gallery/get/category`
      );
      if (data?.success) {
        setCategories(data?.categories);
        setSearchQuery(data.categories[0].name);
        setActive(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    //eslint-disable-next-line
  }, []);

  // Get ALl Services
  const getAllService = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/gallery/all/galleries`
      );

      if (data.success) {
        setData(data.gallery);
        setFilterData(data.gallery);
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

  // Handle Filter

  const filter = () => {
    if (searchQuery === "All Designs") {
      setFilterData(data);
    } else {
      const filteredData = data.filter(
        (item) => item?.category?.toLowerCase() === searchQuery?.toLowerCase()
      );
      setFilterData(filteredData);
    }
  };

  useEffect(() => {
    filter();
    setVisibleItems(6);
    // eslint-disable-next-line
  }, [searchQuery]);

  const handleSeeMore = () => {
    setVisibleItems(visibleItems + 3);
  };

  return (
    <div className="w-full min-h-screen py-6 px-4">
      <div className="flex flex-col items-center justify-center">
        {/* <h3 className="text-lg font-medium heading text-[#ae880a] text-center">
          TAILOR MODEL GALLERY
        </h3> */}
        <h2
          className={` text-3xl sm:text-6xl heading italic font-semibold text-center capitalize mt-3 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Galleria
        </h2>
        {/* <div className="relative flex items-center justify-center gap-[.6rem] mt-6">
          <span className={` `}>
            <HiScissors className="h-6 w-6 text-[#ae880a]" />
          </span>
          <span
            className={`w-[16rem] sm:w-[18rem] h-[1px] border-b-2 border-dashed border-yellow-600 `}
          ></span>

          <span className={`rotate-180 `}>
            <HiScissors className="h-6 w-6 text-[#ae880a]" />
          </span>
        </div> */}
      </div>
      {/* Buttons */}
      <div className="flex items-center flex-wrap justify-center gap-4 sm:gap-6 mt-6">
        {categories &&
          categories.map((c, i) => (
            <button
              key={c._id}
              className={`uppercase font-medium cursor-pointer hover:scale-[1.02] transition-all duration-150 ${
                active === i
                  ? "text-yellow-700 hover:text-yellow-800"
                  : theme === "dark"
                  ? "text-gray-100"
                  : "text-black"
              } `}
              onClick={() => {
                setActive(i);
                setSearchQuery(c?.name);
              }}
            >
              {c?.name}
            </button>
          ))}
      </div>
      {/* Data */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {searchQuery === "all designs" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8 px-1 sm:px-8">
              {data.map((item) => (
                <div className="" key={item.id}>
                  <div className="relative h-[23rem] sm:h-[26rem] object-fill w-full overflow-hidden shadow-md rounded-md">
                    <img
                      src={item?.image}
                      alt="designs"
                      className=" shadow-md rounded-md w-full h-full hover:scale-[1.07] transition-all duration-300  hover:shadow-gray-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {filterData.length === 0 ? (
                <div className="flex items-center min-h-[30rem] flex-col  justify-center w-full h-full">
                  <img
                    src="/empty.png"
                    alt="empty"
                    className="h-[15rem] w-[15rem]"
                  />
                  <span className="text-xl font-semibold">No data found!</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8 px-1 sm:px-8">
                  {filterData.slice(0, visibleItems).map((item) => (
                    <div className="" key={item.id}>
                      <div className="relative h-[23rem] sm:h-[26rem] object-fill w-full overflow-hidden shadow-md rounded-md">
                        <img
                          src={item?.image}
                          alt="designs"
                          className=" shadow-md rounded-md w-full h-full hover:scale-[1.07] transition-all duration-300  hover:shadow-gray-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
      <div className="flex items-start justify-center mt-8">
        {filterData?.length > visibleItems && (
          <button className="btn font-medium" onClick={handleSeeMore}>
            See More
          </button>
        )}
      </div>
    </div>
  );
}
