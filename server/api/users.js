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
/////////////////////////////(ABOVE) PURELY USERS ROUTES. NOT ORDER INFO.///////////////////////////////////

/////////////////////////////////(BELOW) API route Links to order API routes///////////////////////////////
// /api/users/order
router.use("/order", require("./order"));
//I think we can just move the stuff below into orders and not put this route above^. we don't need them here since we can probably reference the userId elsewhere anyway.
/////////////////////////////////(ABOVE)API route Links to order API routes////////////////////////////////

/////////////////////////(BELOW) STUFF FOR ORDERS//////////////////////////////////////////////////////////
//Get individual user current order details  - only for matching user and admin access
// /api/users/:userId/order
router.get("/:userId/order", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
      },
    });

    const items = await CartItem.findAll({
      where: {
        orderId: order.id,
      },
    });

    res.json(items);
  } catch (err) {
    next(err);
  }
});

//Update individual user current order  - only for matching user access
// /api/users/:userId/order
router.put("/:userId/order", async (req, res, next) => {
  try {
    const usersCurrentOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
      },
    });
    res.json(await usersCurrentOrder.update(req.body));
  } catch (err) {
    next(err);
  }
});

//delete items in current order - only for matching user access
// /api/users/:userId/order/:cartItemId
router.delete("/:userId/order/:cartItemId", async (req, res, next) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.cartItemId);
    await cartItem.destroy();
    res.send(cartItem);
  } catch (err) {
    next(err);
  }
});
