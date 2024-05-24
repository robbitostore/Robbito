import { modelNames } from "mongoose";
import orderModel from "../models/orderModel.js";
import sendMail from "../helper/mail.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { name, email, phone, state, country, address, postalCode, files } =
      req.body;

    // Input Validation
    const requiredFields = [
      "name",
      "email",
      "phone",
      "state",
      "country",
      "address",
      "postalCode",
      "files",
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).send({
          success: false,
          message: `${field} is required!`,
        });
      }
    }

    const order = await orderModel.create({
      name,
      email,
      phone,
      state,
      country,
      address,
      postalCode,
      files,
    });
    res.status(200).send({
      success: true,
      message: "Order submitted successfully!",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while create order!",
      error,
    });
  }
};
// Update Order
// export const updateOrder = async (req, res) => {
//   try {
//     res.status(200).send({
//       success: true,
//       message: "",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while update order!",
//       error,
//     });
//   }
// };
// Get All Orders
export const getAllOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).send({
      success: true,
      message: "All orders",
      orders: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while get orders!",
      error,
    });
  }
};

// Delete Order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Order Id is required!",
      });
    }

    await orderModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "Order deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while delete order!",
      error,
    });
  }
};
// Get Single Order
export const singleOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Order Id is required!",
      });
    }

    const order = await orderModel.findById({ _id: id });
    res.status(200).send({
      success: true,
      order: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while get single order!",
      error,
    });
  }
};

// Send Message
export const sendMessage = async (req, res) => {
  try {
    const { name, email, link, price, description } = req.body;

    if (!modelNames) {
      return res.status(400).send({
        success: false,
        message: "User name is required!",
      });
    }
    if (!link) {
      return res.status(400).send({
        success: false,
        message: "Payment Link is required!",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email Link is required!",
      });
    }
    // Send Message
    const data = {
      user: { name: name, link: link, price: price, description: description },
    };

    await sendMail({
      email: email,
      subject: "Order Payment Link!",
      template: "payment_mail.ejs",
      data,
    });

    res.status(200).send({
      success: true,
      message: "Order deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while delete order!",
      error,
    });
  }
};
