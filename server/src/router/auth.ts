import { Router } from "express";
import { login, logout, isAuthenticated } from "../controllers/auth.controller";
import passport from "../config/passport";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.get(
  "/isauthenticated",
  passport.authenticate("bearer", { session: false }),
  isAuthenticated
);

export default router;
