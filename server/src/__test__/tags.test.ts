import Activity from "../models/activity.model";
import request from "supertest";
import faker from "faker";
import { Application } from "express";
import getApp from "../app";

describe("tag", () => {
  let app: Application;
  const mongoDb = process.env.MONGO_DB;

  beforeEach(async () => {
    process.env.MONGO_DB = "test";
    app = await getApp();
  });

  afterEach(() => {
    process.env.MONGO_DB = mongoDb;
  });

  afterAll(async () => {
    try {
      await Activity.deleteMany({});
    } catch (error) {}
  });

  it("should work", () => {
    expect(1).toBe(1);
  });

  describe("list endpoint", () => {
    beforeEach(async () => {
      await new Activity({
        id: faker.random.number(),
        title: "Some title",
        description: "Some description",
        tags: ["personal", "corporative"]
      }).save();
      await new Activity({
        id: faker.random.number(),
        title: "Some title",
        description: "Some description",
        tags: ["health", "personal"]
      }).save();
      await new Activity({
        id: faker.random.number(),
        title: "Some title",
        description: "Some description",
        tags: ["hot", "exclusive"]
      }).save();
      await new Activity({
        id: faker.random.number(),
        title: "Some title",
        description: "Some description",
        tags: ["brand", "new"]
      }).save();
    });

    afterEach(async () => {
      try {
        await Activity.deleteMany({});
      } catch (error) {}
    });

    it("returns correctly all tags without duplicates", async () => {
      const response = await request(app).get("/api/tag");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      for (const tag of [
        "health",
        "personal",
        "corporative",
        "hot",
        "exclusive",
        "brand",
        "new"
      ]) {
        expect(response.body).toContain(tag);
      }
    });

    it("returns an empty list if there is not any activity", async () => {
      await Activity.deleteMany({});
      const response = await request(app).get("/api/tag");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(0);
    });

    it("returns correctly one tag with activities that have that tag", async () => {
      const tagToFind = "personal";
      const response = await request(app).get(`/api/tag/${tagToFind}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.tag).toMatch(tagToFind);
      expect(response.body.activities).toBeInstanceOf(Array);
      expect(response.body.activities.length).toBe(2);
    });

    it("returns tag with empty activities list", async () => {
      const tagToFind = "non-existing-tag";
      const response = await request(app).get(`/api/tag/${tagToFind}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.tag).toMatch(tagToFind);
      expect(response.body.activities).toBeInstanceOf(Array);
      expect(response.body.activities.length).toBe(0);
    });
  });

  describe("delete tag endpoint", () => {
    const id = faker.random.number();

    beforeEach(async () => {
      await new Activity({
        id,
        title: faker.lorem.sentence(),
        description: faker.lorem.sentence(),
        tags: ["personal", "health"]
      }).save();
      await new Activity({
        id: faker.random.number(),
        title: faker.lorem.sentence(),
        description: faker.lorem.sentence(),
        tags: ["corporative", "health"]
      }).save();
    });

    afterEach(async () => {
      try {
        await Activity.deleteMany({});
      } catch (error) {}
    });

    it("removes a tag from every activity correctly", async () => {
      const tagToDelete = "personal";
      const response = await request(app).delete(`/api/tag/${tagToDelete}`);
      const activity = await Activity.findOne({ id });
      expect(response.status).toBe(204);
      expect(activity.tags.length).toBe(1);
    });

    it("removes a tag and deletes the activity correctly (cascade)", async () => {
      const tagToDelete = "personal";
      const activityCount = await Activity.countDocuments();
      const response = await request(app).delete(
        `/api/tag/${tagToDelete}?cascade=true`
      );
      const newActivityCount = await Activity.countDocuments();
      expect(response.status).toBe(204);
      expect(newActivityCount).toBe(activityCount - 1);
    });
  });
});
