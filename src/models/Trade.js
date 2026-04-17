import mongoose from "mongoose";

const tradeSchema = new mongoose.Schema(
  {
    name: String, // electrician, plumber
    description: String,
    averageRate: String,
  },
  { timestamps: true }
);

export default mongoose.model("Trade", tradeSchema);