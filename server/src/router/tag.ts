import { Router } from "express";
import { getTags, getOneTag, deleteTag } from "../controllers/tag.controller";

const router = Router();
router.get("/", getTags);
router.get("/:tag", getOneTag);
router.delete("/:tag", deleteTag);

export default router;
