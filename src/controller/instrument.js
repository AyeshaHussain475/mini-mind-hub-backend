import Instruments from "../models/Instruments.js";

export const createInstrument = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.files.image[0]?.filename;
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

export const getInstruments = async (req, res) => {
  const instruments = await Instruments.find();

  if (!instruments) {
    return res.status(400).json({
      message: "no instruments exists!",
    });
  }

  return res.status(200).json({
    message: "Instruments",
    instruments,
  });
};

export const deleteInstrument = async (req, res) => {
  try {
    const instrument = await Instruments.findByIdAndDelete(req.params.id);

    if (!instrument) {
      return res.status(400).json({
        message: "Instrument does not exists",
      });
    }
    return res.status(200).json({
      message: "Instrument is deleted successfully!",
    });
  } catch (error) {
    console.log("Error in deletion", error);
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const updateInstrument = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.files["image"]?.[0]?.filename;
    const sound = req.files["sound"]?.[0]?.filename;

    const instrument = await Instruments.findById(req.params.id);

    if (!instrument) {
      return res.status(400).json({
        message: "Instrument does not found!",
      });
    }

    instrument.name = name || instrument.name;
    instrument.image = image || instrument.image;
    instrument.sound = sound || instrument.sound;

    const updateInstrument = await instrument.save();

    if (updateInstrument) {
      return res.status(200).json({
        message: "Instrument is updated successfully!",
      });
    } else {
      return res.status(400).json({
        message: "Instrument is not saved successfully!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const getInstrument = async (req, res) => {
  try {
    const instrument = await Instruments.findById(req.params.id);
    console.log("issue", instrument);

    if (!instrument) {
      return res.status(400).json({
        message: "Instrument not found",
      });
    }
    return res.json({
      message: "Instrument found successfully!",
      instrument,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
