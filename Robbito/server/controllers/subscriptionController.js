// Create subscription

import subscriptionModel from "../models/subscriptionModel.js";

export const createSubscription = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required!",
      });
    }

    const isExisting = await subscriptionModel.findOne({ email: email });
    if (isExisting) {
      return res.status(400).send({
        success: false,
        message: "Email already exist!",
      });
    }

    await subscriptionModel.create({ email: email });

    res.status(200).send({
      success: true,
      message: "subscribed successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while create subscription!",
      error,
    });
  }
};
// Get All subscriptions
export const getSubscription = async (req, res) => {
  try {
    const subscribe = await subscriptionModel.find({});

    res.status(200).send({
      success: true,
      message: "All subscription emails.",
      subscribe: subscribe,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while get subscription emails!",
      error,
    });
  }
};
// Delete subscription

export const deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    await subscriptionModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "Subscription email deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while delete subscription emails!",
      error,
    });
  }
};
