const path = require("path");
const Animal = require("../models/animal");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

exports.postAnimalMedia = async (req, res) => {
  try {
    const existingUrl = await Animal.findOne({
      name: req.body.name,
    }).exec();

    if (existingUrl) {
      return res.status(400).json({
        message: "Media already exist",
      });
    }
    const { name, soundUrl } = req.body;
    const imageUrl = req.file.filename;

    const newUrl = new Animal({
      name,
      imageUrl,
      soundUrl,
    });

    const savedUrl = await newUrl.save();
    console.log(req.body);

    if (savedUrl) {
      return res.status(201).json({
        message: "Media is created sucessfully",
      });
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

exports.getAnimalsMedia = async (req, res) => {
  try {
    const animals = await Animal.find();

    // const filePath = (imageName) =>
    //   path.join(__dirname, "..", "uploads", imageName);

    // const updatedAnimals = animals.map((a) => {
    //   const o = a.toObject();
    //   return {
    //     ...o,
    //     imageUrl: filePath(o.imageUrl),
    //   };
    // });

    return res.json(animals);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error getting animal medias", error });
  }
};

exports.updateAnimalMedia = async (req, res) => {
  try {
    const { name, imageUrl, soundUrl } = req.body;

    const updateAnimalMedia = await Animal.findByIdAndUpdate(
      req.params.id,
      { name, imageUrl, soundUrl },
      { new: true }
    );

    if (!updateAnimalMedia) {
      return res.status(404).json({
        message: "media not found",
      });
    }

    res.json(updateAnimalMedia);
  } catch (error) {
    console.error("Error updating the animal", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
