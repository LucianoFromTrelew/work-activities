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
const activity_model_1 = __importDefault(require("../models/activity.model"));
const filterByKeyword = (activities, keywordList) => {
    const hasKeyword = (activity) => {
        return keywordList.some((keyword) => activity.toString().includes(keyword));
    };
    return activities.filter(hasKeyword);
};
const getActivities = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
    const activities = yield activity_model_1.default.find();
    const { keyword } = request.query;
    if (keyword) {
        // response.send(
        //   activities.filter(activity => activity.filterByKeyword(keyword))
        // );
        response.send(filterByKeyword(activities, keyword));
        return;
    }
    response.send(activities);
});
exports.getActivities = getActivities;
const getActivityById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    const activity = yield activity_model_1.default.findOne({ id });
    if (!activity) {
        response.status(404);
        response.send({ msg: "No encontrado" });
        return;
    }
    response.send(activity);
});
exports.getActivityById = getActivityById;
const createActivity = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
    // TODO: Check if request.body implements IActivity
    const activityData = request.body;
    activityData.id = (yield activity_model_1.default.countDocuments()) + 1;
    const createdActivity = new activity_model_1.default(activityData);
    const savedPost = yield createdActivity.save();
    response.send(savedPost);
});
exports.createActivity = createActivity;
const deleteActivity = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    const activity = yield activity_model_1.default.findOne({ id });
    if (!activity) {
        response.status(404);
        response.send({ msg: "No encontrado" });
        return;
    }
    yield activity.remove();
    response.status(204).send();
});
exports.deleteActivity = deleteActivity;
const updateActivity = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    // TODO: Check if request.body implements IActivity
    const res = yield activity_model_1.default.updateOne({ id }, request.body);
    if (!res.n) {
        response.status(404);
        response.send({ msg: "No encontrado" });
        return;
    }
    response.status(200).send(yield activity_model_1.default.findOne({ id }));
});
exports.updateActivity = updateActivity;
//# sourceMappingURL=activity.controller.js.map