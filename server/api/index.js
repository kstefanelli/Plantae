const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));

//ADDED API ROUTES
router.use("/cart", require("./cart"));
router.use("/order", require("./order"));
router.use("/product", require("./product"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
