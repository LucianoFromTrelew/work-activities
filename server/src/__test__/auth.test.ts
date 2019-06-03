import request from "supertest";
import faker from "faker";
import getApp from "../app";
import { Application } from "express";
import User from "../models/user.model";

describe("auth", () => {
  let app: Application;
  const mongoDb = process.env.MONGO_DB;

  beforeEach(async () => {
    process.env.MONGO_DB = "test";
    app = await getApp();
  });

  afterEach(() => {
    process.env.MONGO_DB = mongoDb;
  });

  it("should work", () => {
    expect(1).toBe(1);
  });

  describe("login endpoint", () => {
    let user: any;
    const username = "testuser";
    const password = "testpassword";

    beforeEach(async () => {
      user = new User({
        username,
        password
      });
      await user.save();
    });

    afterEach(async () => {
      await User.deleteMany({});
    });

    it("logs in correctly", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({ username, password });
      const updatedUser = await User.findOne({ username });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("apiToken", updatedUser.apiToken);
    });

    it("returns 400 if wrong username", async () => {
      const wrongUsername = "non-existing-username";
      const response = await request(app)
        .post("/auth/login")
        .send({ wrongUsername, password });
      expect(response.status).toBe(400);
      expect(response.body).not.toHaveProperty("apiToken");
    });

    it("returns 400 if wrong password", async () => {
      const wrongPassword = "wrong-password";
      const response = await request(app)
        .post("/auth/login")
        .send({ username, wrongPassword });
      expect(response.status).toBe(400);
      expect(response.body).not.toHaveProperty("apiToken");
    });

    it("returns 400 if missing data", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({ username });
      expect(response.status).toBe(400);
      expect(response.body).not.toHaveProperty("apiToken");
    });
  });

  describe("logout endpoint", () => {
    let user: any;
    const username = "testuser";
    const password = "testpassword";

    beforeEach(async () => {
      user = new User({
        username,
        password
      });
      user.generateApiToken();
      await user.save();
    });

    afterEach(async () => {
      await User.deleteMany({});
    });

    it("logs out correctly", async () => {
      const response = await request(app)
        .post("/auth/logout")
        .set("Authorization", user.getAuthHeader());
      expect(response.status).toBe(200);
    });

    it("returns 400 if user not logged in", async () => {
      user.clearApiToken();
      await user.save();
      const response = await request(app)
        .post("/auth/logout")
        .set("Authorization", user.getAuthHeader());
      expect(response.status).toBe(400);
    });
  });

  describe("is authenticated endpoint", () => {
    let user: any;
    const username = "testuser";
    const password = "testpassword";

    beforeEach(async () => {
      user = new User({
        username,
        password
      });
      user.generateApiToken();
      await user.save();
    });

    afterEach(async () => {
      await User.deleteMany({});
    });

    it("returns 200 if user is authenticated", async () => {
      const response = await request(app)
        .get("/auth/isauthenticated")
        .set("Authorization", user.getAuthHeader());
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("username", user.username);
      expect(response.body).toHaveProperty("apiToken", user.apiToken);
    });

    it("return 401 if user is not authenticated", async () => {
      user.clearApiToken();
      await user.save();
      const response = await request(app)
        .get("/auth/isauthenticated")
        .set("Authorization", user.getAuthHeader());
      expect(response.status).toBe(401);
    });

    it("return 401 if Authorization header is not present", async () => {
      const response = await request(app).get("/auth/isauthenticated");
      expect(response.status).toBe(401);
    });
  });
});
