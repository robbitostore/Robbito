import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { TbLoader3 } from "react-icons/tb";
import { useTheme } from "../../../utils/ThemeContext";
import AdminLayout from "../../../components/admin/AdminLayout";
import Loader from "../../../utils/Loader";

export default function AdminContact() {
  const { theme } = useTheme();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [index, setIndex] = useState("");

  // Get all Assistants
  const getAllMessages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/contact/get/contacts`
      );
      setSubscriptions(data?.messages);
      console.log(data?.messages);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMessages();

    //eslint-disable-next-line
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "phone", headerName: "Phone", flex: 0.5 },
    { field: "message", headerName: "Message", flex: 1 },
    { field: "created_at", headerName: "Created At", flex: 0.3 },
    {
      field: "  ",
      headerName: "Delete",
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

  if (subscriptions && Array.isArray(subscriptions)) {
    subscriptions.forEach((sub, i) => {
      if (sub) {
        const formattedDate = format(new Date(sub?.createdAt), "dd-MM-yyyy");
        const fileObject = {
          id: sub._id,
          name: sub?.name,
          email: sub?.email,
          phone: sub?.phone,
          message: sub?.messageInfo,
          created_at: formattedDate,
        };

        rows.push(fileObject);
      }
    });
  }

  //---------------------Delete Files---------------
  const handleDelete = async (id) => {
    setDeleting(true);
    if (!id) return toast.error("Id is missing!");
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/contact/delete/contacts/${id}`
      );
      if (data?.success) {
        setDeleting(false);
        toast.success(data?.message, { duration: 3000 });
        getAllMessages();
      } else {
        setDeleting(false);
        toast.error(data?.message, { duration: 2000 });
      }
    } catch (error) {
      setDeleting(false);
      toast.error("Something went wrong!");
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
          All Contact Messages
        </h1>
        <hr className="my-3 h-[2px] bg-gray-300" />
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full h-[90vh]  pb-[10rem] overflow-auto message mt-[2rem] sm:mt-0">
            <Box
              m="40px 0 0 0"
              height="70vh"
              width="98%"
              boxShadow=".3rem .3rem .4rem rgba(0,0,0,.3)"
              filter="drop-shadow(0rem 0rem .6rem .1rem rgb(0, 149, 255))"
              overflow={"auto"}
              className="overflow-auto message min-w-[40rem]"
              sx={{
                "& .MuiDataGrid-root": {
                  border: `2px solid  #ae880a`,
                  outline: "none",
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
                },
                "& .name-column--cell": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-columnHeaders": {
                  color: theme === "dark" ? "#fff" : "#000",
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
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
