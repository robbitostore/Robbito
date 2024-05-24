import express from "express";
import {
  createServices,
  deleteServices,
  getServices,
  getSingleServices,
  updateServices,
} from "../controllers/servicesController.js";

const router = express.Router();

// Create Service
router.post("/create/services", createServices);

// Update Service
router.put("/update/service/:id", updateServices);

// Get All Services
router.get("/get/services", getServices);

// Get Single Service
router.get("/get/single/service/:id", getSingleServices);

// Delete Service
router.delete("/delete/service/:id", deleteServices);

export default router;
