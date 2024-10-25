import express from "express";
import {
  postAnimalMedia,
  getAnimalsMedia,
  updateAnimalMedia,
  deleteAnimal,
  getAnimalMedia,
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
const uploads = upload.fields([{ name: "images" }, { name: "sound" }]);

animalRouter.post("/media", uploads, postAnimalMedia);
animalRouter.get("/media", getAnimalsMedia);
animalRouter.get("/media/:id", getAnimalMedia);
animalRouter.put("/media/:id", uploads, updateAnimalMedia);
animalRouter.delete("/media/:id", deleteAnimal);

export default animalRouter;
