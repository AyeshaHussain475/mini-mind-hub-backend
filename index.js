const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const cors = require("cors");
const path = require("path");

const app = express();
env.config();

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_DATABASE}.5lqnat3.mongodb.net/`
  )
  .then(() => {
    console.log("Database is connected");
  });

app.use("/mini", routes);
app.use("/images", express.static("uploads"));

app.get("/mini/images/:imageName", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.imageName);
  res.sendFile(filePath);
});

app.listen(process.env.PORT, "localhost", () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
