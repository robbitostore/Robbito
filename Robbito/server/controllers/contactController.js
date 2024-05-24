import contactModel from "../models/contactModel.js";

// Create contact
export const createContact = async (req, res) => {
  try {
    const { name, email, phone, messageInfo } = req.body;

    const message = await contactModel.create({
      name,
      email,
      phone,
      messageInfo,
    });
    res.status(200).send({
      success: true,
      message: "Message send successfully!",
      message,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while create contact!",
      error,
    });
  }
};
// Get All contact
export const getContact = async (req, res) => {
  try {
    const messages = await contactModel.find({});
    res.status(200).send({
      success: true,
      message: "All Messages!",
      messages: messages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while get messages!",
      error,
    });
  }
};
// Delete contact
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Id is required!",
      });
    }

    await contactModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "Message delete successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while delete contact!",
      error,
    });
  }
};
