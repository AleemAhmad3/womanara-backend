require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const leadRouter = require("./routes/lead-routes");
const cors = require("cors");
const subscrieRouter = require("./routes/subscribe-route");
const authRouter = require("./routes/auth-route");

const port = process.env.PORT || 5000;
//  Allowed Origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:3001",
  "https://womanarafoundation.org",
  "https://womanarafoundation.org/",
  "https://admin.womanarafoundation.org",
  "https://admin.womanarafoundation.org/"
];

//  Apply CORS Middleware Before Routes
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    credentials: true, // Allow cookies/auth headers
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  })
);


app.use(express.json());

app.use("/api", leadRouter);
app.use("/api", subscrieRouter);
app.use("/api", authRouter);

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server is running on Port: ", port);
  });
});
