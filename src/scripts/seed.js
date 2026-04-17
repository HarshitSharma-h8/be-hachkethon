import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "../models/Job.js";
import connectDB from "../config/db.js";

dotenv.config();
connectDB();

const seedJobs = async () => {
  await Job.deleteMany();

  await Job.insertMany([
    {
      title: "Electrician Needed",
      description: "Work at construction site",
      location: "Jamshedpur",
      salary: "500/day",
      skillsRequired: ["electrician"],
    },
    {
      title: "Plumber Required",
      description: "Fix pipelines",
      location: "Jamshedpur",
      salary: "400/day",
      skillsRequired: ["plumber"],
    },
  ]);

  console.log("Data Seeded");
  process.exit();
};

seedJobs();