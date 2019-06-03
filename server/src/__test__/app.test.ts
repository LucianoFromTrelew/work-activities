import request from "supertest";
import getApp from "../app";
import { Application } from "express";
import User from "../models/user.model";

describe("app", () => {
  let app: Application;
  const mongoDb = process.env.MONGO_DB;

  beforeEach(async () => {
    process.env.MONGO_DB = "test";
    app = await getApp();
  });

  afterEach(async () => {
    process.env.MONGO_DB = mongoDb;
    await User.deleteMany({});
  });

  it("should work", () => {
    expect(1).toBe(1);
  });

  it("returns 401 on / if not authenticated", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(401);
  });

  it("works correctly on / if authenticated", async () => {
    const username = "testusername";
    const password = "testpassword";
    const user = new User({ username, password });
    user.generateApiToken();
    await user.save();
    const response = await request(app)
      .get("/")
      .set("Authorization", user.getAuthHeader());
    expect(response.status).toBe(200);
    expect(response.text).toMatch("Hello world!");
  });
});
