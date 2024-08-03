import Animal from "../models/Animal.js";

export const postAnimalMedia = async (req, res) => {
  try {
    const { name, description, type } = req.body;

    const animalExists = await Animal.findOne({ name }).exec();
    if (animalExists) {
      return res.status(400).json({
        message: "Media already exist",
      });
    }

    const images = req.files["images"].map((image, index) => ({
      name: image.filename,
      isPrimary: index === 0,
    }));
    console.log(images, "data");
    const sound = req.files["sound"][0]?.filename;

    const newUrl = new Animal({
      name,
      description,
      type,
      images,
      sound,
    });

    const savedUrl = await newUrl.save();

    if (savedUrl) {
      return res.status(201).json({
        message: "Media is created sucessfully",
      });
    }

    return res.status(400).json({ message: "Something went wrong" });
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
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const search = req.query.search ?? "";

    const regex = new RegExp(search, "i");

    const skip = (page - 1) * limit;

    const animals = await Animal.find({ name: regex })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalAnimals = await Animal.countDocuments({ name: regex });

    const totalPages = Math.ceil(totalAnimals / limit);

    return res.json({
      animals,
      count: totalAnimals,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.error(error.toString());
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

export const deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);

    if (!animal) {
      return res.status(404).json({
        message: "Animal not found ",
      });
    }
    return res
      .status(204)
      .json({ message: "Animal is deleted successfully", animal });
  } catch (error) {
    console.log("Error in deletion", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
