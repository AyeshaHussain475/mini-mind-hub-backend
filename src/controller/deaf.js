import Deaf from "../models/Deaf.js";

export const createDeafMedia = async (req, res) => {
  try {
    const { name, description } = req.body;
    const video = req.file.filename;

    const existingDeafMedia = await Deaf.findOne({ name });

    if (existingDeafMedia) {
      return res.status(400).json({
        message: "Media already exists!",
      });
    }

    const newDeafMedia = new Deaf({
      name,
      description,
      video,
    });

    const savedDeafMedia = await newDeafMedia.save();

    if (savedDeafMedia) {
      return res.status(201).json({
        message: "Media is created successfully",
      });
    } else {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
      error,
    });
  }
};

export const getDeafMedia = async (req, res) => {
  const deafMedias = await Deaf.find();

  if (!deafMedias) {
    return res.status(400).json({
      message: "No Media is found!",
    });
  }

  return res.json({
    message: "Media found successfully!",
    deafMedias,
  });
};

export const deleteDeafMedia = async (req, res) => {
  try {
    const deafMedia = await Deaf.findByIdAndDelete(req.params.id);

    if (!deafMedia) {
      return res.status(400).json({
        message: "Media does not exists",
      });
    }
    return res.status(200).json({
      message: "Media is deleted successfully!",
    });
  } catch (error) {
    console.log("Error in deletion", error);
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
