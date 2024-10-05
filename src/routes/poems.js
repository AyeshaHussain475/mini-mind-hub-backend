import express from "express";
import { createPoem, getPoems } from "../controller/poems.js";
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

const poemsRouter = express.Router();
poemsRouter.post("/media", upload.single("video"), createPoem);
poemsRouter.get("/media", getPoems);

export default poemsRouter;
