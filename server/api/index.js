const router = require("express").Router();
module.exports = router;

//ADDED API ROUTES
router.use("/users", require("./users"));
router.use("/order", require("./order"));
router.use("/products", require("./product"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
