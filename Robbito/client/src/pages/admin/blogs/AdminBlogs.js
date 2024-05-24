import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useTheme } from "../../../utils/ThemeContext";
import toast from "react-hot-toast";
import { MdOutlineDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import AddEditBlogs from "./AddEditBlogs";
import Loader from "../../../utils/Loader";

export default function AdminBlogs() {
  const [isShow, setIsShow] = useState(false);
  const [blogId, setBlogId] = useState("");
  const [blogs, setBlogs] = useState([]);
  const { theme } = useTheme();
  const [show, setShow] = useState(false);
  const [indexs, setIndexs] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get ALl Blogs
  const getAllBlogs = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/blog/get/blogs`
      );

      if (data.success) {
        setBlogs(data.blogs);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllBlogs();
    //eslint-disable-next-line
  }, []);

  // Delete Blog
  const deleteBlog = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/blog/delete/blog/${id}`
      );

      if (data.success) {
        setShow(false);
        toast.success("Blog deleted successfully!");
        getAllBlogs();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <AdminLayout>
      {!isShow ? (
        <div className="w-full min-h-screen py-4 px-4 relative overscroll-y-auto scroll pb-[8rem]">
          <div className="flex  items-start sm:items-center justify-start gap-4 sm:justify-between flex-col sm:flex-row">
            <h1 className="font-semibold text-2xl sm:text-3xl ">
              All Blogs / News
            </h1>
            <div className="flex items-center justify-end w-full sm:w-auto">
              {!isShow && (
                <button
                  className="btn capitalize cursor-pointer  flex items-center justify-center gap-1"
                  onClick={() => setIsShow(true)}
                  style={{ fontSize: "14px", padding: ".5rem 1rem" }}
                >
                  <FaPlus className="h-4 w-4" /> Add Blog
                </button>
              )}
            </div>
          </div>
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
              {blogs?.map((blog, index) => (
                <div
                  className={`rounded-lg shadow-md  ${
                    theme === "dark" ? "bg-gray-900" : "bg-gray-100"
                  } cursor-pointer border hover:shadow-xl overflow-hidden`}
                  key={blog._id}
                >
                  <img
                    src={blog?.image}
                    alt="serviceLogi"
                    className="w-full h-[15rem]"
                  />
                  <div className="flex flex-col gap-2 py-4 px-4 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[19px] font-semibold">
                        {blog?.title}
                      </span>
                      <span
                        className="p-1 absolute top-2 right-2 cursor-default hover:bg-gray-300/50 border rounded-md shadow-md"
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
                              setBlogId(blog._id);
                              setIsShow(true);
                              setShow(false);
                            }}
                          >
                            <GrUpdate className="h-4 w-4 text-white cursor-pointer mr-2" />{" "}
                            Update
                          </span>
                          <span
                            className="w-full rounded-md py-1 border text-white shadow-md px-2 flex items-center transition duration-200 hover:bg-red-500"
                            onClick={() => deleteBlog(blog._id)}
                          >
                            <MdOutlineDelete className="h-5 w-5 text-white cursor-pointer mr-2" />
                            Delete
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="">
                      <span className="text-lg font-medium">Desc: </span>
                      {blog?.shotDesc?.length > 60
                        ? blog.shotDesc.slice(0, 60) + "..."
                        : blog?.shotDesc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full min-h-screen py-4 px-4 relative overscroll-y-auto scroll pb-[8rem]">
          <AddEditBlogs
            setIsShow={setIsShow}
            blogId={blogId}
            getAllBlogs={getAllBlogs}
            setBlogId={setBlogId}
          />
        </div>
      )}
    </AdminLayout>
  );
}
