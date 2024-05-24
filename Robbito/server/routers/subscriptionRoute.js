import express from "express";
import {
  createSubscription,
  deleteSubscription,
  getSubscription,
} from "../controllers/subscriptionController.js";

const router = express.Router();

// Create Subscription
router.post("/create/subscription", createSubscription);
// Get Subscription
router.get("/get/subscription", getSubscription);

// Delete Subscription
router.delete("/delete/subscription/:id", deleteSubscription);

export default router;
