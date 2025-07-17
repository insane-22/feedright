import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createFormController,
  getFormsController,
  getSingleFormController,
} from "../controllers/formController.js";

const router = express.Router();

router.post("/create", requireSignIn, createFormController);
router.get("/all", requireSignIn, getFormsController);

router.get("/single/:slug", getSingleFormController)

export default router;
