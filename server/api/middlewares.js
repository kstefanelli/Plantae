const User = require("../db/models/User");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (req.user.userType !== "ADMIN") {
      throw new Error("You are not an Admin!");
    }
    next();
  } catch (error) {
    next(error);
  }
};

const isUser = (req, res, next) => {
  try {
    if (req.user.dataValues.id !== parseInt(req.params.userId)) {
      throw new Error("Unauthorized!");
    }
    next();
  } catch (error) {
    next(error);
  }
};

const isUserOrAdmin = (req, res, next) => {
  try {
    if (
      req.user.dataValues.id !== parseInt(req.params.userId) &&
      req.user.userType !== "ADMIN"
    ) {
      throw new Error("Unauthorized!");
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { requireToken, isAdmin, isUser, isUserOrAdmin };
