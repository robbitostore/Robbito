import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useTheme } from "../../../utils/ThemeContext";
import toast from "react-hot-toast";
import { MdOutlineDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import Loader from "../../../utils/Loader";

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [serviceId, setServiceId] = useState("");
  const [services, setServices] = useState([]);
  const { theme } = useTheme();
  const [show, setShow] = useState(false);
  const [indexs, setIndexs] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get ALl Services
  const getAllGallery = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/gallery/all/galleries`
      );

      if (data.success) {
        setServices(data.gallery);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllGallery();
    //eslint-disable-next-line
  }, []);

  // Delete Service
  const deleteService = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/gallery/delete/gallery/${id}`
      );

      if (data.success) {
        setShow(false);
        toast.success("Service deleted successfully!");
        getAllGallery();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <AdminLayout
      open={open}
      setOpen={setOpen}
      serviceId={serviceId}
      getAllGallery={getAllGallery}
      setServiceId={setServiceId}
    >
      <div className="w-full min-h-screen py-4 px-4 relative overscroll-y-auto scroll pb-[8rem]">
        <div className="flex  items-start sm:items-center justify-start gap-4 sm:justify-between flex-col sm:flex-row">
          <h1 className="font-semibold text-2xl sm:text-3xl ">
            Gallery / Portfolio
          </h1>
          <div className="flex items-center justify-end w-full sm:w-auto">
            {!open && (
              <button
                className="btn capitalize cursor-pointer  flex items-center justify-center gap-1"
                onClick={() => setOpen(true)}
                style={{ fontSize: "14px", padding: ".5rem 1rem" }}
              >
                <FaPlus className="h-4 w-4" /> Add New
              </button>
            )}
          </div>
        </div>
        {/* Line */}
        <div
          className={`w-full h-[2px] mt-8 ${
            theme === "dark" ? "bg-gray-600" : "bg-gray-400"
          } `}
        ></div>
        {/*  */}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {services?.map((gallary, index) => (
              <div
                className={`rounded-lg shadow-md  ${
                  theme === "dark" ? "bg-gray-900" : "bg-gray-100"
                } cursor-pointer border hover:shadow-xl overflow-hidden`}
                key={gallary._id}
              >
                <img
                  src={gallary?.image}
                  alt="serviceLogi"
                  className="w-full h-[15rem]"
                />
                <div className="flex flex-col gap-2 py-4 px-4 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[19px] font-semibold">
                      {gallary?.name}
                    </span>
                    <span
                      className="p-1 cursor-default hover:bg-gray-300/50 border rounded-md shadow-md"
                      onClick={() => {
                        setIndexs(index);
                        setShow(!show);
                      }}
                    >
                      <BsThreeDotsVertical className="h-4 w-4 cursor-pointer hover:scale-[1.03]" />
                    </span>
                    {show && indexs === index && (
                      <div
                        className={`absolute top-[-3rem] right-10 z-20 flex flex-col py-1 px-2 gap-2 w-[11rem] rounded-md  ${
                          theme === "dark" ? "bg-gray-800" : "bg-gray-700"
                        } `}
                      >
                        <span
                          className="w-full rounded-md border shadow-md  text-white flex items-center py-1 px-2  transition duration-200 hover:bg-yellow-600/65"
                          onClick={() => {
                            setServiceId(gallary?._id);
                            setOpen(true);
                            setShow(false);
                          }}
                        >
                          <GrUpdate className="h-4 w-4 text-white cursor-pointer mr-2" />{" "}
                          Update
                        </span>
                        <span
                          className="w-full rounded-md py-1 border text-white shadow-md px-2 flex items-center transition duration-200 hover:bg-red-500"
                          onClick={() => deleteService(gallary?._id)}
                        >
                          <MdOutlineDelete className="h-5 w-5 text-white cursor-pointer mr-2" />
                          Delete
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-[16px] font-semibold capitalize">
                    Category: {gallary?.category}
                  </span>
                  <span className="">
                    {gallary?.description?.length > 60
                      ? gallary?.description?.slice(0, 60) + "..."
                      : gallary?.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
