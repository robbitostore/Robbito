import express from "express";
import {
  updateUser,
  loginUser,
  createUser,
  getUser,
} from "../controllers/protectedController.js";

const router = express.Router();

router.post("/create/user", createUser);
// Login User

router.post("/login/user", loginUser);

// Update User
router.put("/update/user/:id", updateUser);

// Get User
router.get("/get/user/:id", getUser);

export default router;
