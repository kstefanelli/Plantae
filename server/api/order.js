const router = require("express").Router();
const {
  models: { User, Product, CartItem, Order },
} = require("../db");
const { requireToken, isAdmin, isUser, isUserOrAdmin } = require("./middlewares");

//all orders for admins//working
router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

//Fetch all orders(order history) for a specific user
router.get("/:userId", requireToken, isUserOrAdmin, async (req, res, next) => {
  try {
      const orders = await Order.findAll({
        where: {
          userId: req.params.userId,
        },
        include: [
          {
            model: Product,
          },
        ],
      });
      res.json(orders);
  } catch (err) {
    next(err);
  }
});

//Get current order, if there's no order with active cart status, create a new order
router.get("/currentOrder/:userId", requireToken, isUser, async (req, res, next) => {
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
    if (order){
        res.json(order)
    } else {
        const newOrder = await Order.create();
        res.json(newOrder);
    }
   ;
  } catch (err) {
    next(err);
  }
});

//finds proper order, gets the cartitem that matches the product id, if the item doesn't exist it makes one, if not it updates it
router.put('/:orderId/:userId', async (req, res, next) => {
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
console.log(req.body.body.productId)
    const item = await CartItem.findOne({
      where: {
        orderId: order.id,
        productId: req.body.body.productId
      }

    })
      if (item) {
        await item.update(req.body)
      } else {
        req.body.body.orderId = order.id
        await CartItem.create(req.body.body)
      }

    res.json(order)
  } catch (error) {
      next(error)
    }
})

router.put("/checkout/:orderId/:userId", async (req, res, next) => {
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
    const items = await CartItem.findAll({
      where: {
        orderId: order.id
      }
    })
    items.map(async (item) => {
      let product = await Product.findOne({
        where: {
          id: item.productId
        }
      });
      await product.update({
        inventory: product.inventory - item.quantity
      })
      await item.update({
        priceAtCheckout: product.price,
      })
    })

    res.json(await order.update({
      orderStatus: "FULFILLED"
    }))
  } catch (error) {
    next(error)
  }
})

//delete items in current order - only for matching user access
// /api/order/:userId/:cartItemId
router.delete(
  "/:userId/:cartItemId",
  requireToken,
  isUser,
  async (req, res, next) => {
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
      const item = await CartItem.findOne({
        where: {
          orderId: order.id,
          productId: req.body.productId
        }
      })
      await item.destroy();
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
