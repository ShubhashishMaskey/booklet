const experss = require("express");
const router = experss.Router();
const _ = require("lodash");
const auth = require("../middleware/auth");
const {
  borrowSchemaValidator,
  BookBorrowed
} = require("../models/book-borrow");
const { User } = require("../models/user");
const { Book } = require("../models/book");

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).populate("BookBorrowed");
  res.send(user.borrowedBook);
});

router.get("/:id", auth, async (req, res) => {
  const bookBorrowed = await BookBorrowed.findOne({
    user: req.user.id,
    _id: req.params.id
  });

  res.status(200).send(bookBorrowed);
});

router.post("/:id/:userId", async (req, res) => {
  const { error } = borrowSchemaValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const book = await Book.findOne({
    _id: req.params.id
  });
  const user = await User.findOne({
    _id: req.params.userId
  });

  const payload = {
    ...req.body,
    user: user._id,
    borrowedBook: book._id
  };
  bookBorrowed = new BookBorrowed(payload);
  
  const userBorrowedBooks = user.borrowedBook;
  userBorrowedBooks.push(book.id);

  await bookBorrowed.save();
  await user.save();

  res.status(201).send({success: true, message: "Book was borrowed.", borrow: bookBorrowed});
});

module.exports = router;
