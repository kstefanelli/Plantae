const router = require("express").Router();
const Order = require("../db/models/Order");
const CartItem = require("../db/models/CartItem");
const User = require("../db/models/User");
const Product = require("../db/models/Product");
//this route needs to be secure to specific user if there is a user, if guest should create a new empty order?

//updates the order with the product that was selected, capture the product id, attach that to the cartitem from the front end and create
// that then dispatches an update order route, that then accesses the database and creates a new cartitem with the orderid and the productid,
// sends back new order page with new cart item and all cart items included

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
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

/////////////////^middleware////////////////

//all orders for admins//working
router.get("/", requireToken, async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

//working
router.get("/:userId", requireToken, isUser, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
      },
      include: [
        {
          model: Product,
        },
      ],
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.post("/:userId", async (req, res, next) => {
  try {
    const newOrder = await Order.create();
    res.json(newOrder);
  } catch (err) {
    next(err);
  }
});

// //look at specific order details, for logged in user or admin only
// router.get("/:orderId", async (req, res, next) => {
//   try {
//     const specificOrder = Order.findOne({
//       where: {
//         orderId: req.params.orderId
//       }
//     })
//     res.send(specificOrder)
//   } catch (err) {
//     next(err);
//   }
// });

//Get individual user current order details  - only for matching user and admin access
// /api/users/:userId/order

//test once we deploy
//Update individual user current order  - only for matching user access, changing quantity
// /api/users/:userId/order
router.put("/:userId", requireToken, isUser, async (req, res, next) => {
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
router.delete(
  "/:userId/:cartItemId",
  requireToken,
  isUser,
  async (req, res, next) => {
    try {
      const order = await Order.findOne({
        where: {
          userId: req.params.userId,
        },
      });
      const item = await CartItem.findByPk(req.params.cartItemId);
      await item.destroy();
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
