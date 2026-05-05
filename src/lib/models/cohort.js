import mongoose from "mongoose";

// Must match IDs in lib/packages.js
const VALID_PACKAGE_IDS = ["js", "node", "react", "nextjs", "reactnative", "electron", "fullstack"];

const CohortSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    packageIds: { type: [String], enum: VALID_PACKAGE_IDS, default: [] },
    startDate:           { type: Date, required: true },
    endDate:             { type: Date, required: true },
    enrollmentDeadline:  { type: Date, required: true },
    maxSeats:      { type: Number, default: 30 },
    enrolledCount: { type: Number, default: 0  },
    status: {
      type: String,
      enum: ["upcoming", "active", "completed", "cancelled"],
      default: "upcoming",
    },
    classFormat: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      default: "hybrid",
    },
    notes:    { type: String, default: "" },
    isPublic: { type: Boolean, default: true },
  },
  { timestamps: true }
);

CohortSchema.virtual("seatsRemaining").get(function () {
  return Math.max(0, this.maxSeats - this.enrolledCount);
});

CohortSchema.set("toJSON",   { virtuals: true });
CohortSchema.set("toObject", { virtuals: true });

export default mongoose.models.Cohort || mongoose.model("Cohort", CohortSchema);