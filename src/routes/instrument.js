import express from "express";
import {
  createInstrument,
  deleteInstrument,
  getInstruments,
} from "../controller/instrument.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage });
const uploads = upload.fields([{ name: "image" }, { name: "sound" }]);

const instrumentRouter = express.Router();

instrumentRouter.post("/media", uploads, createInstrument);
instrumentRouter.get("/media", getInstruments);
instrumentRouter.delete("/media/:id", deleteInstrument);

export default instrumentRouter;
