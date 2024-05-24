import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus } from "react-icons/hi";
import { HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline, IoMdEye, IoMdEyeOff } from "react-icons/io";
import Loader from "../../utils/Loader";
import AdminLayout from "../../components/admin/AdminLayout";
import { useTheme } from "../../utils/ThemeContext";
import { TbLoader2, TbLoader3 } from "react-icons/tb";
import { useAuth } from "../../utils/authContext";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdUpdate } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";

export default function LayoutSetting() {
  const [loading, setLoading] = useState(false);
  const [faqData, setFaqData] = useState([]);
  // const [imageUrl, setImageUrl] = useState(null);
  // const [logo, setLogo] = useState(null);
  const { theme } = useTheme();
  const [isloading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState("faq");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email1, setEmail1] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [imageId, setImageId] = useState("");
  const [load, setLoad] = useState(false);

  //----------Banner Image------->
  const postLogo = (image) => {
    setIsLoading(true);

    if (!image) {
      toast.error("Please select an image!");
      setIsLoading(false);
      return;
    }

    if (
      image.type === "image/jpeg" ||
      image.type === "image/png" ||
      image.type === "image/jpg" ||
      image.type === "image/*"
    ) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "Robbito pic");
      formData.append("cloud_name", "dbdbfg1qw");

      fetch("https://api.cloudinary.com/v1_1/dbdbfg1qw/image/upload", {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          // setBanners((prevBanner) =>
          //   prevBanner?.map((b) =>
          //     b._id === imageId ? { ...b, image: data.url.toString() } : b
          //   )
          // );
          const updatedBanners = banners.map((banner) =>
            banner._id === imageId
              ? { ...banner, image: data.url.toString(), _id: imageId }
              : banner
          );
          setBanners(updatedBanners);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error uploading image:", err);
          toast.error("Error uploading image");
          setIsLoading(false);
        });
    } else {
      toast.error(
        "Invalid file format! Please select a valid image file (jpeg, png,jpg)."
      );
      setIsLoading(false);
    }
  };

  // const updatedBanners = banners.map((banner) =>
  //   banner._id === imageId
  //     ? { ...banner, image: data.url.toString(), _id: imageId }
  //     : banner
  // );

  // Get Banner
  const getBanner = async () => {
    try {
      setLoad(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/layout/get/layout/Banner`
      );
      setBanners(data?.layoutData?.banner);
      console.log(data?.layoutData?.banner);
      setLoad(false);
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };
  useEffect(() => {
    getBanner();
  }, []);

  // Update Banner
  const updateBanner = async () => {
    setLoad(true);
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/layout/update/layout`,
        {
          type: "Banner",
          banner: banners,
        }
      );

      setLoad(false);
      getBanner();
      toast.success("Banner Updated successfully.");
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  // Get FAQ
  const getFAQ = async () => {
    try {
      setLoading(true);
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

  // Get Footer Info
  const getFooter = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/layout/get/layout/Footer`
      );
      setName(data?.layoutData?.footer?.name);
      setEmail(data?.layoutData?.footer?.email);
      setAddress(data?.layoutData?.footer?.address);
      setPhone(data?.layoutData?.footer?.phone);
      setTelephone(data?.layoutData?.footer?.telephone);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getFooter();
  }, []);

  // Update FAQ
  const updateFAQ = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/layout/update/layout`,
        {
          type: "FAQ",
          faq: faqData,
        }
      );
      if (data?.success) {
        setIsLoading(false);
        getFAQ();
        toast.success("FAQ Updated successfully.");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // Toggle Questions
  const toggleQuestion = (id) => {
    setFaqData((prevFaqs) =>
      prevFaqs?.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  const handleQuestionChange = (id, value) => {
    setFaqData((prevFaqs) =>
      prevFaqs?.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };
  const handleAnswerChange = (id, value) => {
    setFaqData((prevFaqs) =>
      prevFaqs?.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const newFAQHandler = () => {
    setFaqData([...faqData, { question: "", answer: "" }]);
  };

  // Update Footer
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/layout/update/layout`,
        {
          type: "Footer",
          footer: { name, email, address, phone, telephone },
        }
      );
      if (data?.success) {
        getFooter();
        toast.success("Information updated!");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      setIsLoading(false);
    }
  };

  const getAuth = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/user/get/user/${auth.user._id}`
      );
      if (data?.success) {
        setLoading(false);
        setEmail1(data?.user?.email);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getAuth();
    //eslint-disable-next-line
  }, []);

  // Update Auth
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/user/update/user/${auth.user._id}`,
        { email: email1, newPassword: password }
      );
      if (data.success) {
        setLoading(false);
        toast.success("Profile Update successfully!");
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  // Get ALl Categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/gallery/get/category`
      );
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllCategories();
    //eslint-disable-next-line
  }, []);

  // Set Single Category
  const getSingleCategories = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/gallery/get/single/category/${id}`
      );

      setCategoryName(data?.catrgory?.name);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  // Create Category
  const handleCategory = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/gallery/create/category`,
        { name: categoryName }
      );
      if (data.success) {
        setIsLoading(false);
        setCategoryName("");
        getAllCategories();

        toast.success("Category added successfully!");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/gallery/update/category/${categoryId}`,
        { name: categoryName }
      );
      if (data.success) {
        setIsLoading(false);
        getAllCategories();
        setCategoryId("");
        setCategoryName("");
        toast.success("Category updated!");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/gallery/delete/category/${id}`
      );
      if (data.success) {
        getAllCategories();
        toast.success("Category deleted!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <AdminLayout>
      <div className="w-full h-[89%]  py-7 px-3 sm:px-5 overflow-y-auto message pb-[4rem]">
        <h1
          className="text-2xl sm:text-3xl font-semibold "
          style={{
            textShadow: "-.1px 1px 0px #ccc",
          }}
        >
          Layout Settings
        </h1>
        <hr className="my-3 h-[1px] bg-gray-300" />
        <div className="flex flex-col gap-4 mt-[2rem]">
          <div className="flex items-center justify-center w-fit h-[2.8rem] overflow-hidden border rounded-md shadow-md cursor-pointer ">
            <button
              className={`w-full h-full px-2 sm:px-4  border-r-[1px] border-gray-400  ${
                isActive === "faq"
                  ? "bg-yellow-700 text-white"
                  : "bg-yellow-600/20 "
              } `}
              onClick={() => setIsActive("faq")}
            >
              FAQ
            </button>
            <button
              className={`w-full h-full px-2 sm:px-4  border-l-[1px] border-gray-400  ${
                isActive === "footer"
                  ? "bg-yellow-700 text-white"
                  : "bg-yellow-600/20 "
              }   `}
              onClick={() => setIsActive("footer")}
            >
              Footer
            </button>
            <button
              className={`w-full h-full px-2 sm:px-4  border-l-[1px] border-gray-400  ${
                isActive === "login"
                  ? "bg-yellow-700 text-white"
                  : "bg-yellow-600/20 "
              }   `}
              onClick={() => setIsActive("login")}
            >
              Login
            </button>
            <button
              className={`w-full h-full px-2 sm:px-4  border-l-[1px] border-gray-400  ${
                isActive === "category"
                  ? "bg-yellow-700 text-white"
                  : "bg-yellow-600/20 "
              }   `}
              onClick={() => setIsActive("category")}
            >
              Category
            </button>
            <button
              className={`w-full h-full px-2 sm:px-4 border-l-[1px] border-gray-400  ${
                isActive === "banner"
                  ? "bg-yellow-700 text-white"
                  : "bg-yellow-600/20 "
              }   `}
              onClick={() => setIsActive("banner")}
            >
              Banner
            </button>
          </div>
          {/* Logo Setting */}
          {/* <div className="">
            <h3 className="text-xl font-[600] text-black ">Modify Logo</h3>
            <hr className="my-3 h-[1px] bg-gray-300" />
            <label className="flex items-center gap-4">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="logoInput"
              />
              <div className="relative w-[3.5rem] h-[3.5rem] bg-white rounded-full border">
                <img
                  src={imageUrl ? imageUrl : logo?.logoImage}
                  alt="Logo"
                  className=" shadow-md cursor-pointer w-[3.5rem] h-[3.5rem]  rounded-full "
                  id="logoImage"
                />
                <GrUpdate className="h-5 w-5 text-fuchsia-500 absolute bottom-[.5rem] right-[-.5rem] z-40" />
              </div>
              {imageUrl && (
                <button
                  className="text-[15px] w-[4.3rem] h-[2.1rem] text-white bg-green-500 cursor-pointer flex items-center justify-center rounded-md hover:shadow-xl shadow-gray-300  "
                  onClick={updateLogo}
                >
                  Save
                </button>
              )}
            </label>
          </div> */}
          {/* FAQ Edit */}
          {loading ? (
            <Loader />
          ) : (
            <div className="">
              {isActive === "faq" ? (
                <div className="">
                  <h3 className="text-xl font-[600] ">FAQ Edit</h3>
                  <hr className="my-3 h-[1px] bg-gray-300" />

                  <dl className="space-y-8">
                    {faqData?.map((faq, i) => (
                      <div
                        className={`${
                          faq._id !== faqData[0]?._id && "border-t"
                        } border-gray-300 bg-gray-100 px-2 py-2 rounded-md shadow-md hover:shadow-lg stroke-gray-200   `}
                        key={faq?._id}
                      >
                        <dt className="text-lg ">
                          <button
                            className="flex items-center  text-black justify-between w-full text-left focus:outline-none"
                            onClick={() => toggleQuestion(faq._id)}
                          >
                            <input
                              type="text"
                              className={`w-full border-2 rounded-sm bg-transparent border-none border-gray-300  outline-none py-2 px-2 cursor-pointer `}
                              value={faq?.question}
                              onChange={(e) =>
                                handleQuestionChange(faq?._id, e.target.value)
                              }
                              placeholder="Add your questions..."
                            />
                            <span className="ml-6 flex-shrink-0">
                              {faq?.active ? (
                                <HiMinus className="w-6 h-6 cursor-pointer" />
                              ) : (
                                <HiPlus className="w-6 h-6 cursor-pointer" />
                              )}
                            </span>
                          </button>
                        </dt>
                        {faq.active && (
                          <dd className="mt-2 mr-[1.5rem] border-t border-gray-300">
                            <textarea
                              className="w-full text-gray-800 h-[7rem] bg-transparent sm:h-[4rem] border-2 border-none resize-none border-gray-300   rounded-sm outline-none py-2 px-2 cursor-pointer "
                              value={faq?.answer}
                              onChange={(e) =>
                                handleAnswerChange(faq?._id, e.target.value)
                              }
                              placeholder="Add your answer..."
                            />
                            <span className="ml-10 flex-shrink-0">
                              <AiOutlineDelete
                                className="text-black text-[18px] hover:text-red-500 cursor-pointer"
                                onClick={() => {
                                  setFaqData((prevFaq) =>
                                    prevFaq.filter(
                                      (item) => item?._id !== faq?._id
                                    )
                                  );
                                }}
                              />
                            </span>
                          </dd>
                        )}
                      </div>
                    ))}
                  </dl>
                  <br />
                  <br />
                  <IoMdAddCircleOutline
                    className=" text-[25px] cursor-pointer"
                    onClick={newFAQHandler}
                  />
                  <div className="w-[98%] sm:w-[96%] flex items-center justify-end ">
                    <div
                      className="flex bg-yellow-700 items-center justify-center w-[7rem] h-[2.6rem] cursor-pointer rounded-3xl text-[16px] text-white hover:scale-[1.01] hover:shadow-2xl"
                      onClick={updateFAQ}
                    >
                      {isloading ? (
                        <TbLoader2 className="h-5 w-5 animate-spin text-white" />
                      ) : (
                        "Update"
                      )}
                    </div>
                  </div>
                </div>
              ) : isActive === "footer" ? (
                <div className="">
                  <h3 className="text-xl font-[600] ">Footer Edit</h3>
                  <hr className="my-3 h-[1px] bg-gray-300" />
                  <div className="mt-2 flex items-center justify-center px-3">
                    <form
                      onSubmit={handleSubmit}
                      className={`py-4 px-3 sm:px-4 rounded-md shadow-md flex flex-col gap-4 w-[30rem] min-w-[20rem] ${
                        theme === "dark" ? "bg-gray-800" : "bg-white"
                      } `}
                    >
                      <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`border-2 w-full h-[2.8rem] px-3 cursor-pointer rounded-md shadow-md ${
                          theme === "dark"
                            ? "border-gray-300 bg-gray-700 text-white"
                            : "border-gray-800 bg-gray-100 text-black"
                        }`}
                      />
                      <input
                        type="text"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`border-2 w-full h-[2.8rem] px-3 cursor-pointer rounded-md shadow-md ${
                          theme === "dark"
                            ? "border-gray-300 bg-gray-700 text-white"
                            : "border-gray-800 bg-gray-100 text-black"
                        }`}
                      />
                      <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className={`border-2 w-full h-[2.8rem] px-3 cursor-pointer rounded-md shadow-md ${
                          theme === "dark"
                            ? "border-gray-300 bg-gray-700 text-white"
                            : "border-gray-800 bg-gray-100 text-black"
                        }`}
                      />
                      <input
                        type="text"
                        placeholder="Phone Number"
                        minLength={11}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`border-2 w-full h-[2.8rem] px-3 cursor-pointer rounded-md shadow-md ${
                          theme === "dark"
                            ? "border-gray-300 bg-gray-700 text-white"
                            : "border-gray-800 bg-gray-100 text-black"
                        }`}
                      />
                      <input
                        type="tel"
                        placeholder="Telephone Number"
                        minLength={10}
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        className={`border-2 w-full h-[2.8rem] px-3 cursor-pointer rounded-md shadow-md ${
                          theme === "dark"
                            ? "border-gray-300 bg-gray-700 text-white"
                            : "border-gray-800 bg-gray-100 text-black"
                        }`}
                      />
                      <div className="flex items-center justify-end">
                        <button className="btn">
                          {isloading ? (
                            <TbLoader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            "Update"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : isActive === "category" ? (
                <div className="">
                  <h3 className="text-xl font-[600] ">Categories</h3>
                  <hr className="my-3 h-[1px] bg-gray-300" />
                  <div className="mt-2 flex items-center justify-center px-3">
                    <form
                      onSubmit={categoryId ? handleUpdate : handleCategory}
                      className={` relative py-4 px-3 sm:px-4 rounded-md shadow-md flex flex-col gap-4 w-[30rem] min-w-[20rem] ${
                        theme === "dark" ? "bg-gray-800" : "bg-white"
                      } `}
                    >
                      {categoryId && (
                        <span className="absolute top-2 right-2 cursor-pointer z-10">
                          <IoClose
                            className="h-5 w-5 cursor-pointer"
                            onClick={() => {
                              setCategoryName("");
                              setCategoryId("");
                            }}
                          />
                        </span>
                      )}
                      <h1 className="font-semibold text-xl">
                        Create New Category
                      </h1>
                      <input
                        type="text"
                        placeholder="Category Name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className={`border-2 w-full h-[2.8rem] px-3 cursor-pointer rounded-md shadow-md ${
                          theme === "dark"
                            ? "border-gray-300 bg-gray-700 text-white"
                            : "border-gray-800 bg-gray-100 text-black"
                        }`}
                      />

                      <div className="flex items-center justify-end">
                        <button className="btn">
                          {isloading ? (
                            <TbLoader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <>{categoryId ? "Update" : "Create"}</>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                  <hr className="my-3 h-[1px] bg-gray-300" />
                  <h3 className="text-xl font-[600]  ">All Categories</h3>
                  <div className="flex items-center flex-wrap gap-6 mt-6">
                    {categories &&
                      categories.map((category) => (
                        <div
                          key={category._id}
                          className={`flex items-center min-w-[10rem] gap-6 border shadow-md hover:shadow-lg cursor-pointer py-3 px-5 rounded-lg ${
                            theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                          } `}
                        >
                          <span className="text-lg font-medium">
                            {category?.name}
                          </span>
                          <div className="flex flex-col gap-4">
                            <span
                              onClick={() => {
                                getSingleCategories(category._id);
                                setCategoryId(category._id);
                              }}
                            >
                              <MdUpdate className="h-5 w-5 text-yellow-500 hover:text-yellow-600 cursor-pointer" />
                            </span>
                            <span onClick={() => handleDelete(category._id)}>
                              <MdDelete className="h-5 w-5 text-red-500 hover:text-red-600 cursor-pointer" />
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : isActive === "banner" ? (
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-[600] ">Update Banners</h3>
                  <hr className="my-3 h-[1px] bg-gray-300" />
                  <div className={`w-full min-h-screen `}>
                    <div className="  px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {banners?.map((b, i) => (
                        <div
                          key={b?._id}
                          className="rounded-md shadow-md cursor-pointer relative hover:shadow-xl hover:scale-105 overflow-hidden transition duration-200 border"
                        >
                          <label
                            htmlFor={`updatebanner-${i}`}
                            className={`absolute top-2 right-3 bg-yellow-700 z-10 p-[6px] rounded-md shadow-md cursor-pointer ${
                              isloading && "pointer-events-none"
                            } `}
                            onClick={() => setImageId(b?._id)}
                            disabled={isloading}
                          >
                            <GrUpdate
                              className={`h-5 w-5 text-white cursor-pointer ${
                                isloading &&
                                imageId === b?._id &&
                                "animate-spin"
                              }`}
                            />
                            <input
                              type="file"
                              id={`updatebanner-${i}`}
                              onChange={(e) => postLogo(e.target.files[0])}
                              className="hidden"
                            />
                          </label>
                          <img
                            src={b?.image}
                            alt="Banner"
                            className="w-full h-full rounded-md"
                            onClick={() => setImageId(b?._id)}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-end mt-7 cursor-pointer px-4 sm:px-8">
                      <button
                        className="btn"
                        onClick={updateBanner}
                        disabled={load}
                      >
                        {load ? (
                          <TbLoader3 className="h-4 w-4 animate-spin text-white" />
                        ) : (
                          "Update"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-[600] ">Update Authentication</h3>
                  <hr className="my-3 h-[1px] bg-gray-300" />
                  <div
                    className={`w-full min-h-screen flex items-center justify-center px-3 `}
                  >
                    <form
                      onSubmit={handleAuth}
                      className={`flex flex-col gap-4 min-w-[19rem] w-[30rem]  shadow-md py-5 px-4 rounded-md  ${
                        theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                      }  `}
                    >
                      <h3 className="text-center font-semibold text-2xl">
                        Update Auth
                      </h3>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="" className="text-[16px]">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="Email"
                          required
                          value={email1}
                          onChange={(e) => setEmail1(e.target.value)}
                          className={` w-full h-[2.8rem] rounded-md shadow-lg border-2 outline-none px-3 ${
                            theme === "dark"
                              ? "bg-gray-700 border-gray-300"
                              : "bg-gray-50 border-gray-800"
                          } `}
                        />
                      </div>
                      <div className=" relative flex flex-col gap-1">
                        <label htmlFor="" className="text-[16px]">
                          Password <span className="text-red-500">*</span>
                        </label>
                        <span
                          className="absolute top-10 z-[5] right-3 cursor-pointer"
                          onClick={() => setIsShow(!isShow)}
                        >
                          {isShow ? (
                            <IoMdEyeOff className={`h-6 w-6 `} />
                          ) : (
                            <IoMdEye className={`h-6 w-6 `} />
                          )}
                        </span>
                        <input
                          type={isShow ? "text" : "password"}
                          placeholder="Password"
                          required
                          minLength={8}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={` w-full h-[2.8rem] rounded-md shadow-lg border-2 outline-none px-3 ${
                            theme === "dark"
                              ? "bg-gray-700 border-gray-300"
                              : "bg-gray-50 border-gray-800"
                          } `}
                        />
                      </div>
                      <div className="flex items-center justify-end font-medium mt-4">
                        <button
                          className="btn"
                          style={{
                            height: "2.5rem",
                            padding: "0 2rem",
                            width: "6.5rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {loading ? (
                            <TbLoader3 className="h-5 w-5 animate-spin" />
                          ) : (
                            "Update"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
          {/*  */}
        </div>
      </div>
    </AdminLayout>
  );
}
