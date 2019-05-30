import request from "supertest";
import getApp from "../app";
import { Application } from "express";

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
    expect(response.status).toBe(200);
    expect(response.text).toMatch("Hello world!");
  });
});
