import express from "express";
import env from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./src/routes/index.js";

env.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_DATABASE}.5lqnat3.mongodb.net/`
  )
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.error("Error connecting to db: ", String(err));
  });

app.use("/images", express.static("uploads"));
app.use("/mini", routes);

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
