import { comparePassword, hashPassword } from "../helper/protectedPassword.js";
import protectedModel from "../models/protectedModel.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  const { email, password } = req.body;

  const hashedPass = await hashPassword(password);

  const user = new protectedModel({ email, password: hashedPass });
  await user.save();
  res.status(200).send({
    success: true,
    message: "User Created!",
    user,
  });
};

// Login User

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "Password is required",
      });
    }

    const existingUser = await protectedModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).send({
        success: false,
        message: "Invalid Email",
      });
    }

    const comparePass = await comparePassword(password, existingUser.password);

    if (!comparePass) {
      return res.status(400).send({
        success: false,
        message: "Invalid password",
      });
    }

    const token = await jwt.sign(
      { userId: existingUser._id },
      process.env.SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).send({
      success: true,
      message: "Login successfully!",
      user: existingUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while login user",
      error,
    });
  }
};

// Update User

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { email, newPassword } = req.body;
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }
    if (!newPassword) {
      return res.status(400).send({
        success: false,
        message: "NewPassword is required",
      });
    }

    const existingUser = await protectedModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).send({
        success: false,
        message: "User not found!",
      });
    }

    const hashedPassword = await hashPassword(newPassword);

    const updateUser = await protectedModel.findByIdAndUpdate(
      existingUser._id,
      { email: email, password: hashedPassword },
      { new: true }
    );
    await updateUser.save();

    res.status(200).send({
      success: true,
      message: "Profile Update successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while update user",
      error,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await protectedModel.findById({ _id: id }).select("email");
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found!",
      });
    }
    res.status(200).send({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while get user",
      error,
    });
  }
};
