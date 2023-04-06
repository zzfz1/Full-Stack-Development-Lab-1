import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { router } from "./routes/api.js";

const app = express();
dotenv.config();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB!");
});

app.use("/api/albums", router);

app.listen(process.env.PORT, () =>
  console.log("Listening to http://localhost:" + process.env.PORT)
);
