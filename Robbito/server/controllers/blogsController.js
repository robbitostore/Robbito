import blogModel from "../models/blogModel.js";

// Create Blog
export const createBlog = async (req, res) => {
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

    const existingBlog = await blogModel.findOne({ title: title });
    if (existingBlog) {
      return res.status(400).send({
        success: false,
        message: "Blog with this title is already exist!",
      });
    }

    const blog = new blogModel({
      title,
      shotDesc,
      description,
      image,
    });
    await blog.save();

    res.status(200).send({
      success: true,
      message: "Blog created successfully!",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while create blog!",
      error,
    });
  }
};

// Update Blog
export const updateBlog = async (req, res) => {
  try {
    const { title, shotDesc, description, image } = req.body;
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Blog Id required!",
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

    const existingBlog = await blogModel.findOne({ _id: id });
    if (!existingBlog) {
      return res.status(400).send({
        success: false,
        message: "Blog not found!",
      });
    }

    const blog = await blogModel.findByIdAndUpdate(
      existingBlog._id,
      {
        title: title || existingBlog.title,
        shotDesc: shotDesc || existingBlog.shotDesc,
        description: description || existingBlog.description,
        image: image || existingBlog.image,
      },
      { new: true }
    );
    await blog.save();

    res.status(200).send({
      success: true,
      message: "Blog updated successfully!",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while update blog!",
      error,
    });
  }
};
// Get All Blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({});

    res.status(200).send({
      total: blogs.length,
      success: true,
      message: "All blogs!",
      blogs: blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while get all blogs!",
      error,
    });
  }
};
// Get Single Blog
export const getSingleBlog = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Blog Id required!",
      });
    }
    const blog = await blogModel.findById(id);

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found!",
      });
    }

    res.status(200).send({
      success: true,
      message: "Single Blog!",
      blog: blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while get single blog!",
      error,
    });
  }
};
// Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Blog Id required!",
      });
    }

    const existingBlog = await blogModel.findById({ _id: id });
    if (!existingBlog) {
      return res.status(400).send({
        success: false,
        message: "Blog not found!",
      });
    }
    await blogModel.findByIdAndDelete({ _id: existingBlog._id });

    res.status(200).send({
      success: true,
      message: "Blog deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while delete blog!",
      error,
    });
  }
};
