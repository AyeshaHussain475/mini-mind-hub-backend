import express from "express";
import {
  postAnimalMedia,
  getAnimalsMedia,
  updateAnimalMedia,
} from "../controller/animal.js";
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

const animalRouter = express.Router();

const upload = multer({ storage: storage });

animalRouter.post(
  "/media",
  upload.fields([{ name: "images" }, { name: "sound" }]),
  postAnimalMedia
);
animalRouter.get("/media", getAnimalsMedia);
animalRouter.put("/media/:id", updateAnimalMedia);

export default animalRouter;
