import { Response, Request, NextFunction } from "express";
import User from "../models/user.model";
import { hashPassword } from "../utils";

const login = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { username, password } = request.body;
  try {
    const user = await User.getUserByUsernameAndPassword(username, password);
    const apiToken = user.generateApiToken();
    await user.save();
    response.status(200).send({ apiToken });
  } catch (err) {
    response.status(400).send();
  }
};

export { login };
