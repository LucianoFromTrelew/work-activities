import { Request, Response, NextFunction } from "express";
import Activity from "../models/activity.model";

const getTags = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.send(await Activity.getTags());
};

const getOneTag = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const tag = request.params.tag;
  const activities = await Activity.getActivitiesForTag(tag);
  response.status(200).send({
    tag,
    activities
  });
};

const deleteTag = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const tagToDelete = request.params.tag;
    const activities = await Activity.getActivitiesForTag(tagToDelete);
    const { cascade } = request.query;
    if (cascade) {
      for (const activity of activities) {
        await activity.remove();
      }
    } else {
      for (const activity of activities) {
        activity.removeTag(tagToDelete);
        await activity.save();
      }
    }
    response.status(204).send();
  } catch (err) {
    response.status(400).send();
  }
};

export { getTags, getOneTag, deleteTag };
