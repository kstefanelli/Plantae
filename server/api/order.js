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

// //Gets all the users orders //for admin and matching user
// router.get("/:userId", requireToken, async (req, res, next) => {
//   try {
//     if (isUser || isAdmin) {
//       const order = await Order.findOne({
//         where: {
//           userId: req.params.userId,
//         },
//         include: [
//           {
//             model: Product,
//           },
//         ],
//       });
//       res.json(order);
//     }
//   } catch (err) {
//     next(err);
//   }
// });

//Get single order by ID
router.get("/:userId/:orderId", requireToken, async (req, res, next) => {
  try {
    if (isUser || isAdmin) {
      const order = await Order.findOne({
        where: {
          id: req.params.orderId,
        },
        include: [
          {
            model: Product,
          },
        ],
      });
      res.send(order);
    }
  } catch (err) {
    next(err);
  }
});

//Get current order
router.get("/currentOrder/:userId", requireToken, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        orderStatus: "ACTIVE CART",
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
// /api/order/:userId
router.put("/:id", requireToken, isUser, async (req, res, next) => {
  try {
    const usersCurrentOrder = await Order.findOne({
      where: {
        userId: req.params.id,
      },
    });
    res.json(await usersCurrentOrder.update(req.body));
  } catch (err) {
    next(err);
  }
});

//delete items in current order - only for matching user access
// /api/order/:userId/:cartItemId
router.delete(
  "/:id/:cartItemId",
  requireToken,
  isUser,
  async (req, res, next) => {
    try {
      const order = await Order.findOne({
        where: {
          userId: req.params.id,
          orderStatus: "ACTIVE CART",
        },
        include: [
          {
            model: Product,
          },
        ],
      });
      const item = await CartItem.findByPk(req.params.cartItemId);
      await item.destroy();
      res.send(item).status(200);
    } catch (err) {
      next(err);
    }
  }
);

// const order = await Order.findOne({
//   where: {
//     userId: req.params.userId,
//     orderStatus: "ACTIVE CART",
//   },
//   include: [
//     {
//       model: Product,
//     },
//   ],
// });

module.exports = router;
