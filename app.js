//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const Joi = require("joi");
const http = require("http");
const { func } = require("joi");
const helmet = require("helmet");
const morgan = require("morgan");
const employees = require("./employees/employess");
const { error } = require("console");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use("/api/employees", employees);
app.use(helmet());
app.use(morgan("tiny"));

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose
  .connect("mongodb://localhost:27017/mycompany", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:true
  })
  .then(() => console.log(" Connected to DB"))
  .catch(console.error(" Failed DB" + error));
app.get("/", (req, res) => {
  res.send(Employees);
});
const port = process.env.PORT || 3000;
app.listen(3000, function () {
  console.log(`Server started on port ${port}`);
});

