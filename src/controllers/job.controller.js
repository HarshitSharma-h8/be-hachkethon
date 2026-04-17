import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../middlewares/ApiError.js";
import Job from "../models/Job.js";


// ✅ CREATE JOB (Employer only)
export const createJob = asyncHandler(async (req, res) => {
  const { title, description, location, salary, skillsRequired } = req.body;

  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }

  const job = await Job.create({
    title,
    description,
    location,
    salary,
    skillsRequired,
    employer: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: job,
  });
});


// ✅ GET ALL JOBS (with filters)
export const getJobs = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, location, skill, sort, search } = req.query;

  let filter = {};

  // 🔍 filters
  if (location) filter.location = location;
  if (skill) filter.skillsRequired = { $in: [skill] };

  // 🔎 search
  if (search) {
    filter.$text = { $search: search };
  }

  const skip = (page - 1) * limit;

  let query = Job.find(filter).populate("employer", "name");

  // 📊 sorting
  if (sort === "latest") query = query.sort({ createdAt: -1 });
  if (sort === "salary") query = query.sort({ salary: -1 });

  const jobs = await query.skip(skip).limit(Number(limit));

  const total = await Job.countDocuments(filter);

  res.status(200).json({
    success: true,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
    total,
    data: jobs,
  });
});


// ✅ GET SINGLE JOB
export const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate("employer", "name");

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  res.status(200).json({
    success: true,
    data: job,
  });
});


// ✅ UPDATE JOB
export const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // 🔐 only owner can update
  if (job.employer.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized");
  }

  Object.assign(job, req.body);

  const updatedJob = await job.save();

  res.status(200).json({
    success: true,
    data: updatedJob,
  });
});


// ✅ DELETE JOB
export const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  if (job.employer.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized");
  }

  await job.deleteOne();

  res.status(200).json({
    success: true,
    message: "Job deleted successfully",
  });
});