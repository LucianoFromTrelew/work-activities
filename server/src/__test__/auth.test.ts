import request from "supertest";
import faker from "faker";
import getApp from "../app";
import { Application } from "express";

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

  describe("login", () => {
    let user;
    beforeEach(async () => {
      // TODO: Create user
    });

    afterEach(async () => {
      // TODO: Delete users
    });

    it("logs in correctly", async () => {
      const { username, password } = user;
      const response = await request(app)
        .post("/auth/login")
        .send({ username, password });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("apiToken");
    });

    it("returns 400 if wrong username", async () => {
      const username = "non-existing-username";
      const { password } = user;
      const response = await request(app)
        .post("/auth/login")
        .send({ username, password });
      expect(response.status).toBe(400);
      expect(response.body).not.toHaveProperty("apiToken");
    });

    it("returns 400 if wrong password", async () => {
      const password = "wrong-password";
      const { username } = user;
      const response = await request(app)
        .post("/auth/login")
        .send({ username, password });
      expect(response.status).toBe(400);
      expect(response.body).not.toHaveProperty("apiToken");
    });
  });
});
