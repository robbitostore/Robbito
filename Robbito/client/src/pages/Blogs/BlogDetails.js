import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useTheme } from "../../utils/ThemeContext";
import Loader from "../../utils/Loader";

export default function BlogDetails() {
  const params = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();

  //   Get Single Blog
  const getBlogDetail = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/blog/get/single/blog/${params.id}`
      );
      setData(data?.blog);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogDetail();
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
              className="w-full h-[23rem] mt-[-3rem] rounded-md shadow-md"
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
