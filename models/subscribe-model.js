const mongoose = require("mongoose");
const subscriberSchema = new mongoose.Schema(
  {
    

    email: {
      type: String,
      required: true,
    },
   
  },
  {
    timestamps: true,
  }
);

const Subscribers = mongoose.model("Subscribers", subscriberSchema);

module.exports = Subscribers;
