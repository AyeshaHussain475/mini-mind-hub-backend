const express = require("express");
const { signup, signin } = require("../controller/auth");
const animalRouter = require("./animal");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.use("/animal", animalRouter);

module.exports = router;
