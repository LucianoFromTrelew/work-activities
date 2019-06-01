import request from "supertest";
import faker from "faker";
import getApp from "../app";
import { Application } from "express";
import Activity from "../models/activity.model";

describe("activity", () => {
  let app: Application;
  const mongoDb = process.env.MONGO_DB;

  beforeEach(async () => {
    process.env.MONGO_DB = "test";
    app = await getApp();
  });

  afterEach(async () => {
    process.env.MONGO_DB = mongoDb;
    try {
      await Activity.deleteMany({});
    } catch (error) {}
  });

  afterAll(async () => {
    try {
      await Activity.deleteMany({});
    } catch (error) {}
  });

  const getActivityData = (): any => {
    return {
      id: faker.random.number(),
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence(),
      tags: Array(3)
        .fill(1)
        .map(() => faker.random.word()),
      geolocation: {
        latitude: faker.random.number({ min: 10, max: 100 }),
        longitude: faker.random.number({ min: 10, max: 100 })
      }
    };
  };

  const createActivities = async (qty: Number) => {
    let activities = [];
    for (let i = 0; i < qty; i++) {
      const activity = await new Activity(getActivityData()).save();
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
        id: faker.random.number(),
        title: "unique title",
        description: "a description",
        tags: ["personal", "corporative"]
      }).save();
      await new Activity({
        id: faker.random.number(),
        title: "a title",
        description: "some description",
        tags: ["personal", "corporative"]
      }).save();
      await new Activity({
        id: faker.random.number(),
        title: "a title",
        description: "some description",
        tags: ["personal", "corporative", "health"]
      }).save();
    });

    afterEach(async () => {
      try {
        await Activity.deleteMany({});
      } catch (error) {}
    });

    it("filters correctly by title", async () => {
      const response = await request(app).get("/api/activity?keyword[]=unique");
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toHaveProperty("title", "unique title");
    });

    it("filters correctly by description", async () => {
      const response = await request(app).get(
        "/api/activity?keyword[]=description"
      );
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(3);
      expect(response.body[0]).toHaveProperty("description", "a description");
    });

    it("filters correctly by both fields", async () => {
      const response = await request(app).get("/api/activity?keyword[]=some");
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(2);
    });

    it("filters correctly by tags field", async () => {
      const response = await request(app).get("/api/activity?keyword[]=health");
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(1);
      expect(response.body[0].tags).toContain("health");
    });

    it("filters correctly with several keywords", async () => {
      const response = await request(app).get(
        "/api/activity?keyword[]=title&keyword[]=some&keyword[]=health"
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
    expect(response.body).toMatchObject({ msg: "Actividad no encontrada" });
  });

  describe("create endpoint", () => {
    let data: any;
    let id: Number;

    beforeEach(() => {
      data = getActivityData();
    });

    afterEach(async () => {
      try {
        await Activity.deleteMany({});
      } catch (error) {}
    });

    it("creates an activity correctly", async () => {
      const response = await request(app)
        .post("/api/activity")
        .send(data);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", 1);
      expect(response.body).toHaveProperty("title", data.title);
      expect(response.body).toHaveProperty("description", data.description);
      expect(response.body).toHaveProperty("tags", data.tags);
      expect(response.body).toHaveProperty("geolocation", data.geolocation);
    });

    it("won't create an activity if not sending title", async () => {
      delete data.title;
      const response = await request(app)
        .post("/api/activity")
        .send(data);
      expect(response.status).toBe(400);
    });

    it("won't create an activity if not sending description", async () => {
      delete data.description;
      const response = await request(app)
        .post("/api/activity")
        .send(data);
      expect(response.status).toBe(400);
    });

    it("won't create an activity if not sending tags", async () => {
      delete data.tags;
      const response = await request(app)
        .post("/api/activity")
        .send(data);
      expect(response.status).toBe(400);
    });

    it("won't create an activity if sending wrong tags", async () => {
      data.tags[0] = 32;
      const response = await request(app)
        .post("/api/activity")
        .send(data);
      expect(response.status).toBe(400);
    });

    it("creates an activity if not sending geolocation", async () => {
      delete data.geolocation;
      const response = await request(app)
        .post("/api/activity")
        .send(data);
      expect(response.status).toBe(200);
    });
  });

  describe("delete endpoint", () => {
    let activity: any;

    beforeEach(async () => {
      activity = (await createActivities(1))[0];
    });

    afterEach(async () => {
      try {
        await Activity.deleteMany({});
      } catch (error) {}
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
    let activity: any;

    beforeEach(async () => {
      activity = (await createActivities(1))[0];
    });

    afterEach(async () => {
      try {
        await Activity.deleteMany({});
      } catch (error) {}
    });

    it("updates correctly an existing activity", async () => {
      const response = await request(app)
        .put(`/api/activity/${activity.id}`)
        .send({ tags: ["coso"] });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("tags", ["coso"]);
      expect(response.body).toHaveProperty("id", activity.id);
    });

    it("returns 404 if sending incorrect body", async () => {
      const response = await request(app)
        .put(`/api/activity/${activity.id}`)
        .send({ fruta: "mucha" });
      expect(response.status).toBe(404);
    });

    // Skip this one
    xit("returns 404 if sending wrong data", async () => {
      const response = await request(app)
        .put(`/api/activity/${activity.id}`)
        .send({ tags: [33] });
      expect(response.status).toBe(404);
    });

    it("returns 404 if trying to update non existing activity", async () => {
      await Activity.deleteMany({});
      const response = await request(app)
        .put(`/api/activity/${activity.id}`)
        .send({ tags: ["coso"] });
      expect(response.status).toBe(404);
    });

    it("adds correctly geolocation object", async () => {
      const geolocation = {
        latitude: 12,
        longitude: 32
      };
      const response = await request(app)
        .put(`/api/activity/${activity.id}`)
        .send({ geolocation });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("geolocation", geolocation);
    });
  });

  describe("delete tag from activity", () => {
    let activity: any;

    beforeEach(async () => {
      activity = (await createActivities(1))[0];
    });

    afterEach(async () => {
      try {
        await Activity.deleteMany({});
      } catch (error) {}
    });

    it("deletes correctly a tag from an activity", async () => {
      const response = await request(app).delete(
        `/api/activity/${activity.id}/tags/${activity.tags[0]}`
      );
      expect(response.status).toBe(204);
      const updatedActivity = await Activity.findOne({ id: activity.id });
      expect(updatedActivity.tags.length).toBe(activity.tags.length - 1);
    });

    it("returns 404 if trying to delete a non present tag from an activity", async () => {
      const tag: String = activity.tags.pop(0);
      activity.tags = [];
      await activity.save();
      const response = await request(app).delete(
        `/api/activity/${activity.id}/tags/${tag}`
      );
      expect(response.status).toBe(404);
    });

    it("returns 404 if trying to delete a tag from a non existing activity", async () => {
      await Activity.deleteMany({});
      const response = await request(app).delete(
        `/api/activity/${activity.id}/tags/sometag`
      );
      expect(response.status).toBe(404);
    });
  });
});
