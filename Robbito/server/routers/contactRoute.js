import express from "express";
import {
  createContact,
  deleteContact,
  getContact,
} from "../controllers/contactController.js";

const router = express.Router();

// Create Contacts
router.post("/create/contacts", createContact);
// Get Contacts
router.get("/get/contacts", getContact);
// Delete Contacts
router.delete("/delete/contacts/:id", deleteContact);

export default router;
