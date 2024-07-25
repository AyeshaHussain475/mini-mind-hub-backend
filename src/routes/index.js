import express from "express";
import { signin, signup } from "../controller/auth.js";
import animalRouter from "./animal.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.use("/animal", animalRouter);

export default router;
