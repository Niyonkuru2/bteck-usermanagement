import express from "express";
import * as userController from "../controllers/user.controller.js";
import { authenticateJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect ALL routes
router.use(authenticateJWT);

router.post("/", userController.create);
router.get("/", userController.getAll);
router.put("/:id", userController.updateUser); 
router.delete("/:id", userController.deleteUser);
router.get("/export", userController.exportUsers);
router.get("/graph", userController.graph);

export default router;