const mongoose = require("mongoose");
const Joi = require("joi");

const borrowSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  borrowedBook: {
    type: mongoose.Schema.ObjectId,
    ref: "Book",
    required: true
  },
  borrowedDate: { type: Date, default: Date.now },
  returnedDate: { type: Date }
});

borrowSchemaValidator = borrowDetail => {
  schema = {
    returnedDate: Joi.date()
  };
  return Joi.validate(borrowDetail, schema);
};

const BookBorrowed = mongoose.model("BookBorrowed", borrowSchema);
module.exports = { borrowSchemaValidator, borrowSchema, BookBorrowed };
