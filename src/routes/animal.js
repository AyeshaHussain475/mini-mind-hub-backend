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

const upload = multer({ storage: storage });
const animalRouter = express.Router();

animalRouter.post("/media", upload.single("imageUrl"), postAnimalMedia);
animalRouter.get("/media", getAnimalsMedia);
animalRouter.put("/media/:id", updateAnimalMedia);

export default animalRouter;
