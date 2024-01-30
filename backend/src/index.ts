import express from "express";
import { connectDatabase } from "./utils/database";
import { auth } from "./router/User";
import cors from "cors";
import { food } from "./router/Food";

const PORT = 8000;

const start = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  connectDatabase();

  app.use("/auth", auth);
  app.use("/todo", food);

  app.get("/", (req, res) => {
    res.status(200).send({ success: true, msg: "Hello world" });
  });

  app.listen(PORT, () => {
    console.log("Server is running");
  });
};

start();
