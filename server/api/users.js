const router = require("express").Router();
const {
  models: { User, Cart, CartItem, Product },
} = require("../db");

module.exports = router;

//need to update cart to order

//////////THIS SECTION IS PURELY USERS ROUTES. NOT ORDER INFO.//////////////////////
//Get all the users - only for admin access
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
router.post("/", async (req, res, next) => {
  try {
    res.status(201).json(await User.create(req.body));
  } catch (err) {
    next(err);
  }
});

//Delete user - admin only
router.delete("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    await user.destroy();
    res.send(user);
  } catch (err) {
    next(err);
  }
});
/////////////////////////////ABOVE SECTION IS PURELY USERS ROUTES. NOT ORDER INFO.///////////////////////////////////

/////////////////////////SECTION BELOW IS STUFF FOR ORDERS/////////////////////////////////////
//Get individual user order details  - only for matching user and admin access
router.get("/:userId/cart", async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.params.userId,
      },
    });

    const items = await CartItem.findAll({
      where: {
        cartId: cart.id,
      },
    });

    res.json(items);
  } catch (err) {
    next(err);
  }
});

//Update individual user order  - only for matching user and admin access
router.put("/:userId/cart", async (req, res, next) => {
  try {
    const usersCart = await Cart.findOne({
      where: {
        userId: req.params.userId,
      },
    });
    res.json(await usersCart.update(req.body));
  } catch (err) {
    next(err);
  }
});

//if cart item quanity is 0, delete item
router.delete("/:userId/cart/:cartItemId", async (req, res, next) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.cartItemId);
    await cartItem.destroy();
    res.send(cartItem);
  } catch (err) {
    next(err);
  }
});
