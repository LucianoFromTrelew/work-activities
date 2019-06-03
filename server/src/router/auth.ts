import { Router } from "express";
import {
  login,
  logout,
  isAuthenticated,
  signup
} from "../controllers/auth.controller";
import passport from "../config/passport";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.get(
  "/isauthenticated",
  passport.authenticate("bearer", { session: false }),
  isAuthenticated
);
router.post("/signup", signup);

export default router;
