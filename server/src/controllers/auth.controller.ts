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
    response.status(400).send({ msg: "Datos incorrectos" });
  }
};

const logout = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user = request.user;
    user.clearApiToken();
    await user.save();
    response.status(200).send({ msg: "Operación realizada con éxito" });
  } catch (err) {
    response.status(400).send({ msg: "Datos incorrectos" });
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

const signup = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { username, password } = request.body;
  try {
    const user = new User({ username, password });
    user.generateApiToken();
    await user.save();
    response.status(200).send({ username, apiToken: user.apiToken });
  } catch (error) {
    response.status(400).send({ msg: "No se pudo crear el usuario" });
  }
};

export { login, logout, isAuthenticated, signup };
