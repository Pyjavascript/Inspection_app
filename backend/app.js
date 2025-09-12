const express = require('express');
const reportRoute = require('./routes/report.route');
const { default: mongoose } = require('mongoose');
const app = express();
const cors = require('cors');
app.use(cors())
require("dotenv").config()


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Mongo DB is connected"))
.catch(e => console.log("Mongo DB error ",e))

app.use(express.json())
app.use("/api/report",reportRoute)


module.exports = app;