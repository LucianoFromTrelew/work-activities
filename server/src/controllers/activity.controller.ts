import { Request, Response, NextFunction } from "express";
import IActivity from "../interfaces/activity.interface";
import Activity from "../models/activity.model";
import { Document } from "mongoose";

const filterByKeyword = (
  activities: (IActivity & Document)[],
  keywordList: String[]
): (IActivity & Document)[] => {
  const hasKeyword = (activity: IActivity & Document): boolean => {
    return keywordList.some((keyword: string) =>
      activity.toString().includes(keyword)
    );
  };
  return activities.filter(hasKeyword);
};

const getActivities = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const activities = await Activity.find();
  const { keyword } = request.query;
  if (keyword) {
    // response.send(
    //   activities.filter(activity => activity.filterByKeyword(keyword))
    // );
    response.send(filterByKeyword(activities, keyword));
    return;
  }
  response.send(activities);
};

const getActivityById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);
  const activity = await Activity.findOne({ id });
  if (!activity) {
    response.status(404);
    response.send({ msg: "No encontrado" });
    return;
  }
  response.send(activity);
};

const createActivity = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // TODO: Check if request.body implements IActivity
  const activityData: IActivity = <IActivity>request.body;
  activityData.id = (await Activity.countDocuments()) + 1;
  const createdActivity = new Activity(activityData);
  const savedPost = await createdActivity.save();
  response.send(savedPost);
};

const deleteActivity = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);
  const activity = await Activity.findOne({ id });
  if (!activity) {
    response.status(404);
    response.send({ msg: "No encontrado" });
    return;
  }
  await activity.remove();
  response.status(204).send();
};

const updateActivity = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);
  // TODO: Check if request.body implements IActivity
  const res = await Activity.updateOne({ id }, request.body);
  if (!res.n) {
    response.status(404);
    response.send({ msg: "No encontrado" });
    return;
  }
  response.status(200).send(await Activity.findOne({ id }));
};

export {
  createActivity,
  getActivities,
  getActivityById,
  deleteActivity,
  updateActivity
};
