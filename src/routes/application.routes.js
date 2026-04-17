import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/authorize.js";
import {
  applyToJob,
  getMyApplications,
  getApplicants,
  updateApplicationStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

// 👷 worker routes
router.post("/:jobId", protect, authorize("worker"), applyToJob);
router.get("/me", protect, authorize("worker"), getMyApplications);

// 🧑‍💼 employer routes
router.get("/job/:jobId", protect, authorize("employer"), getApplicants);
router.put("/:id", protect, authorize("employer"), updateApplicationStatus);

export default router;