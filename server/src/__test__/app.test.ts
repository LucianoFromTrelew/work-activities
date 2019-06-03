import request from "supertest";
import getApp from "../app";
import { Application } from "express";
import User from "../models/user.model";

describe("app", () => {
  let app: Application;

  beforeEach(async () => {
    app = await getApp();
  });
  it("should work", () => {
    expect(1).toBe(1);
  });
  it("works correctly on /", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(401);
  });
  it("now works", async () => {
    await User.deleteMany({});
    const username = "username";
    const password = "password";
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
