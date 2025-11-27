const express = require("express");
const { login } = require("../controllers/auth-controller");
const authRouter = express.Router();


// const authMiddleware = require("../Middleware/authMiddleware");

authRouter.post("/login", login);
module.exports = authRouter;
