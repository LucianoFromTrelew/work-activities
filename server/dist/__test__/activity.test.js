"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const faker_1 = __importDefault(require("faker"));
const app_1 = __importDefault(require("../app"));
const activity_model_1 = __importDefault(require("../models/activity.model"));
describe("activity", () => {
    let app;
    const mongoDb = process.env.MONGO_DB;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        process.env.MONGO_DB = "test";
        app = yield app_1.default();
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        process.env.MONGO_DB = mongoDb;
        yield activity_model_1.default.deleteMany({});
    }));
    const getFakeActivity = (id = 1) => {
        const data = {
            id,
            title: faker_1.default.lorem.sentence(),
            description: faker_1.default.lorem.sentence(),
            tags: Array(3).fill(faker_1.default.random.word()),
            geolocation: {
                latitude: faker_1.default.random.number({ min: 10, max: 100 }),
                longitude: faker_1.default.random.number({ min: 10, max: 100 })
            }
        };
        return data;
    };
    const createActivities = (qty) => __awaiter(this, void 0, void 0, function* () {
        const activityData = getFakeActivity();
        let activities = [];
        for (let i = 0; i < qty; i++) {
            const activity = yield new activity_model_1.default(activityData).save();
            activities.push(activity);
        }
        return activities;
    });
    it("should work", () => {
        expect(1).toBe(1);
    });
    it("works correctly on /api/activity", () => __awaiter(this, void 0, void 0, function* () {
        const MAX_ACTIVITIES = 10;
        yield createActivities(MAX_ACTIVITIES);
        const response = yield supertest_1.default(app).get("/api/activity");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(MAX_ACTIVITIES);
    }));
    describe("keyword search", () => {
        beforeEach(() => __awaiter(this, void 0, void 0, function* () {
            yield new activity_model_1.default({
                title: "some title"
            }).save();
            yield new activity_model_1.default({
                tags: ["coso", "otro"],
                description: "some description"
            }).save();
            yield new activity_model_1.default({
                tags: ["tag1", "tag2", "personal"]
            }).save();
        }));
        it("filters correctly by title", () => __awaiter(this, void 0, void 0, function* () {
            const response = yield supertest_1.default(app).get("/api/activity?keyword[]=title");
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBe(1);
            expect(response.body[0]).toHaveProperty("title", "some title");
        }));
        it("filters correctly by description", () => __awaiter(this, void 0, void 0, function* () {
            const response = yield supertest_1.default(app).get("/api/activity?keyword[]=description");
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBe(1);
            expect(response.body[0]).toHaveProperty("description", "some description");
        }));
        it("filters correctly by both fields", () => __awaiter(this, void 0, void 0, function* () {
            const response = yield supertest_1.default(app).get("/api/activity?keyword[]=some");
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBe(2);
        }));
        it("filters correctly by tags field", () => __awaiter(this, void 0, void 0, function* () {
            const response = yield supertest_1.default(app).get("/api/activity?keyword[]=personal");
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBe(1);
            expect(response.body[0].tags).toContain("personal");
        }));
        it("filters correctly with several keywords", () => __awaiter(this, void 0, void 0, function* () {
            const response = yield supertest_1.default(app).get("/api/activity?keyword[]=coso&keyword[]=personal&keyword[]=title");
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBe(3);
        }));
    });
    it("gets correctly a single activity", () => __awaiter(this, void 0, void 0, function* () {
        const MAX_ACTIVITIES = 1;
        yield createActivities(MAX_ACTIVITIES);
        const activity = yield activity_model_1.default.findOne();
        const response = yield supertest_1.default(app).get(`/api/activity/${activity.id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", activity.id);
        expect(response.body).toHaveProperty("title", activity.title);
        expect(response.body).toHaveProperty("description", activity.description);
        expect(response.body).toHaveProperty("tags");
        expect(response.body).toHaveProperty("geolocation.latitude", activity.geolocation.latitude);
        expect(response.body).toHaveProperty("geolocation.longitude", activity.geolocation.longitude);
    }));
    it("returns 404 on not found activity", () => __awaiter(this, void 0, void 0, function* () {
        const id = 1;
        const response = yield supertest_1.default(app).get(`/api/activity/${id}`);
        expect(response.status).toBe(404);
        expect(response.body).toMatchObject({ msg: "No encontrado" });
    }));
    describe("create endpoint", () => {
        it("creates an activity correctly", () => __awaiter(this, void 0, void 0, function* () {
            const data = getFakeActivity();
            const response = yield supertest_1.default(app)
                .post("/api/activity")
                .send(data);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("title", data.title);
            expect(response.body).toHaveProperty("description", data.description);
            expect(response.body).toHaveProperty("tags", data.tags);
            expect(response.body).toHaveProperty("geolocation", data.geolocation);
        }));
    });
    describe("delete endpoint", () => {
        let activity;
        beforeEach(() => __awaiter(this, void 0, void 0, function* () {
            activity = (yield createActivities(1))[0];
        }));
        it("deletes an existing activity correctly", () => __awaiter(this, void 0, void 0, function* () {
            const response = yield supertest_1.default(app).delete(`/api/activity/${activity.id}`);
            expect(response.status).toBe(204);
        }));
        it("return 404 if trying to delete non existing activity", () => __awaiter(this, void 0, void 0, function* () {
            yield activity_model_1.default.deleteMany({});
            const response = yield supertest_1.default(app).delete(`/api/activity/${activity.id}`);
            expect(response.status).toBe(404);
        }));
    });
    describe("update endpoint", () => {
        let activity;
        beforeEach(() => __awaiter(this, void 0, void 0, function* () {
            activity = (yield createActivities(1))[0];
        }));
        it("updates correctly an existing activity", () => __awaiter(this, void 0, void 0, function* () {
            const response = yield supertest_1.default(app)
                .put(`/api/activity/${activity.id}`)
                .send({ tags: ["coso"] });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("tags", ["coso"]);
            expect(response.body).toHaveProperty("id", activity.id);
        }));
        it("returns 404 if trying to update non existing activity", () => __awaiter(this, void 0, void 0, function* () {
            yield activity_model_1.default.deleteMany({});
            const response = yield supertest_1.default(app)
                .put(`/api/activity/${activity.id}`)
                .send({ tags: ["coso"] });
            expect(response.status).toBe(404);
        }));
        it("returns 404 if sending incorrect body", () => __awaiter(this, void 0, void 0, function* () {
            const response = yield supertest_1.default(app)
                .put(`/api/activity/${activity.id}`)
                .send({ fruta: "mucha" });
            expect(response.status).toBe(404);
        }));
    });
});
//# sourceMappingURL=activity.test.js.map