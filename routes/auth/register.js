const experss = require("express");
const router = experss.Router();
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { validateUser, User } = require("../../models/user");
const auth = require("../../middleware/auth");

router.get("/", auth, async (req, res) => {
  //playground();
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).send("User Not Found");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ username: req.body.username });
  if (user) {
    return res.status(409).send({duplicate: true, message: "Username already registered."});
  }

  const payloadForDataBase = _.pick(req.body, [
    "firstname",
    "lastname",
    "username",
    "password",
    "phone",
    "address",
    "postalCode"
  ]);

  user = new User(payloadForDataBase);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken();
  const payload = _.pick(user, ["id", "username"]);
  payload.token = token;

  res.status(201).send({success: true, message: "Registration Successful." });
});

module.exports = router;
