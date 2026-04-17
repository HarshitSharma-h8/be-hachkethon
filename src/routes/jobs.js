import express from "express";

import {
  createJob,
  getAllJobs,
  getJobById,
  updateJobStatus,
  deleteJob,
  applyToJob,
  getMyJobs,
  getAppliedJobs,
} from "../controllers/jobs.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createJob);
router.get("/", getAllJobs);
router.get("/my", auth, getMyJobs);
router.get("/applied", auth, getAppliedJobs);
router.get("/:id", getJobById);
router.put("/:id", auth, updateJobStatus);
router.delete("/:id", auth, deleteJob);
router.post("/:id/apply", auth, applyToJob);

export default router;
