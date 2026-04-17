import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    location: String,
    salary: String,
    skillsRequired: [String],
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);