"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_controller_1 = require("../controllers/activity.controller");
const router = express_1.Router();
router.get("/", activity_controller_1.getActivities);
router.post("/", activity_controller_1.createActivity);
router.get("/:id", activity_controller_1.getActivityById);
router.delete("/:id", activity_controller_1.deleteActivity);
router.put("/:id", activity_controller_1.updateActivity);
exports.default = router;
//# sourceMappingURL=activity.js.map