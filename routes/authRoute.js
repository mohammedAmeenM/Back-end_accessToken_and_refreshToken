const express = require("express");
const authController = require("../controllers/authContoller");
const authRouter = express.Router();

authRouter
  .post("/register", authController.createUser)
  .post("/login", authController.loginUser)
  .post("/refresh-token", authController.refreshAccessToken)
  .post("/logout", authController.logoutUser);

module.exports = authRouter;
