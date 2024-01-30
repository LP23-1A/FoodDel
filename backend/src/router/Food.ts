import express from "express";
import {
  createFood,
  getAllFood,
  getAllFoodByUserId,
  getOneFood,
} from "../controller/Food";
import { checkToken } from "../middleware/auth";

const food = express.Router();

food.route("/").get(checkToken, getAllFood).post(createFood);
food.route("/:id").get(getOneFood);
food.route("/user/:id").get(getAllFoodByUserId);

export { food };
