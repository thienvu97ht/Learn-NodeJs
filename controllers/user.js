/**
 * We cant interact with mongoose in thee different ways:
 *  [x] Callback
 *  [x] Promise
 *  [x] Async/await (Promises)
 */

const Deck = require("../model/Deck");
const User = require("../model/User");

const getUser = async (req, res, next) => {
  const { userID } = req.params;
  const user = await User.findById(userID);
  return res.status(200).json({ user });
};

const getUserDesks = async (req, res, next) => {
  const { userID } = req.params;

  const user = await User.findById(userID).populate("decks");

  return res.status(200).json({ decks: user.decks });
};

const index = async (req, res, next) => {
  const users = await User.find();
  return res.status(200).json({ users });
};

const newUser = async (req, res, next) => {
  const newUser = new User(req.body);
  await newUser.save();
  return res.status(201).json({ newUser });
};

const newUserDesks = async (req, res, next) => {
  const { userID } = req.params;

  // Tạo ra một desk mới
  const newDeck = new Deck(req.body);

  // Lấy thông tin user
  const user = await User.findById(userID);

  // Gán user vào cho desk
  newDeck.owner = user;

  // Lưu deck vào database
  await newDeck.save();

  // Thêm desk vào mảng desks của user
  user.decks.push(newDeck._id);

  // Lưu user lại sau khi thêm desk vào
  await user.save();

  return res.status(201).json({ deck: newDeck });
};
const replaceUser = async (req, res, next) => {
  // thay thế toàn bộ các trường
  const { userID } = req.params;
  const newUser = req.body;
  const result = await User.findByIdAndUpdate(userID, newUser);
  return res.status(200).json({ success: true });
};

const updateUser = async (req, res, next) => {
  // thay thế một hoặc nhiều trường
  const { userID } = req.params;
  const newUser = req.body;
  const result = await User.findByIdAndUpdate(userID, newUser);
  return res.status(200).json({ success: true });
};

module.exports = {
  index,
  newUser,
  getUser,
  replaceUser,
  updateUser,
  getUserDesks,
  newUserDesks,
};
