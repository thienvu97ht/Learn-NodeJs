/**
 * We cant interact with mongoose in thee diffirent ways:
 *  [x] Callback
 *  [x] Promise
 *  [x] Async/await (Promises)
 */

const User = require("../model/User");

const index = (req, res, next) => {
  // Promise way
  User.find()
    .then((users) => {
      return res.status(200).json({ users });
    })
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  const newUser = new User(req.body);

  newUser
    .save()
    .then((user) => {
      return res.status(201).json({ user });
    })
    .catch((err) => next(err));
};

module.exports = {
  index,
  createUser,
};
