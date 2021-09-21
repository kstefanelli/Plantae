const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  orderNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  total: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0.00
    }
}
})

module.exports = Order
