const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const morgan = require("morgan");
require('dotenv').config();
const { readdirSync } = require("fs");
const connectDB = require("./config/db.js")

const app = express();
connectDB();

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(cors());

readdirSync("./routes").map((r) =>
  app.use("/api", require("./routes/" + r))
);

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server is runing at port ${PORT}`));
