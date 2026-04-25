import express from "express";
import passport from "passport";
import { getPublicKeyController, googleCallback, logout, me } from "../controllers/auth.controller.js";
import { authenticateJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// Step 1: Redirect to Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);

router.get("/public-key", getPublicKeyController);
router.get("/me", authenticateJWT, me);
router.post("/logout", logout);

export default router;