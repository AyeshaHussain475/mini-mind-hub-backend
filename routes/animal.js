const express = require("express");
const {
  postAnimalMedia,
  getAnimalsMedia,
  updateAnimalMedia,
} = require("../controller/animal");
const multer = require("multer");

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

module.exports = animalRouter;
