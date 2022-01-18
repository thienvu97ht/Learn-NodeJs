// import from libs
const router = require("express-promise-router")();

const { route } = require("express/lib/router");
// import from project
const UserController = require("../controllers/user");
const { validateParam, schemas } = require("../helpers/routerHelpers");

router.route("/").get(UserController.index).post(UserController.newUser);

router
  .route("/:userID")
  .get(validateParam(schemas.idSchema, "userID"), UserController.getUser)
  .put(UserController.replaceUser)
  .patch(UserController.updateUser);

router
  .route("/:userID/decks")
  .get(UserController.getUserDesks)
  .post(UserController.newUserDesks);

module.exports = router;
