import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Loader from "../utils/Loader";
import { useTheme } from "../utils/ThemeContext";

export default function ServiceDetails() {
  const params = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();

  //   Get Single Service
  const getServiceDetail = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/service/get/single/service/${params.id}`
      );
      setData(data?.service);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getServiceDetail();
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <div
        className={`blog-details-wrapper  ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        }`}
      >
        {loading ? (
          <Loader />
        ) : (
          <div
            className={`blog-detail-container ${
              theme === "dark" ? "bg-gray-900" : "bg-white"
            }`}
          >
            <div data-aos="fade-up" className="blogdetail-header">
              <span
                className={` ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {moment(data?.createdAt).format("MMMM D, YYYY")}
              </span>
              <h1
                className={` text-center ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {data?.title}
              </h1>
              <p
                className={` text-center ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {data?.shotDesc}
              </p>
            </div>
            <img
              src={data?.image}
              alt="banner"
              className="w-full h-[21] sm:h-[25rem] mt-[-3rem] rounded-md shadow-md"
            />
            <div className="blogdetail-content1 mt-[-2rem]" data-aos="fade-up">
              <div
                dangerouslySetInnerHTML={{ __html: data?.description }}
              ></div>
            </div>
          </div>
        )}

        <div className="pb-6 flex items-center justify-center w-full">
          <button className="btn" onClick={() => navigate("/create/order")}>
            Order Now
          </button>
        </div>
      </div>
    </Layout>
  );
}
