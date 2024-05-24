import galleryModel from "../models/galleryModel.js";

// Create Gallery
export const createGallery = async (req, res) => {
  try {
    const { name, category, description, image } = req.body;

    if (!name) {
      return res.status(400).send({
        success: false,
        message: "name is required!",
      });
    }
    if (!category) {
      return res.status(400).send({
        success: false,
        message: "Category is required!",
      });
    }
    if (!description) {
      return res.status(400).send({
        success: false,
        message: "Description is required!",
      });
    }
    if (!image) {
      return res.status(400).send({
        success: false,
        message: "Image is required!",
      });
    }

    const gallery = await galleryModel.create({
      name,
      category,
      description,
      image,
    });

    res.status(200).send({
      success: true,
      message: "Gallery add!",
      gallery,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while create gallary!",
      error,
    });
  }
};
// Update Gallery
export const updateGallery = async (req, res) => {
  try {
    const { name, category, description, image } = req.body;
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Gallery id is required!",
      });
    }
    // Input Validation
    const requiredFields = ["name", "category", "description", "image"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).send({
          success: false,
          message: `${field} is required!`,
        });
      }
    }

    const existingGallery = await galleryModel.findById({ _id: id });

    if (!existingGallery) {
      return res.status(400).send({
        success: false,
        message: "Gallery not required!",
      });
    }

    const gallery = await galleryModel.findByIdAndUpdate(
      existingGallery._id,
      {
        name,
        category,
        description,
        image,
      },
      { new: true }
    );

    await gallery.save();

    res.status(200).send({
      success: true,
      message: "Gallery updated!",
      gallery,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while update gallary!",
      error,
    });
  }
};
// Get All Gallerys
export const getAllGallery = async (req, res) => {
  try {
    const gallery = await galleryModel.find({});
    res.status(200).send({
      success: true,
      message: "All gallery list!",
      gallery: gallery,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while get gallary!",
      error,
    });
  }
};
// Get Single Gallery
export const getSingleGallery = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Gallery id is required!",
      });
    }
    const gallery = await galleryModel.findById({ _id: id });
    if (!gallery) {
      return res.status(400).send({
        success: false,
        message: "Gallery not found!",
      });
    }
    res.status(200).send({
      success: true,
      message: "All gallery list!",
      gallery: gallery,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while get single gallary!",
      error,
    });
  }
};
// Delete Gallery
export const deleteGallery = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Gallery id is required!",
      });
    }
    await galleryModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "Gallery deleted!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while delete gallary!",
      error,
    });
  }
};
