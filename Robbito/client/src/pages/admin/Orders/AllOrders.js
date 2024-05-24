import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { TbLoader3 } from "react-icons/tb";
import { useTheme } from "../../../utils/ThemeContext";
import Loader from "../../../utils/Loader";
import { FaCcMastercard } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BiLoaderCircle } from "react-icons/bi";

export default function AllOrders() {
  const { theme } = useTheme();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [index, setIndex] = useState("");
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [name1, setName1] = useState("");
  const [email1, setEmail1] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [files1, setFiles1] = useState([]);

  // Get all Assistants
  const getAllOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/order/get/orders`
      );
      setFiles(data?.orders);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();

    //eslint-disable-next-line
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    {
      field: "Type",
      headerName: "File Type",
      flex: 0.2,
      renderCell: (params) => {
        return (
          <>
            <div
              className="relative w-[2rem] h-[2.4rem] object-fill p-1"
              onClick={() => {
                getOrder(params.row.id);
                setShow(true);
              }}
            >
              <img
                src={
                  params.row.Type === "pdf"
                    ? "/pdf.png"
                    : params.row.Type === "plain"
                    ? "/txt.png"
                    : params.row.Type === "txt"
                    ? "/txt.png"
                    : params.row.Type === "csv"
                    ? "/csv.png"
                    : params.row.Type === "docx"
                    ? "/docx.png"
                    : params.row.Type === "doc"
                    ? "/docx.png"
                    : params.row.Type === "pptx"
                    ? "/pptx.png"
                    : "/any.png"
                }
                layout="fill"
                objectFit="contain"
                className="w-full h-full"
                alt="Icon"
              />
            </div>
          </>
        );
      },
    },
    { field: "name", headerName: "Name", flex: 0.4 },
    { field: "email", headerName: "Email", flex: 0.4 },
    { field: "phone", headerName: "Phone", flex: 0.3 },
    { field: "state", headerName: "State", flex: 0.3 },
    { field: "code", headerName: "Postal Code", flex: 0.2 },
    { field: "address", headerName: "Address ", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.3 },

    {
      field: "  ",
      headerName: "Payment Link",
      flex: 0.3,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => {
                setName(params.row.name);
                setEmail(params.row.email);
                setOpen(true);
              }}
            >
              <FaCcMastercard
                className="text-yellow-600 hover:text-yellow-700 cursor-pointer"
                size={20}
              />
            </Button>
          </>
        );
      },
    },

    {
      field: "    ",
      headerName: "Action",
      flex: 0.2,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => {
                handleDelete(params.row.id);
                setIndex(params.row.id);
              }}
            >
              {deleting && index === params.row.id ? (
                <TbLoader3 className="h-4 w-4 animate-spin" />
              ) : (
                <AiOutlineDelete
                  className="text-red-500 hover:text-red-600 cursor-pointer"
                  size={20}
                />
              )}
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  if (files && Array.isArray(files)) {
    files.forEach((file, i) => {
      if (file) {
        const formattedDate = format(new Date(file?.createdAt), "dd-MM-yyyy");
        const fileObject = {
          id: file._id,
          Type: file?.fileType,
          name: file?.name,
          email: file?.email,
          phone: file?.phone,
          state: file?.state,
          code: file?.postalCode,
          address: file?.address,
          created_at: formattedDate,
        };

        rows.push(fileObject);
      }
    });
  }

  //---------------------Delete Files---------------
  const handleDelete = async (id) => {
    setDeleting(true);
    if (!id) return toast.error("Order Id is missing!");
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/order/delete/order/${id}`
      );
      if (data?.success) {
        getAllOrders();
        setDeleting(false);
        toast.success(data?.message, { duration: 3000 });
      } else {
        setDeleting(false);
        toast.error(data?.message, { duration: 2000 });
      }
    } catch (error) {
      console.log(error);
      setDeleting(false);
      toast.error("Something went wrong!");
    }
  };

  // Handle Message

  const handleMessage = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/order/send/message`,
        { name, email, link, price, description }
      );
      if (data.success) {
        toast.success("Message send successfully!");
        setLoad(false);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoad(false);
    }
  };

  // Get Order
  const getOrder = async (id) => {
    setLoad(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/order/get/single/order/${id}`
      );
      if (data.success) {
        setName1(data.order.name);
        setEmail1(data.order.email);
        setPhone(data.order.phone);
        setAddress(data.order.address);
        setState(data.order.state);
        setCountry(data.order.country);
        setPostalCode(data.order.postalCode);
        setFiles1(data.order.files);
        setLoad(false);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoad(false);
    }
  };

  return (
    <AdminLayout>
      <div className="w-full mt-[1rem] px-3 sm:px-6 message overflow-y-auto ">
        <h1
          className="text-2xl sm:text-3xl font-semibold "
          style={{
            textShadow: "-.1px 1px 0px #ccc",
          }}
        >
          All Orders
        </h1>
        <hr className="my-3 h-[2px] bg-gray-300" />
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full h-[90vh] relative  pb-[10rem] overflow-auto message mt-[2rem] sm:mt-0">
            <Box
              m="40px 0 0 0"
              height="70vh"
              width="98%"
              boxShadow=".3rem .3rem .4rem rgba(0,0,0,.3)"
              filter="drop-shadow(0rem 0rem .6rem .1rem rgb(0, 149, 255))"
              overflow={"auto"}
              className="overflow-auto message min-w-[44rem] sm:block"
              sx={{
                "& .MuiDataGrid-root": {
                  border: `2px solid  #ae880a`,
                  outline: "none",
                  background: "transparent",
                },
                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-sortIcon": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-row": {
                  color: theme === "dark" ? "#fff" : "#000",
                  borderBottom: `2px solid #047857
                  }`,
                },
                "& .MuiTablePagination-root": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                  background: theme === "dark" ? "#222" : "#fff",
                },
                "& .name-column--cell": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: theme === "dark" ? "#4facfe" : "#047857",
                  color: "#000",
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme === "dark" ? "#1f2A40" : "#F2F0F0",
                },
                "& .MuiDataGrid-footerContainer": {
                  color: theme === "dark" ? "#fff" : "#000",
                  backgroundColor: "#ae880a",
                  borderBottom: "none",
                },
                "& .MuiCheckbox-root": {},
                "& .MuiCheckbox-root:nth-child(1)": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid--toolbarContainer .MuiButton-text": {
                  color: `#fff !important`,
                },
              }}
            >
              <DataGrid
                class="light:text-black dark:text-white "
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 6 },
                  },
                }}
                pageSizeOptions={[5, 10, 20, 50]}
                checkboxSelection
              />
            </Box>

            {/* Send Message */}
            {open && (
              <div className="fixed z-[99] top-0 left-0 bg-black/70 text-gray-950 w-full h-full flex items-center justify-center ">
                <span className="absolute top-3 right-3 ">
                  <IoClose
                    className="h-7 w-7 text-white"
                    onClick={() => setOpen(false)}
                  />
                </span>
                <div className="w-[27rem] py-5 px-4  bg-gray-50 rounded-lg shadow-md ">
                  <h1 className=" text-2xl font-semibold text-center">
                    Send Payment Link
                  </h1>
                  <form
                    onSubmit={handleMessage}
                    className="mt-4 flex flex-col gap-5"
                  >
                    <input
                      type="number"
                      placeholder="Enter Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full h-[2.8rem] rounded-md shadow-md px-3 border border-gray-600 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Enter payment link"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      className="w-full h-[2.8rem] rounded-md shadow-md px-3 border border-gray-600 outline-none"
                    />
                    <textarea
                      placeholder="Enter order description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full h-[6rem] resize-none rounded-md shadow-md px-3 border border-gray-600 outline-none"
                    />
                    <button
                      className="btn "
                      style={{
                        width: "100%",
                        height: "2.7rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {load ? (
                        <BiLoaderCircle className="h-5 w-5 text-white animate-spin" />
                      ) : (
                        "Send"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}
            {/* Order Details */}
            {show && (
              <div className="fixed z-[99] top-0 left-0 bg-black/70 w-full h-full flex items-center justify-center ">
                <span className="absolute top-3 right-3 ">
                  <IoClose
                    className="h-7 w-7 text-white"
                    onClick={() => setShow(false)}
                  />
                </span>
                {load ? (
                  <Loader />
                ) : (
                  <form
                    className={`flex flex-col gap-3 w-[35rem] py-4 px-3 rounded-md border-2 ${
                      theme === "dark" ? "bg-gray-800" : "bg-gray-100 "
                    } border-gray-400 shadow-md `}
                  >
                    <h1 className="text-center text-2xl sm:text-3xl font-semibold pb-3">
                      Order Details
                    </h1>
                    <div className="flex items-center gap-3">
                      <div className="inputBox w-full">
                        <input
                          type="text"
                          required
                          value={name1}
                          style={{ fontWeight: 400 }}
                          onChange={(e) => setName1(e.target.value)}
                          className="bg-transparent border-2 pointer-events-none border-gray-400  "
                        />
                        <span>Full Name</span>
                      </div>
                      <div className="inputBox w-full">
                        <input
                          type="email"
                          required
                          value={email1}
                          style={{ fontWeight: 400 }}
                          onChange={(e) => setEmail1(e.target.value)}
                          className="bg-transparent border-2 pointer-events-none border-gray-400  "
                        />
                        <span>Email Address</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="inputBox w-full">
                        <input
                          type="tel"
                          required
                          minLength={10}
                          value={phone}
                          style={{ fontWeight: 400 }}
                          onChange={(e) => setPhone(e.target.value)}
                          className="bg-transparent border-2 pointer-events-none border-gray-400  "
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
                          className="bg-transparent border-2 pointer-events-none border-gray-400  "
                        />
                        <span>State</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="inputBox w-full">
                        <input
                          type="text"
                          required
                          value={country}
                          style={{ fontWeight: 400 }}
                          onChange={(e) => setCountry(e.target.value)}
                          className="bg-transparent border-2 pointer-events-none border-gray-400  "
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
                          className="bg-transparent border-2 pointer-events-none border-gray-400  "
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
                        className="bg-transparent border-2 pointer-events-none border-gray-400  "
                      />
                      <span>Permanent Address</span>
                    </div>

                    <div className="flex items-center flex-wrap gap-4">
                      {files1?.map((imageUrl, index) => (
                        <Link
                          to={imageUrl}
                          key={index}
                          className="relative w-[7rem] h-[7rem] p-2  overflow-hidden border-2 border-gray-300  shadow-gray-300 filter hover:drop-shadow-md rounded-md  shadow-md object-fill hover:shadow-xl transition duration-100"
                          target="_blank"
                        >
                          <img
                            src="/any.png"
                            alt={`ImageData ${index + 1}`}
                            className="w-full h-full"
                          />
                        </Link>
                      ))}
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
