const mongoose = require("mongoose");

const inspectionReportSchema = new mongoose.Schema(
  {
    customer: String,
    partNumber: String,
    partDescription: String,
    inspectionDate: Date,
    shift: String,
    dimensions: {
      totalLength: { spec: Number, actual: Number },
      width1: { spec: Number, actual: Number },
      width2: { spec: Number, actual: Number },
    },
    visualObservation: String,
    remarks: String,
    qa: String,
    reviewedBy: String,
    approvedBy: String,
  },
  { timestamps: true }
);

const model = mongoose.model("InspectionReport", inspectionReportSchema)
module.exports = model;
