import express from "express";
import env from "dotenv";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import routes from "./src/routes/index.js";
import { fileURLToPath } from "url";
import helmet from "helmet";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
env.config();

// middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

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
  try {
    const filePath = path.join(__dirname, "uploads", req.params.imageName);
    res.sendFile(filePath);
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: "something went wrong" });
  }
});

app.get("/mini/audios/:filename", (req, res) => {
  try {
    const filePath = path.join(__dirname, "uploads", req.params.filename);
    res.sendFile(filePath);
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: "something went wrong" });
  }
});

app.listen(process.env.PORT, "localhost", () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
