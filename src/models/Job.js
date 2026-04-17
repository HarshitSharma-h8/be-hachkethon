import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const jobSchema = new mongoose.Schema(
  {
    title: String,

    description: String,

    location: String,

    budget: Number,

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    applications: [applicationSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
