const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  totalPrice: {
    type: Sequelize.FLOAT,
    defaultValue: 0.00
  }
});

module.exports = Cart;
