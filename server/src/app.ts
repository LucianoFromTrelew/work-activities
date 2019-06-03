import express, { Application, Request, Response, NextFunction } from "express";
import { ActivityRoutes, TagRoutes, AuthRoutes } from "./router";
import { connect } from "mongoose";
import "dotenv/config";
import morgan from "morgan";
import bodyParser from "body-parser";
import { getDbUri } from "./config/database";
import passport from "./config/passport";

const getApp = async (): Promise<Application> => {
  const app: Application = express();

  app.get(
    "/",
    passport.authenticate("bearer", { session: false }),
    (request: Request, response: Response, next: NextFunction) => {
      response.send("Hello world!");
    }
  );

  // Logger
  if (process.env.NODE_ENV !== "test") app.use(morgan("combined"));
  // Body parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // Routers
  app.use("/api/activity", ActivityRoutes);
  app.use("/api/tag", TagRoutes);
  app.use("/auth", AuthRoutes);

  // Conectarse a la BD
  try {
    await connect(
      getDbUri(),
      { useNewUrlParser: true }
    );
    console.log("Conectado!");
  } catch (error) {
    console.log("*** PINCHOSE ***");
    console.log(error);
  }
  return app;
};

export default getApp;
