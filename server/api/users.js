const router = require("express").Router();
const {
  models: { User, Cart },
} = require("../db");
module.exports = router;

//Get all the user info for the admin
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

//Get individual user account details
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

//Get individual user cart details
router.get("/:userId/cart", async (req, res, next) => {
  try {
    const usersCart = await Cart.findAll({
      where: { userId: req.params.userId },
    });
  } catch (err) {
    next(err);
  }
});

// //Update individual user cart total
// router.put("/:userId/cart", async (req, res, next) => {
//   try {
//     const usersCart = await Cart.update({
//       where: { userId: req.params.userId },
//     });
//   } catch (err) {
//     next(err);
//   }
// });

//Add/POST user
//need to add something to allow an admin user
//for now everyone created is a customer
router.post("/", async (req, res, next) => {
  try {
    res.status(201).json(await User.create(req.body));
  } catch (err) {
    next(err);
  }
});

//eventually we want admin to delete/edit, user to edit/delete
