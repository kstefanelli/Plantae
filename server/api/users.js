const router = require("express").Router();
const {
  models: { User, Cart, CartItem },
} = require("../db");
const Product = require("../db/models/Product");
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

// User.findAll({
//   where: {
//     '$Instruments.size$': { [Op.ne]: 'small' }
//   },
//   include: [{
//     model: Tool,
//     as: 'Instruments'
//   }]
// });

//Get individual user cart details
router.get("/:userId/cart", async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.params.userId
      }});

      const items = await CartItem.findAll({
        where: {
          cartId: cart.id
        }
      })

    console.log("THESE ARE OUR ITEMS", items)
    res.json(items)
  } catch (err) {
    next(err);
  }
});

// //Update individual user cart
// router.put("/:userId/cart", async (req, res, next) => {
//   try {
//     const usersCart = await Cart.findOne({
//       where: {
//         userId: req.params.userId,

//       },
//     });
//     res.json(await usersCart.update(req.body));
//   } catch (err) {
//     next(err);
//   }
// });

// //update quantity of cart item in the cart
// router.put("/:userId/cart", async (req, res, next) => {
//   try {
//     const usersCart = await Cart.findOne({
//       where: { userId: req.params.userId },
//     });
//     res.json(await usersCart.update(req.body));
//   } catch (err) {
//     next(err);
//   }
// });

//if cart item quanity is 0, delete item

// router.delete();

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
