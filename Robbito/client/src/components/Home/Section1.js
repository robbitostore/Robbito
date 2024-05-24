import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./home.css";
import axios from "axios";

export default function Section1() {
  const [banners, setBanners] = useState([]);
  const getBanner = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/layout/get/layout/Banner`
      );
      setBanners(data?.layoutData?.banner);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBanner();
  }, []);
  return (
    <div className={`w-full h-[75vh] sm:h-[90vh]`}>
      <Carousel
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        showArrows={true}
        showStatus={false}
        showIndicators={true}
        showThumbs={false}
        stopOnHover={true}
        emulateTouch={true}
        swipeable={true}
        dynamicHeight={true}
      >
        {/* 1 */}
        {banners?.map((b) => (
          <div
            className="relative h-[75vh] sm:h-[90vh]"
            data-aos="fade-down"
            key={b._id}
          >
            <img src={b.image ? b.image : "/data/home1.jpg"} alt="banner" />
            {/* <div className="w-full h-full flex items-center justify-center ">
              <span className="absolute top-[-3rem] left-[-3rem] z-10 ">
                <IoMdSettings className="h-[5rem] w-[5rem] animate text-yellow-700/50" />
              </span>
              <div className="absolute top-1/2 left-1/2 transform z-30 -translate-x-1/2 -translate-y-1/2 text-white bg-black/40 sm:bg-black/70 rounded-md shadow-md w-[20rem] sm:w-[39rem] py-4 sm:py-7 px-4 sm:px-7 flex items-center justify-center flex-col gap-5">
                <h1
                  className="text-3xl sm:text-5xl font-bold text-center capitalize"
                  style={{ lineHeight: 1.2 }}
                >
                  High Quality Stitching & <br />
                  Tailoring Services At <br /> Your DoorSteps
                </h1>
                <span className="text-center text-gray-100">
                  Have fit challenges? We can stitch perfect fitting clothes for
                  you!
                </span>
                <button className="btn" onClick={() => navigate("/contact")}>
                  Book Appointment
                </button>
              </div>
            </div> */}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
