import React, { useState } from "react";
import "./../contact.css";
import Layout from "../../components/Layout";
import { BiLoaderCircle } from "react-icons/bi";
import { FiUploadCloud } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../utils/ThemeContext";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { TbLoader3 } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
// import FileViewer from "react-file-viewer";

export default function CreateOrder() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [url, setUrl] = useState("");

  //   UPload Files
  // Upload Images in Cloudinary

  const postDetails = (fileArray) => {
    setLoad(true);

    if (!fileArray || fileArray.length === 0) {
      toast.error("Please select at least one file!");
      setLoad(false);
      return;
    }

    const formDataArray = fileArray?.map((image) => {
      if (image.size <= 4 * 1024 * 1024) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "Robbito pic");
        formData.append("cloud_name", "dbdbfg1qw");
        return formData;
      } else {
        toast.error(
          "One or more selected files exceed the maximum size of 4MB!",
          {
            duration: 3000,
          }
        );
        setLoad(false);
        throw new Error("File size exceeded.");
      }
    });

    Promise.all(
      formDataArray.map(async (formData) => {
        return fetch("https://api.cloudinary.com/v1_1/dbdbfg1qw/image/upload", {
          method: "post",
          body: formData,
        })
          .then((res) => res.json())
          .catch((err) => {
            console.error("Error uploading image:", err);
            toast.error("Error uploading image");
            throw err;
          });
      })
    )
      .then((uploadedImages) => {
        const imageUrls = uploadedImages.map((data) => data.url.toString());
        console.log("Files:", imageUrls);
        setFiles((prevImages) => [...prevImages, ...imageUrls]);
        setLoad(false);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        setLoad(false);
      });
  };

  // Create Order
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/order/create/order`,
        { name, email, phone, state, country, address, postalCode, files }
      );
      if (data.success) {
        toast.success("Order submitted successfully!");
        setLoading(false);
        navigate("/order/success");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  //   Handle Drop file
  const handleDrop = (url) => {
    const newImages = files.filter((file) => file !== url);
    setFiles(newImages);
  };
  return (
    <Layout>
      <div className="w-full min-h-screen py-5 px-2 sm:px-4 flex items-center justify-center relative">
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col gap-3 w-[35rem] py-4 px-3 rounded-md border-2 ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-100 "
          } border-gray-400 shadow-md `}
        >
          <h1 className="text-center text-2xl sm:text-3xl font-semibold pb-3">
            Order Now
          </h1>
          <div className="flex items-center gap-3">
            <div className="inputBox w-full">
              <input
                type="text"
                required
                value={name}
                style={{ fontWeight: 400 }}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent border-2 border-gray-400  "
              />
              <span>Full Name</span>
            </div>
            <div className="inputBox w-full">
              <input
                type="email"
                required
                value={email}
                style={{ fontWeight: 400 }}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-2 border-gray-400  "
              />
              <span>Email Address</span>
            </div>
          </div>
          {/*  */}
          <div className="flex items-center gap-3">
            <div className="inputBox w-full">
              <input
                type="tel"
                required
                minLength={10}
                value={phone}
                style={{ fontWeight: 400 }}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-transparent border-2 border-gray-400  "
              />
              <span>Phone Number</span>
            </div>
            <div className="inputBox w-full">
              <input
                type="text"
                required
                value={state}
                style={{ fontWeight: 400 }}
                onChange={(e) => setState(e.target.value)}
                className="bg-transparent border-2 border-gray-400  "
              />
              <span>State</span>
            </div>
          </div>
          {/*  */}
          <div className="flex items-center gap-3">
            <div className="inputBox w-full">
              <input
                type="text"
                required
                value={country}
                style={{ fontWeight: 400 }}
                onChange={(e) => setCountry(e.target.value)}
                className="bg-transparent border-2 border-gray-400  "
              />
              <span>Country</span>
            </div>
            <div className="inputBox w-full">
              <input
                type="text"
                required
                value={postalCode}
                style={{ fontWeight: 400 }}
                onChange={(e) => setPostalCode(e.target.value)}
                className="bg-transparent border-2 border-gray-400  "
              />
              <span>Postal Code </span>
            </div>
          </div>
          <div className="inputBox w-full">
            <input
              type="text"
              required
              value={address}
              style={{ fontWeight: 400 }}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-transparent border-2 border-gray-400  "
            />
            <span>Permanent Address</span>
          </div>

          <div className="flex items-center flex-wrap gap-4">
            <input
              type="file"
              id="selectImage"
              multiple
              onChange={(e) => postDetails([...e.target.files])}
              className="hidden"
            />

            <label
              htmlFor="selectImage"
              className="w-[8rem] h-[8rem] border-2 rounded-md border-dashed border-yellow-600 hover:shadow-xl shadow-gray-200 shadow-md cursor-pointer flex items-center justify-center flex-col gap-2"
            >
              {load ? (
                <TbLoader3 className="h-6 w-6 text-green-500 animate-spin" />
              ) : (
                <FiUploadCloud className="w-8 h-8 text-yellow-600 animate-pulse" />
              )}
              <span className="text-[13px] font-semibold">
                {load ? "Uploading..." : "Upload File"}
              </span>
            </label>

            {files?.map((imageUrl, index) => (
              <Link
                to={imageUrl}
                key={index}
                className="relative w-[9rem] h-[8rem]  overflow-hidden border-2 border-gray-300  shadow-gray-300 filter hover:drop-shadow-md rounded-md  shadow-md object-fill hover:shadow-xl transition duration-100"
                // onClick={() => {
                //   setUrl(imageUrl);
                //   setIsShow(true);
                // }}
                target="_blank"
              >
                <div className="absolute top-[.1rem] right-[.1rem] z-40 cursor-pointer">
                  <IoMdCloseCircleOutline
                    className="h-5 w-5 text-yellow-600 hover:text-red-500 "
                    onClick={() => handleDrop(imageUrl)}
                  />
                </div>
                <img
                  src="/any.png"
                  alt={`ImageData ${index + 1}`}
                  className="w-full h-full"
                />
              </Link>
            ))}
          </div>

          <div className="submit-button">
            <button
              type="submit"
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".5rem",
                background: "#846500",
                padding: ".4rem 1rem",
                fontWeight: 500,
              }}
              className="btn"
            >
              {loading ? (
                <BiLoaderCircle className="animate-spin w-4 h-4 text-white" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
        {/* View PDF */}
        {isShow && url && (
          <div className="fixed z-[99] top-0 left-0 bg-black/70 w-full h-full flex items-center justify-center ">
            <span className="absolute top-3 right-3 ">
              <IoClose
                className="h-7 w-7 text-white"
                onClick={() => setIsShow(false)}
              />
            </span>
            <div className="py-5 px-4">
              {/* <FileViewer
                fileType="url"
                filePath={url}
                onError={(e) => console.log("Error:", e)}
              /> */}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
