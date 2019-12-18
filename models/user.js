const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

//Database table model for user.
const userSchema = new mongoose.Schema({
  firstname: { type: String, trim: true },
  lastname: { type: String, trim: true },
  username: { type: String, trim: true },
  password: { type: String, trim: true },
  phone: { type: Number },
  address: { type: String, lowercase: true },
  postalCode: { type: String, lowercase: true },
  borrowedBook: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }]
});

userSchema.methods.generateAuthToken = function() {
  const expireTime = Date.now() + 900000;
  const token = jwt.sign(
    {
      id: this.id,
      username: this.username,
      expireTime: expireTime
    },
    "jwtbooklet"
  );
  return token;
};

validateUser = user => {
  const schema = {
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string()
      .min(3)
      .max(255)
      .required(),

    password: Joi.string()
      .min(3)
      .max(1024)
      .required(),
    phone: Joi.number(),
    address: Joi.string(),
    postalCode: Joi.string()
  };
  return Joi.validate(user, schema);
};

const User = mongoose.model("User", userSchema);
module.exports = { userSchema, validateUser, User };
