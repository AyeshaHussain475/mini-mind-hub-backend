import express from "express";
import { getMedia } from "../controller/media.js";

const router = express.Router();

router.get("/:filename", getMedia);

export default router;
