const experss = require("express");
const router = experss.Router();
const _ = require("lodash");
const { bookValidator, Book } = require("../models/book");

router.get("/", async (req, res) => {
  const book = await Book.find(req.body.id).populate("Book");
  res.send({ books: book });
});

router.get("/:id", async (req, res) => {
  const book = await Book.findOne({
    _id: req.params.id
  });

  res.status(200).send(book);
});

router.post("/", async (req, res) => {
  const { error } = bookValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const payload = {
    ...req.body
  };
  book = new Book(payload);

  await book.save();

  res
    .status(201)
    .send({ success: true, message: "Book's Detail was added Successfully." });
});

module.exports = router;
