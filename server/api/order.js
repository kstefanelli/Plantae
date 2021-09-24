const router = require("express").Router();
const {
  models: { User, Product, CartItem, Order },
} = require("../db");
const { requireToken, isAdmin, isUser } = require("./middlewares");

//all orders for admins//working
router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

//working //need to add back isUser
router.get("/:userId", requireToken, async (req, res, next) => {
  //conditional either match id or admin
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
