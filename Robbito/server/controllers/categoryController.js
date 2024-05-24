import categortModel from "../models/categortModel.js";

// Create Category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Category name is required!",
      });
    }

    // Existing Category Check
    const isExisting = await categortModel.findOne({ name: name });
    if (isExisting) {
      return res.status(400).send({
        success: false,
        message: "Category with this name already exist!",
      });
    }

    const category = await categortModel.create({ name });

    res.status(200).send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while create category!",
      error,
    });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Category name is required!",
      });
    }

    // Existing Category Check
    const isExisting = await categortModel.findById({ _id: id });
    if (!isExisting) {
      return res.status(400).send({
        success: false,
        message: "Category with this name not found!",
      });
    }

    const category = await categortModel.findByIdAndUpdate(
      isExisting._id,
      {
        name: name || isExisting.name,
      },
      { new: true }
    );
    await category.save();

    res.status(200).send({
      success: true,
      message: "Category update successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while update category!",
      error,
    });
  }
};

// Get All Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await categortModel.find({});

    res.status(200).send({
      success: true,
      message: "Category List",
      categories: categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while get categories!",
      error,
    });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    await categortModel.findByIdAndDelete({ _id: id });

    res.status(200).send({
      success: true,
      message: "Category deleted!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while delete categories!",
      error,
    });
  }
};

// Get Single Category
export const singleCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const catrgory = await categortModel.findById({ _id: id });

    res.status(200).send({
      success: true,
      catrgory: catrgory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while get single category!",
      error,
    });
  }
};
