const { Router } = require("express");
const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
// const Joi = require("joi");
const {
  Employee,
  employPutVadlilation,
  employVadlilation,
} = require("../model/employee");

router.get("/", async (req, res) => {
  const employees = await Employee.find().sort("name");
  res.send(employees);
});

router.get("/:id", async (req, res) => {
  const findEmployee = await Employee.findById(req.params.id);
  if (!findEmployee) {
    res.status(404).send("this employee is not found");
  }
  res.send(findEmployee);
});

router.post("/", async (req, res) => {
  const { error } = employVadlilation(req.body);

  if (error) {
    return res.send(error.details[0].message);
  }
  const employee = new Employee({
    fullName: req.body.fullName,
    salary: req.body.salary,
  });
  await employee.save();

  res.send(employee);
});

router.put("/:id", async (req, res) => {
  const { error } = employPutVadlilation(req.body);

  if (error) {
    return res.send(error.details[0].message);
  }
  const employee = await Employee.findByIdAndUpdate(
    req.params.id,
    { fullName: req.body.fullName },
    { new: true }
  );
  if (!employee) {
    return res.status(404).send("ivalid ID");
  }

  res.send(employee);
});

router.delete("/:id", async (req, res) => {
  //   const { error } = employPutVadlilation(req.body);

  const findEmployee = await Employee.findOneAndRemove();
  if (!findEmployee) {
    return res.status(404).send("this employee is not found !");
  }

  res.send(findEmployee);
});

module.exports = router;
