import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  sendMessage,
  singleOrder,
} from "../controllers/orderController.js";
import { orderAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();

// Create order
router.post("/create/order", createOrder);
// Get order
router.get("/get/orders", getAllOrder);
// Delete order
router.delete("/delete/order/:id", deleteOrder);
// Get Single Order
router.get("/get/single/order/:id", singleOrder);
// Send Message
router.post("/send/message", sendMessage);

// Order Analytics
router.get("/order/analytics", orderAnalytics);

export default router;
