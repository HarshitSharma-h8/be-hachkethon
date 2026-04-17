import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../middlewares/ApiError.js";
import Application from "../models/Application.js";
import Job from "../models/Job.js";


// ✅ APPLY TO JOB (worker only)
export const applyToJob = asyncHandler(async (req, res) => {
  const jobId = req.params.jobId;

  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  const application = await Application.create({
    job: jobId,
    worker: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: application,
  });
});


// ✅ GET MY APPLICATIONS (worker)
export const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ worker: req.user._id })
    .populate("job");

  res.status(200).json({
    success: true,
    data: applications,
  });
});


// ✅ GET APPLICANTS FOR A JOB (employer)
export const getApplicants = asyncHandler(async (req, res) => {
  const jobId = req.params.jobId;

  const applications = await Application.find({ job: jobId })
    .populate("worker", "name phone skills");

  res.status(200).json({
    success: true,
    data: applications,
  });
});


// ✅ UPDATE STATUS (employer)
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const application = await Application.findById(req.params.id);

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  application.status = status;
  await application.save();

  res.status(200).json({
    success: true,
    data: application,
  });
});