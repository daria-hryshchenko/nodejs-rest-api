const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("./../models/user");
const { ctrlWrapper, HttpError } = require("./../helpers");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email alreary in use");
  }

  const hasPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hasPassword });
  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompaire = await bcrypt.compare(password, user.password);
  if (!passwordCompaire) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user.id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
  });
};

const getCurrent = async (req, res) => {
  const { email, name } = req.user;
  res.json({ email, name });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({
    message: "You have been logged out",
  });
};

const getSubscription = async (req, res) => {
  const { subscription } = req.params;
  console.log(subscription);
  console.log(req.params);
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  getSubscription: ctrlWrapper(getSubscription),
};
