import request from "supertest";
import faker from "faker";
import getApp from "../app";
import IActivity from "../interfaces/activity.interface";
import { Application } from "express";
import Activity from "../models/activity.model";
import { Document } from "mongoose";

describe("activity", () => {
  let app: Application;
  const mongoDb = process.env.MONGO_DB;

  beforeEach(async () => {
    process.env.MONGO_DB = "test";
    app = await getApp();
  });
  afterEach(async () => {
    process.env.MONGO_DB = mongoDb;
    await Activity.deleteMany({});
  });

  const getFakeActivity = (id: Number = 1): IActivity => {
    const data: IActivity = {
      id,
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence(),
      tags: Array(3).fill(faker.random.word()),
      geolocation: {
        latitude: faker.random.number({ min: 10, max: 100 }),
        longitude: faker.random.number({ min: 10, max: 100 })
      }
    };
    return data;
  };

  const createActivities = async (qty: Number) => {
    const activityData: IActivity = getFakeActivity();
    let activities = [];
    for (let i = 0; i < qty; i++) {
      const activity = await new Activity(activityData).save();
      activities.push(activity);
    }
    return activities;
  };

  it("should work", () => {
    expect(1).toBe(1);
  });

  it("works correctly on /api/activity", async () => {
    const MAX_ACTIVITIES = 10;
    await createActivities(MAX_ACTIVITIES);
    const response = await request(app).get("/api/activity");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(MAX_ACTIVITIES);
  });

  describe("keyword search", () => {
    beforeEach(async () => {
      await new Activity({
        title: "some title"
      }).save();
      await new Activity({
        tags: ["coso", "otro"],
        description: "some description"
      }).save();
      await new Activity({
        tags: ["tag1", "tag2", "personal"]
      }).save();
    });

    it("filters correctly by title", async () => {
      const response = await request(app).get("/api/activity?keyword[]=title");
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toHaveProperty("title", "some title");
    });

    it("filters correctly by description", async () => {
      const response = await request(app).get(
        "/api/activity?keyword[]=description"
      );
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toHaveProperty(
        "description",
        "some description"
      );
    });

    it("filters correctly by both fields", async () => {
      const response = await request(app).get("/api/activity?keyword[]=some");
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(2);
    });

    it("filters correctly by tags field", async () => {
      const response = await request(app).get(
        "/api/activity?keyword[]=personal"
      );
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(1);
      expect(response.body[0].tags).toContain("personal");
    });

    it("filters correctly with several keywords", async () => {
      const response = await request(app).get(
        "/api/activity?keyword[]=coso&keyword[]=personal&keyword[]=title"
      );
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(3);
    });
  });

  it("gets correctly a single activity", async () => {
    const MAX_ACTIVITIES = 1;
    await createActivities(MAX_ACTIVITIES);
    const activity = await Activity.findOne();
    const response = await request(app).get(`/api/activity/${activity.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", activity.id);
    expect(response.body).toHaveProperty("title", activity.title);
    expect(response.body).toHaveProperty("description", activity.description);
    expect(response.body).toHaveProperty("tags");
    expect(response.body).toHaveProperty(
      "geolocation.latitude",
      activity.geolocation.latitude
    );
    expect(response.body).toHaveProperty(
      "geolocation.longitude",
      activity.geolocation.longitude
    );
  });

  it("returns 404 on not found activity", async () => {
    const id = 1;
    const response = await request(app).get(`/api/activity/${id}`);
    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({ msg: "No encontrado" });
  });

  describe("create endpoint", () => {
    it("creates an activity correctly", async () => {
      const data = getFakeActivity();
      const response = await request(app)
        .post("/api/activity")
        .send(data);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("title", data.title);
      expect(response.body).toHaveProperty("description", data.description);
      expect(response.body).toHaveProperty("tags", data.tags);
      expect(response.body).toHaveProperty("geolocation", data.geolocation);
    });
  });

  describe("delete endpoint", () => {
    let activity: IActivity & Document;

    beforeEach(async () => {
      activity = (await createActivities(1))[0];
    });

    it("deletes an existing activity correctly", async () => {
      const response = await request(app).delete(
        `/api/activity/${activity.id}`
      );
      expect(response.status).toBe(204);
    });

    it("return 404 if trying to delete non existing activity", async () => {
      await Activity.deleteMany({});
      const response = await request(app).delete(
        `/api/activity/${activity.id}`
      );
      expect(response.status).toBe(404);
    });
  });

  describe("update endpoint", () => {
    let activity: IActivity & Document;
    beforeEach(async () => {
      activity = (await createActivities(1))[0];
    });

    it("updates correctly an existing activity", async () => {
      const response = await request(app)
        .put(`/api/activity/${activity.id}`)
        .send({ tags: ["coso"] });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("tags", ["coso"]);
      expect(response.body).toHaveProperty("id", activity.id);
    });

    it("returns 404 if trying to update non existing activity", async () => {
      await Activity.deleteMany({});
      const response = await request(app)
        .put(`/api/activity/${activity.id}`)
        .send({ tags: ["coso"] });
      expect(response.status).toBe(404);
    });

    it("returns 404 if sending incorrect body", async () => {
      const response = await request(app)
        .put(`/api/activity/${activity.id}`)
        .send({ fruta: "mucha" });
      expect(response.status).toBe(404);
    });
  });
});
