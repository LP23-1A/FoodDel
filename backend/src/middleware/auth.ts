import jwt from "jsonwebtoken";

export const checkToken = (req: any, res: any, next: () => void) => {
  const token = req.headers.token;
  try {
    jwt.verify(token, "test");

    next();
  } catch (error) {
    return res.status(400).send({ success: false, msg: "Invalid token" });
  }
};
