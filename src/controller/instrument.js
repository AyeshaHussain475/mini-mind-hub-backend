import Instruments from "../models/Instruments.js";

export const createInstrument = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.files["image"][0]?.filename;
    const sound = req.files["sound"][0]?.filename;

    const existingInstrument = await Instruments.findOne({ name });

    if (existingInstrument) {
      return res.status(400).json({
        message: "Instrument already exists!",
      });
    }

    const newInstrument = new Instruments({
      name,
      image,
      sound,
    });

    const savedInstrument = await newInstrument.save();

    if (savedInstrument) {
      return res.status(201).json({
        message: "Instrument is created successfully",
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
