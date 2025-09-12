const express = require("express")
const {createReport} = require('../controller/report.controller')
const router = express.Router();


router.post('/create',createReport)

module.exports = router;