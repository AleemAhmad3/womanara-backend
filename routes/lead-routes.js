const express = require("express");
const { CreateLeads, LeadsList, DeleteLeads, GetLeadById } = require("../controllers/lead-controller");
const leadRouter = express.Router();


// const authMiddleware = require("../Middleware/authMiddleware");

leadRouter.post("/CreateLeads", CreateLeads);
leadRouter.get("/LeadsList",  LeadsList);
leadRouter.delete("/leadsDelete",  DeleteLeads);
leadRouter.get("/Lead/:id", GetLeadById);

module.exports = leadRouter;
