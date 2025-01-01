import multer from "multer";
import {
  createDeafMedia,
  deleteDeafMedia,
  getDeafMedia,
} from "../controller/deaf.js";
import express from "express";

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
const DeafRouter = express.Router();
DeafRouter.post("/media", upload.single("video"), createDeafMedia);
DeafRouter.get("/media", getDeafMedia);
DeafRouter.delete("/media/:id", deleteDeafMedia);

export default DeafRouter;
