const router = require("express").Router();
const Product = require("../db/models/Product");
const { requireToken, isAdmin } = require("./middlewares");

router.get("/", async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({
      //add conditional isAdmin to show complete product details
      //need to figure out how to let admin get all the info
      attributes: ["id", "name", "description", "price", "imageURL"],
    });
    res.json(allProducts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id, {
      attributes: ["id", "name", "description", "price", "imageURL"],
    });
    res.json(singleProduct);
  } catch (error) {
    next(error);
  }
});

//admin only - add products
router.post("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    res.status(201).json(await Product.create(req.body));
  } catch (error) {
    next(error);
  }
});

//admin only - edit products
router.put("/:id", requireToken, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(await product.update(req.body));
  } catch (error) {
    next(error);
  }
});

//admin only - remove products
router.delete("/:id", requireToken, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
