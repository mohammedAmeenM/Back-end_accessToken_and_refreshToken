const express = require("express");
const userController = require("../controllers/userController");
const authToken = require("../middlewares/authMiddleware");
const userRouter = express.Router();

userRouter.get("/", authToken, userController.userAccess);

module.exports = userRouter;
