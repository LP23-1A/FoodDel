import express from "express";
import { signUp } from "../controller/User";
import { login } from "../controller/User";

const auth = express.Router();

auth.route("/signup").post(signUp);
auth.route("/login").post(login);

export { auth };
