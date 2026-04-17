import mongoose from "mongoose";

const pulseSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    type: {
      type: String,
      enum: ["alert", "news", "opportunity"],
    },
    location: String,
  },
  { timestamps: true }
);

export default mongoose.model("Pulse", pulseSchema);