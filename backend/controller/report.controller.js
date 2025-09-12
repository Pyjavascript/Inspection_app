const ReportModel = require("../models/Inspection.schema");

const createReport = async (req, res) => {
  try {
    const {
      customer,
      partNumber,
      partDescription,
      inspectionDate,
      shift,
      dimensions,
      visualObservation,
      remarks,
      qa,
      reviewedBy,
      approvedBy,
    } = req.body;

    const report = await ReportModel.create({
      customer,
      partNumber,
      partDescription,
      inspectionDate,
      shift,
      dimensions,
      visualObservation,
      remarks,
      qa,
      reviewedBy,
      approvedBy,
    });
    res.status(201).json({ message: "report created ", report });
  } catch (e) {
    console.log("Error in creating report ", e);
  }
};

module.exports = {
  createReport,
};
