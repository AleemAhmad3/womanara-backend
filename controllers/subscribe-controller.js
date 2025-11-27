
const Subscribers = require("../models/subscribe-model");
const sendEmailToCompany = require("../utils/email-verfication");

const createSubscriber = async (req, res) => {
  const { email  } = req.body;
  const missingFields = [];

  if (!email) {
    missingFields.push({ name: "email", message: "Email field is required" });
  } else if (!email.includes("@")) {
    missingFields.push({ name: "email", message: "Email must contain @" });
  }
  
  if (missingFields.length > 0) {
    return res.status(400).json({
      status: 400,
      message: "Some fields are missing!",
      missingFields,
    });
  }

  try {
    const SubscribersCreated = await Subscribers.create({
      email,
    });

    // Send notification email
    // sendEmailToCompany({ email, name, phone, subject, message }, res);

    if (!SubscribersCreated) {
      return res.status(500).json({
        status: 500,
        message: "Failed to subscribed",
      });
    }

    return res.status(201).json({
      status: 201,
      message: "Subscribed  successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
const subscriberList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const totalSubscribers = await Subscribers.countDocuments();

    const Subscribers = await Subscribers.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    return res.status(200).json({
      status: 200,
      message: "Subscribers fetched successfully",
      Subscribers,
      totalSubscribers,
      totalPages: Math.ceil(totalSubscribers / limit), // Fixed typo
      currentPage: page,
      limit,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

const GetSubscriberById = async (req, res) => {
  try {
    const { id } = req.params; // Get lead ID from request parameters

    const lead = await Subscribers.findById(id);

    if (!lead) {
      return res.status(404).json({
        status: 404,
        message: "Subscriber not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Subscriber fetched successfully",
      lead,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

const DeleteSubscriber = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({status: 400, message: "Invalid request. Provide Subscriber IDs." });
    }

    // ✅ Check if Subscribers exist before deleting
    const existingSubscribers = await Subscribers.find({ _id: { $in: ids } });

    if (existingSubscribers.length === 0) {
      return res.status(404).json({status: 400, message: "No subscriber found with the given IDs." });
    }

    // ✅ Delete Subscribers
    await Subscribers.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      status: 200,
      message: "Subscribers deleted successfully.",
      deletedSubscribers: ids
    });

  } catch (error) {
    console.error("Error deleting Subscribers:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


module.exports = {
  createSubscriber,
  subscriberList,
  GetSubscriberById,
  DeleteSubscriber
};