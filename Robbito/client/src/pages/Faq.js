import Layout from "../components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiMinus } from "react-icons/hi";
import { HiPlus } from "react-icons/hi";
import Loader from "../utils/Loader";
import { useTheme } from "../utils/ThemeContext";

export default function Faq() {
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  // Get FAQ
  const getFAQ = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/layout/get/layout/FAQ`
      );
      setFaqData(data?.layoutData?.faq);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getFAQ();
  }, []);

  // Toggle Questions
  const toggleQuestion = (id) => {
    setFaqData((prevFaqs) =>
      prevFaqs?.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };
  return (
    <Layout>
      <div className="w-full min-h-screen pt-[2rem] pb-[3rem] px-2 sm:px-6">
        <div className="flex flex-col gap-2 ">
          <h1 className="text-3xl sm:text-4xl italic heading font-semibold sm:font-bold text-center ">
            Frequently Asked Questions
          </h1>
          {/* <span className="text-[15px] font-medium text-center">
            Dive into the fountain of knowledge! Explore our FAQ section to
            unravel answers, making your experience with us as smooth as
            possible
          </span> */}
        </div>
        <div className="flex items-center justify-center flex-col w-full mt-[4rem] px-3">
          {/* <div className="">
            <img src="/faq.png" alt="FAQ" className="box1" />
          </div> */}
          <div className="">
            {loading ? (
              <Loader />
            ) : (
              <dl className="space-y-8 ">
                {faqData?.map((faq, i) => (
                  <div
                    className={`${
                      faq._id !== faqData[0]?._id && "border-t"
                    } border-gray-300 ${
                      theme === "dark"
                        ? "text-gray-50 bg-gray-800 border-gray-500"
                        : "text-gray-900 bg-gray-100 border-gray-500"
                    }  w-[20rem] sm:w-[40rem]  px-2 py-2 rounded-md shadow-md dark:shadow-sm hover:shadow-lg  `}
                    key={faq?._id}
                  >
                    <dt className="text-lg ">
                      <button
                        className="flex items-center w-[20rem] sm:w-[40rem] justify-between  text-left focus:outline-none"
                        onClick={() => toggleQuestion(faq._id)}
                      >
                        <input
                          className={`w-full border-2  rounded-sm bg-transparent border-none border-gray-300 ${
                            theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                          } outline-none py-2 px-2 cursor-pointer `}
                          value={faq?.question}
                          disabled
                        />
                        <span className="mr-3 sm:mr-4 flex-shrink-0">
                          {faq?.active ? (
                            <HiMinus className="w-6 h-6 cursor-pointer" />
                          ) : (
                            <HiPlus className="w-6 h-6 cursor-pointer" />
                          )}
                        </span>
                      </button>
                    </dt>
                    {faq.active && (
                      <dd className="mt-2 mr-[1.5rem] border-t border-gray-300 w-full">
                        <p
                          className={`pt-2 pl-2 ${
                            theme === "dark" ? "text-gray-50" : "text-gray-900"
                          }  `}
                        >
                          {faq?.answer}
                        </p>
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
