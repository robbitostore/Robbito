import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useTheme } from "../../../utils/ThemeContext";
import toast from "react-hot-toast";
import axios from "axios";
import { LuUploadCloud } from "react-icons/lu";
import JoditEditor from "jodit-react";
import { LuLoader2 } from "react-icons/lu";
import { BiLoaderAlt } from "react-icons/bi";

export default function ServiceModal({
  setIsShow,
  serviceId,
  getAllService,
  setServiceId,
}) {
  const { theme } = useTheme();
  const editor = useRef(null);
  const [isloading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [shotDesc, setShotDesc] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

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
          setImage(data.url.toString());
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

  //   Add & Edit Services
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (serviceId) {
        const { data } = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/v1/service/update/service/${serviceId}`,
          { title, description, shotDesc, image }
        );
        if (data?.success) {
          toast.success("Service updated successfully!");
          getAllService();
          setServiceId("");
          setIsLoading(false);
          setIsShow(false);
        }
      } else {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/service/create/services`,
          { title, description, shotDesc, image }
        );
        if (data.success) {
          toast.success("Service created successfully!");
          getAllService();
          setIsLoading(false);
          setIsShow(false);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  //   Get Existing Service
  const getService = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/service/get/single/service/${serviceId}`
      );

      if (data) {
        setTitle(data?.service?.title);
        setDescription(data?.service?.description);
        setShotDesc(data?.service?.shotDesc);
        setImage(data?.service?.image);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getService();
    //eslint-disable-next-line
  }, [serviceId]);

  // Editor configuration
  const config = {
    readonly: false,
    contentCss: "body { color: red; }",
    height: 300,
    width: 1000,
    color: "#111",
  };
  return (
    <div
      className={`py-4 px-4 rounded-lg shadow-md h-[98vh] message overflow-scroll w-[98%] sm:w-[50%] md:[80%] relative  ${
        theme === "dark" ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <h1 className="text-xl font-semibold ">
        {serviceId ? "Edit Service" : "Add Service"}
      </h1>
      <span
        className="absolute top-3 right-3 cursor-pointer"
        onClick={() => {
          setIsShow(false);
          setServiceId("");
        }}
      >
        <IoClose className="h-5 w-5 " />
      </span>

      <form
        onSubmit={handleSubmit}
        className=" mt-6 flex  flex-col gap-4"
        enctype="multipart/form-data"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-4">
            {/* Title */}

            <div className="flex flex-col gap-1">
              <span>
                Title <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                placeholder="Service Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full h-[2.8rem] border-2 rounded-md shadow-md px-3 outline-none ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-200 "
                    : "bg-white border-gray-500 "
                }`}
              />
            </div>
            {/* Shot Desc */}
            <div className="flex flex-col gap-1">
              <span>
                Shot Decription <span className="text-red-500">*</span>
              </span>
              <textarea
                type="text"
                placeholder="Shot Description"
                required
                value={shotDesc}
                onChange={(e) => setShotDesc(e.target.value)}
                className={`w-full h-[6rem] border-2 resize-none rounded-md shadow-md px-3 outline-none ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-200 "
                    : "bg-white border-gray-500 "
                }`}
              />
            </div>
          </div>
          {/* Image */}

          <div className="h-[13.5rem] relative border-2 border-dashed border-yellow-600 rounded-lg overflow-hidden ">
            {image ? (
              <>
                <span
                  className="absolute top-2 right-2 cursor-pointer z-[20] p-1 rounded-md hover:bg-yellow-600/20"
                  onClick={() => setImage("")}
                >
                  <IoClose className="h-5 w-5 text-white hover:text-red-500" />
                </span>
                <img src={image} alt="Logo" className="w-full h-full" />
              </>
            ) : (
              <>
                <label
                  htmlFor="uploadimage"
                  className="flex items-center justify-center flex-col cursor-pointer gap-1 w-full h-full"
                >
                  {isloading ? (
                    <BiLoaderAlt className="h-7 w-7 animate-spin text-yellow-600" />
                  ) : (
                    <LuUploadCloud className="h-12 w-12 text-yellow-600" />
                  )}
                  <span className="text-[16px] font-[500] ">
                    {" "}
                    {isloading ? "Uploading..." : "Upload Image"}
                  </span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="uploadimage"
                  name="logoImage"
                  className="hidden"
                  onChange={(e) => postLogo(e.target.files[0])}
                />
              </>
            )}
          </div>
        </div>
        {/* Desc */}
        <JoditEditor
          ref={editor}
          value={description}
          config={config}
          color="#fff"
          tabIndex={1}
          onBlur={(newContent) => setDescription(newContent)}
        />
        <div className="flex items-center justify-end">
          <button className="btn" style={{ borderRadius: ".4rem" }}>
            {isloading ? (
              <LuLoader2 className="h-5 w-5 animate-spin" />
            ) : serviceId ? (
              "Update"
            ) : (
              "Create"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
