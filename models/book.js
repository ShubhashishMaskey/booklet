const mongoose = require("mongoose");
const Joi = require("joi");

const bookSchema = new mongoose.Schema({
  bookName: { type: String, lowercase: true },
  author: { type: String, lowercase: true },
  isbn: { type: String },
  description: { type: String, lowercase: true },
  publishedDate: { type: Date },
  createdDate: { type: Date, default: Date.now }
});

bookValidator = bookDetail => {
  schema = {
    bookName: Joi.string().required(),
    author: Joi.string().required(),
    isbn: Joi.string().required(),
    description: Joi.string().required(),
    publishedDate: Joi.date()
  };
  return Joi.validate(bookDetail, schema);
};

const Book = mongoose.model("Book", bookSchema);
module.exports = { bookValidator, Book };
