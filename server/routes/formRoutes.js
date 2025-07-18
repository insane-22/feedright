import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createFormController,
  deleteFormController,
  getAdminStatsController,
  getFormsController,
  getSingleFormController,
} from "../controllers/formController.js";
import {
  getFormResponseController,
  submitResponseController,
} from "../controllers/responseController.js";

const router = express.Router();

router.post("/create", requireSignIn, createFormController);
router.get("/all", requireSignIn, getFormsController);
router.get("/admin/stats", requireSignIn, getAdminStatsController);
router.delete("/delete/:id", requireSignIn, deleteFormController);

router.get("/single/:slug", getSingleFormController);
router.post("/single/:slug/response", submitResponseController);
router.get("/single/:formId/responses", requireSignIn, getFormResponseController);

export default router;
