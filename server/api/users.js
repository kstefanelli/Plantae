const router = require("express").Router();
const {
  requireToken,
  isAdmin,
  isUser,
  isUserOrAdmin,
} = require("./middlewares");
const User = require("../db/models/User");

module.exports = router;

//Get all the users - only for admin access
// /api/users/
router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//Get individual user account details - only for matching user and admin access
// /api/users/:userId
router.get("/:userId", requireToken, isUserOrAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: ["id", "username", "email"],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//Delete user - admin only
// /api/users/:userId
router.delete("/:userId", requireToken, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    await user.destroy();
    res.send(user);
  } catch (err) {
    next(err);
  }
});
