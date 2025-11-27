const express = require("express");
const {
  createSubscriber,
  subscriberList,
  DeleteSubscriber,
  GetSubscriberById,
} = require("../controllers/subscribe-controller");
const subscrieRouter = express.Router();

// const authMiddleware = require("../Middleware/authMiddleware");

subscrieRouter.post("/CreateSubscriber", createSubscriber);
subscrieRouter.get("/SubscriberList", subscriberList);
subscrieRouter.delete("/SubscriberDelete", DeleteSubscriber);
subscrieRouter.get("/Subscriber/:id", GetSubscriberById);

module.exports = subscrieRouter;
