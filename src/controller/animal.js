import Animal from "../models/Animal.js";

export const postAnimalMedia = async (req, res) => {
  try {
    const existingUrl = await Animal.findOne({
      name: req.body.name,
    }).exec();

    if (existingUrl) {
      return res.status(400).json({
        message: "Media already exist",
      });
    }
    const { name } = req.body;
    const imageUrl = req.files["imageUrl"][0].filename;
    const soundUrl = req.files["soundUrl"][0].filename;

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
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const getAnimalsMedia = async (req, res) => {
  try {
    const animals = await Animal.find();

    return res.json(animals);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error getting animal medias", error });
  }
};

export const updateAnimalMedia = async (req, res) => {
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
