import { Response, Request, NextFunction } from "express";
import User from "../models/user.model";

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
    response.status(400).send({ msg: "Bad request" });
  }
};

const logout = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = request.headers;
    const apiToken = authorization.split(" ")[1];
    const user = await User.findOne({ apiToken });
    user.clearApiToken();
    await user.save();
    response.status(200).send();
  } catch (err) {
    response.status(400).send({ msg: "Bad request" });
  }
};

const isAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { username, apiToken } = request.user;
  response.status(200).send({ username, apiToken });
};

export { login, logout, isAuthenticated };
