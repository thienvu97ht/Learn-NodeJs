// import from libs
const router = require("express-promise-router")();

// import from project
const UserController = require("../controllers/user");

router.route("/").get(UserController.index).post(UserController.newUser);

router
  .route("/:userID")
  .get(UserController.getUser)
  .put(UserController.replaceUser)
  .patch(UserController.updateUser);

module.exports = router;
