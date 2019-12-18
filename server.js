const express = require("express");
const app = express();
const path = require("path");
const DBCONN = require("./config/db");
const login = require("./routes/auth/login");
const register = require("./routes/auth/register");
const bookBorrow = require("./routes/book-borrow");
const book = require("./routes/book");
const middleware = require("./middleware/middleware");

const PORT = process.env.PORT || 5000;

middleware(express, app);
//API
app.use("/api/login", login);
app.use("/api/user", register);
app.use("/api/book_borrow", bookBorrow);
app.use("/api/book", book);

//connecting to database
DBCONN();

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("App is served on port : " + PORT);
});
