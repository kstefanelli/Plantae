const router = require("express").Router();
const {
  models: { User, Order, CartItem },
} = require("../db");

module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (!req.user.userType === "ADMIN") {
      throw new Error("You are not an Admin!");
    }
    next();
  } catch (error) {
    next(error);
  }
};

const isUser = (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      throw new Error("Unauthorized!");
    }
    next();
  } catch (error) {
    next(error);
  }
};

///////////////////////////////(BELOW) PURELY USERS ROUTES. NOT ORDER INFO.//////////////////////////////
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
router.get(
  "/:userId",
  requireToken,
  isAdmin,
  isUser,
  async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.userId, {
        attributes: ["id", "username", "email"],
      });
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

// //Add/POST user - creating a new user
// // /api/users/
// router.post("/", async (req, res, next) => {
//   try {
//     res.status(201).json(await User.create(req.body));
//   } catch (err) {
//     next(err);
//   }
// });

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
