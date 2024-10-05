import Poems from "../models/Poems.js";

export const createPoem = async (req, res) => {
  try {
    const { name } = req.body;
    const video = req.file.filename;
    const existingPoem = await Poems.findOne({ name });

    if (existingPoem) {
      return res.status(400).json({
        message: "Poem already exists",
      });
    }

    const newPoem = new Poems({
      name,
      video,
    });

    const savedPoem = await newPoem.save();

    if (savedPoem) {
      return res.status(201).json({
        message: "Instrument saved successfully!",
      });
    } else {
      return res.status(400).json({
        message: "Something went wrong!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

export const getPoems = async (req, res) => {
  const poems = await Poems.find();

  if (!poems) {
    return res.status(400).json({
      message: "No Poem is found!",
    });
  }

  return res.json({
    message: "Poems found successfully!",
    poems,
  });
};
