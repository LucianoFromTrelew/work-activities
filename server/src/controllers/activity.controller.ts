import { Request, Response, NextFunction } from "express";
import Activity from "../models/activity.model";

const getActivities = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const activities = await Activity.find();
  const { keyword } = request.query;
  if (keyword) {
    response.send(
      activities.filter(activity => activity.filterByKeyword(keyword))
    );
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
    response.send({ msg: "Actividad no encontrada" });
    return;
  }
  response.send(activity);
};

const createActivity = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const activityData: any = request.body;
    activityData.id = (await Activity.countDocuments()) + 1;
    const createdActivity = new Activity(activityData);
    const savedPost = await createdActivity.save();
    response.send(savedPost);
  } catch (error) {
    response.status(400).send("Datos incorrectos");
  }
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
    response.send({ msg: "Actividad no encontrada" });
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
  const res = await Activity.updateOne({ id }, request.body);
  if (!res.n) {
    response.status(404);
    response.send({ msg: "Actividad no encontrada" });
    return;
  }
  response.status(200).send(await Activity.findOne({ id }));
};

const deleteTagFromActivity = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);
  const tagToDelete = request.params.tag;
  const activity = await Activity.findOne({ id });

  if (!activity) {
    response.status(404).send({ msg: "Actividad no encontrada" });
    return;
  }

  if (!activity.hasTag(tagToDelete)) {
    response
      .status(404)
      .send({ msg: "Etiqueta no encontrada en la actividad" });
    return;
  }

  activity.removeTag(tagToDelete);
  await activity.save();
  response.status(204).send();
};

export {
  createActivity,
  getActivities,
  getActivityById,
  deleteActivity,
  updateActivity,
  deleteTagFromActivity
};
