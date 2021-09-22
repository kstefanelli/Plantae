const router = require("express").Router();
const Order = require("../db/models/Order");
const CartItem = require('../db/models/CartItem')

//this route needs to be secure to specific user if there is a user, if guest should create a new empty order?

//updates the order with the product that was selected, capture the product id, attach that to the cartitem from the front end and create
// that then dispatches an update order route, that then accesses the database and creates a new cartitem with the orderid and the productid,
// sends back new order page with new cart item and all cart items included

router.get("/", async (req, res, next) => {
  try {
    const currentOrder = Order.findOne({
      where: {
        orderStatus: 'ACTIVE CART'
      },
      include: {
        model: CartItem
      }
      //need to test
    })
    if(!currentOrder){
      const newOrder  = Order.create()
      res.send(newOrder)
    } else {
      res.send(currentOrder)
    }
  } catch (err) {
    next(err);
  }
});

//all orders for admins
router.get('/allOrders', async (req,res,next) => {
  try {
    const orders = Order.findAll();
    res.send(orders)
  } catch (err) {
    next(err)
  }
})

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

  ________
  //Get individual user current order details  - only for matching user and admin access
// /api/users/:userId/order
  router.get("/:userId", async (req, res, next) => {
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
      res.send(items)
    } catch(err){
      next(err)
    }
  })

  //Update individual user current order  - only for matching user access, changing quantity
  // /api/users/:userId/order
  router.put("/:userId", async (req, res, next) => {
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
  router.delete("/:userId/:cartItemId", async (req, res, next) => {
      try {
        const order = await Order.findOne({
          where: {
            userId: req.params.userId,
          },
        });
        const item = await CartItem.findByPk(req.params.cartItemId)
        await item.destroy()
        res.sendStatus(200)
        }
      catch(err){
        next(err)
      }
    })

module.exports = router;
