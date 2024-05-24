import React, { useState } from "react";
import toast from "react-hot-toast";
import { TbLoader3 } from "react-icons/tb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../utils/ThemeContext";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useAuth } from "../../../utils/authContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const { auth, setAuth } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/user/login/user`,
        { email, password }
      );
      if (data.success) {
        setAuth({ ...auth, user: data.user, token: data.token });
        localStorage.setItem("auth", JSON.stringify(data));
        setLoading(false);
        navigate("/admin/dashboard");
        toast.success("Login successfully!");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div
      className={`w-full min-h-screen flex items-center justify-center px-3 `}
    >
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-4 min-w-[19rem] w-[30rem]  shadow-md py-5 px-4 rounded-md  ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-100"
        }  `}
      >
        <h3 className="text-center font-semibold text-2xl">Sign In</h3>
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-[16px]">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? <TbLoader3 className="h-5 w-5 animate-spin" /> : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
