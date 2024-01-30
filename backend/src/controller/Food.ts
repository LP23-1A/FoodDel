import { Request, Response } from "express";
import { FoodModel } from "../model/Food";

export const getAllFood = async (req: Request, res: Response) => {
  try {
    const foods = await FoodModel.find();
    return res.status(200).send({ success: true, foods });
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const getOneFood = async (req: Request, res: Response) => {
  try {
    console.log(req.params.id);
    const food = await FoodModel.findById(req.params.id);
    return res.status(200).send({ success: true, food });
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, error: JSON.stringify(error) });
  }
};

export const createFood = async (req: Request, res: Response) => {
  try {
    const food = await FoodModel.create(req.body);
    console.log(food);
    return res.status(201).send({ success: true, food });
  } catch (error) {
    return res.status(400).send({ success: false, error });
  }
};

export const getAllFoodByUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const food = await FoodModel.find({ userId: id }).populate("userId");

    return res.status(201).send({ success: true, food });
  } catch (error) {
    return res.status(400).send({ success: false, error });
  }
};
