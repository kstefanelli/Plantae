const router = require("express").Router();
const {
  models: { User, Order, CartItem },
} = require("../db");

module.exports = router;

///////////////////////////////(BELOW) PURELY USERS ROUTES. NOT ORDER INFO.//////////////////////////////
//Get all the users - only for admin access
// /api/users/
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//Get individual user account details - only for matching user and admin access
// /api/users/:userId
router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: ["id", "username", "email"],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//Add/POST user - creating a new user
// /api/users/
router.post("/", async (req, res, next) => {
  try {
    res.status(201).json(await User.create(req.body));
  } catch (err) {
    next(err);
  }
});

//Delete user - admin only
// /api/users/:userId
router.delete("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    await user.destroy();
    res.send(user);
  } catch (err) {
    next(err);
  }
});
