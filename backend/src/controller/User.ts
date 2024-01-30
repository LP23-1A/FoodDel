import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../model/User";

type SignUpType = {
  username: string;
  password: string;
  avatarImage: string;
};

type UserType = {
  _id: string;
  username: string;
  password: string;
  __v: number;
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, password }: Required<SignUpType> = req.body;

    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      try {
        const result = await UserModel.create({ username, password: hash });
        console.log(result);
        // console.log(result, "result");
        return res.status(201).send({ success: true });
      } catch (error) {
        return res.send({ error });
      }
    });
  } catch (error: any) {
    return res.status(400).send({ success: false, error: "Invalid request" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password }: { username: string; password: string } =
      req.body;

    const user: UserType | null = await UserModel.findOne({ username });

    if (!user) {
      return res.status(400).send({ success: false, msg: "User not found" });
    }

    bcrypt.compare(password, user.password, async function (err, result) {
      if (!result) {
        return res.status(400).send({
          success: false,
          msg: "Username or password incorrect",
        });
      } else {
        const SECRET_KEY = "test";
        const token = jwt.sign({ ...user }, SECRET_KEY);

        return res.send({ success: true, token });
      }
    });
  } catch (error) {
    return res.status(400).send({ success: false, error });
  }
};
