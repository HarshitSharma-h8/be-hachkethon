import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";
import { createJob, getJobs, getJobById, updateJob, deleteJob } from "../controllers/job.controller.js";

const router = express.Router();

// public
router.get("/", getJobs);
router.get("/:id", getJobById);

// protected
// router.post("/", protect, createJob);
router.post("/", protect, authorize("employer"), createJob);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);

export default router;