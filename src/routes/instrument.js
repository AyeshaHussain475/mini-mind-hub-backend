import express from "express";
import { createInstrument } from "../controller/instrument.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "myInstruments/"); //folder where my Instruments files will be saved
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage });
const uploads = upload.fields([{ name: "image" }, { name: "sound" }]);

const instrumentRouter = express.Router();

instrumentRouter.post("/", uploads, createInstrument);

export default instrumentRouter;
