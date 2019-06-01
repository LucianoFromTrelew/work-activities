import { Router, Request, Response, NextFunction } from "express";
import {
  createActivity,
  getActivities,
  getActivityById,
  deleteActivity,
  updateActivity,
  deleteTagFromActivity
} from "../controllers/activity.controller";

const router = Router();

router.get("/", getActivities);
router.post("/", createActivity);
router.get("/:id", getActivityById);
router.delete("/:id", deleteActivity);
router.put("/:id", updateActivity);
router.delete("/:id/tags/:tag", deleteTagFromActivity);

export default router;
