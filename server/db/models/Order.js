const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  orderStatus: {
    type: Sequelize.ENUM('FULFILLED', 'ACTIVE CART'),
    defaultValue: 'ACTIVE CART'
  }
});

module.exports = Order;


//added orderNumber, changed float to integer, changed default value, added orderStatus and default value for orderstatus, deleted order number
