import servicesModel from "../models/servicesModel.js";

// Create Service
export const createServices = async (req, res) => {
  try {
    const { title, shotDesc, description, image } = req.body;

    if (!title) {
      return res
        .status(400)
        .send({ success: false, message: "title is required!" });
    }
    if (!shotDesc) {
      return res
        .status(400)
        .send({ success: false, message: "ShotDesc is required!" });
    }
    if (!description) {
      return res
        .status(400)
        .send({ success: false, message: "Description is required!" });
    }
    if (!image) {
      return res
        .status(400)
        .send({ success: false, message: "Image is required!" });
    }

    const existingService = await servicesModel.findOne({ title: title });
    if (existingService) {
      return res.status(400).send({
        success: false,
        message: "Service with this title is already exist!",
      });
    }

    const service = new servicesModel({
      title,
      shotDesc,
      description,
      image,
    });
    await service.save();

    res.status(200).send({
      success: true,
      message: "Service created successfully!",
      service,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while create service!",
      error,
    });
  }
};

// Update Service
export const updateServices = async (req, res) => {
  try {
    const { title, shotDesc, description, image } = req.body;
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Services Id required!",
      });
    }

    if (!title) {
      return res
        .status(400)
        .send({ success: false, message: "title is required!" });
    }
    if (!shotDesc) {
      return res
        .status(400)
        .send({ success: false, message: "ShotDesc is required!" });
    }
    if (!description) {
      return res
        .status(400)
        .send({ success: false, message: "Description is required!" });
    }
    if (!image) {
      return res
        .status(400)
        .send({ success: false, message: "Image is required!" });
    }

    const existingService = await servicesModel.findOne({ _id: id });
    if (!existingService) {
      return res.status(400).send({
        success: false,
        message: "Service not found!",
      });
    }

    const service = await servicesModel.findByIdAndUpdate(
      existingService._id,
      {
        title: title || existingService.title,
        shotDesc: shotDesc || existingService.shotDesc,
        description: description || existingService.description,
        image: image || existingService.image,
      },
      { new: true }
    );
    await service.save();

    res.status(200).send({
      success: true,
      message: "Service updated successfully!",
      service,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while update service!",
      error,
    });
  }
};
// Get All Service
export const getServices = async (req, res) => {
  try {
    const services = await servicesModel.find({});

    res.status(200).send({
      total: services.length,
      success: true,
      message: "All services!",
      services: services,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while get all services!",
      error,
    });
  }
};
// Get Single Service
export const getSingleServices = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Services Id required!",
      });
    }
    const service = await servicesModel.findById({ _id: id });

    res.status(200).send({
      success: true,
      message: "Single Service!",
      service: service,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while get single service!",
      error,
    });
  }
};
// Delete Service
export const deleteServices = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Services Id required!",
      });
    }

    const existingService = await servicesModel.findById({ _id: id });
    if (!existingService) {
      return res.status(400).send({
        success: false,
        message: "Service not found!",
      });
    }
    await servicesModel.findByIdAndDelete({ _id: existingService._id });

    res.status(200).send({
      success: true,
      message: "Service deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while delete service!",
      error,
    });
  }
};
