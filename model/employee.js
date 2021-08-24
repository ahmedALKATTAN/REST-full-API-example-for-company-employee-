const mongoose = require("mongoose");
const Joi = require("joi");

const Employee = mongoose.model(
  "Employee",
  new mongoose.Schema({
    fullName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 44,
    },
    salary: { type: Number, required: true },
  })
);

function employVadlilation(employee) {
  const Schema = Joi.object().keys({
    // id: Joi.number().integer().required(),
    fullName: Joi.string().min(3).required(),
    salary: Joi.number().integer().required(),
  });

  return Schema.validate(employee);
}

function employPutVadlilation(employee) {
  const Schema = Joi.object().keys({
    fullName: Joi.string().min(3).required(),
  });

  return Schema.validate(employee);
}

exports.Employee = Employee;
exports.employPutVadlilation = employPutVadlilation;
exports.employVadlilation = employVadlilation;
