import "./contact.css";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { TbLoader } from "react-icons/tb";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { ImWhatsapp } from "react-icons/im";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [messageInfo, setMessageInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/contact/create/contacts`,
        {
          name,
          email,
          phone,
          messageInfo,
        }
      );
      setName("");
      setEmail("");
      setPhone("");
      setMessageInfo("");
      setLoading(false);
      toast.success("Message send successfully!");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Layout>
        <div className="w-full min-h-[100vh]: mt-6 pb-[3rem] sm:px-[1.5rem] px-[.5rem]">
          <div className="">
            <div className="contact-header">
              <div className="flex flex-col gap-1">
                <h3
                  className="text-3xl heading sm:text-4xl italic font-bold text-center"
                  style={{
                    color: " #ae880a",
                  }}
                >
                  Connect With Us: Your Questions, Our Answers
                </h3>
                {/* <p className="text-[15px] font-medium text-center">
                  Embark on a seamless journey with us! Reach out and let us
                  transform your inquiries into solutions with our dedicated
                  customer care.
                </p> */}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-[2.5rem]  ">
              <div className="">
                <img
                  src="/Robbito logo png.png"
                  alt="Contact"
                  width={500}
                  height={300}
                  // style={{
                  //   filter:
                  //     "brightness(1.1) contrast(1.1) drop-shadow(.3px .3px 10px rgba(0, 0, 0, 0.5)",
                  // }}
                  className="mt-[0] sm:mt-[-4rem]"
                />
              </div>
              <div className="flex flex-col gap-4">
                <form
                  onSubmit={handleForm}
                  className="flex flex-col gap-3 py-4 px-3 rounded-md border-2 border-gray-400 shadow-md "
                >
                  <div className="flex items-center flex-col sm:flex-row  gap-4">
                    <span className="text-[16px] font-medium">
                      Book an Appointment on WhatsApp
                    </span>
                    <Link to="https://wa.link/gv385i" target="_blank">
                      <ImWhatsapp className="h-10 w-10 text-green-500 hover:scale-[1.07] animate-pulse hover:text-green-600 cursor-pointer transition duration-200" />
                    </Link>
                  </div>
                  <div className="flex items-center justify-center w-full py-3 gap-3">
                    <span className="border-b w-[5rem] bg-gray-500"></span>
                    <span>OR</span>
                    <span className="border-b w-[5rem] bg-gray-500"></span>
                  </div>
                  <div className="inputBox w-full">
                    <input
                      type="text"
                      required
                      value={name}
                      style={{ fontWeight: 400 }}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-transparent border-2 border-gray-300  "
                    />
                    <span>Full Name</span>
                  </div>
                  <div className="inputBox">
                    <input
                      type="email"
                      required
                      value={email}
                      style={{ fontWeight: 400 }}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent border-2 border-gray-300  "
                    />
                    <span>Email Address</span>
                  </div>
                  <div className="inputBox">
                    <input
                      type="number"
                      required
                      value={phone}
                      style={{ fontWeight: 400 }}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-transparent border-2 border-gray-300  "
                    />
                    <span>Phone Number</span>
                  </div>

                  <div className="inputBox">
                    <textarea
                      type="number"
                      required
                      value={messageInfo}
                      onChange={(e) => setMessageInfo(e.target.value)}
                      style={{ fontWeight: 400 }}
                      className="bg-transparent border-2 font-normal border-gray-300  "
                    />
                    <span>Message</span>
                  </div>
                  <div
                    className="submit-button "
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      type="submit"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                        background: "#846500",
                        minWidth: "5rem",
                        height: "2.7rem",
                        padding: ".4rem 1rem",
                        fontWeight: 500,
                      }}
                      className="btn"
                    >
                      Submit{" "}
                      {loading && (
                        <TbLoader className="animate-spin w-4 h-4 text-white" />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
