import layoutModel from "../models/layoutModel.js";

// Create Layout
export const createLayout = async (req, res) => {
  try {
    const { type, logoImage, title } = req.body;
    const isExisting = await layoutModel.findOne({ type });
    if (isExisting) {
      return res
        .status(400)
        .send({ success: false, message: `${type} is already exist!` });
    }

    if (type === "Logo") {
      await layoutModel.create({ type: "Logo", logo: { logoImage, title } });
    }
    // For FAQ
    if (type === "FAQ") {
      const { faq } = req.body;
      const faqItem = await Promise.all(
        faq.map(async (item) => {
          return {
            question: item.question,
            answer: item.answer,
          };
        })
      );

      await layoutModel.create({ type: "FAQ", faq: faqItem });
    }

    // For Footer

    if (type === "Footer") {
      const { footer } = req.body;
      const footerItem = {
        name: footer.name,
        email: footer.email,
        address: footer.address,
        phone: footer.phone,
        telephone: footer.telephone,
      };

      await layoutModel.create({ type: "Footer", footer: footerItem });
    }

    // For Banner
    if (type === "Banner") {
      const { banner } = req.body;

      const bannerItems = banner.map((item) => ({
        image: item.image,
      }));
      await layoutModel.create({ type: "Banner", banner: bannerItems });
      console.log(bannerItems);
    }

    res.status(200).send({
      success: true,
      message: "Layout created successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create layout",
      error,
    });
  }
};

// Edit Layout
export const editLayout = async (req, res) => {
  try {
    const { type, logoImage, title } = req.body;
    const layoutData = await layoutModel.findOne({ type });

    if (!layoutData) {
      return res
        .status(400)
        .send({ success: false, message: `${type} not found!` });
    }

    if (type === "Logo") {
      await layoutModel.findByIdAndUpdate(
        layoutData._id,
        {
          logo: { logoImage, title },
        },
        { new: true }
      );
    }
    // For FAQ
    if (type === "FAQ") {
      const { faq } = req.body;

      const faqItem = await layoutModel.findOne({ type: "FAQ" });
      const faqItems = await Promise.all(
        faq.map(async (item) => {
          return {
            question: item.question,
            answer: item.answer,
          };
        })
      );
      await layoutModel.findByIdAndUpdate(
        faqItem._id,
        { type: "FAQ", faq: faqItems },
        { new: true }
      );
    }

    // For Footer
    if (type === "Footer") {
      const { footer } = req.body;

      const footerData = await layoutModel.findOne({ type: "Footer" });
      if (!footerData) {
        return res.status(400).send({
          success: false,
          message: `${type} not found!`,
        });
      }
      const footerItem = {
        name: footer.name,
        email: footer.email,
        address: footer.address,
        phone: footer.phone,
        telephone: footer.telephone,
      };

      await layoutModel.findByIdAndUpdate(
        { _id: footerData._id },
        { type: "Footer", footer: footerItem },
        { new: true }
      );
    }

    // For Banner
    if (type === "Banner") {
      const { banner } = req.body;

      const bannerData = await layoutModel.findOne({ type: "Banner" });
      if (!bannerData) {
        return res.status(400).send({
          success: false,
          message: `${type} not found!`,
        });
      }

      const bannerItems = banner.map((item) => ({
        image: item.image,
      }));

      await layoutModel.findByIdAndUpdate(
        { _id: bannerData._id },
        { type: "Banner", banner: bannerItems },
        { new: true }
      );
    }

    res.status(200).send({
      success: true,
      message: "Layout updated successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create layout",
      error,
    });
  }
};

// Get Layout
export const getLayout = async (req, res) => {
  try {
    const { type } = req.params;
    const layoutData = await layoutModel.findOne({ type });

    res.status(200).send({
      success: true,
      layoutData: layoutData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create layout",
      error,
    });
  }
};
