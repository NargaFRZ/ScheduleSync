require("dotenv").config();
const express = require("express");
const pool = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");
const accountRoutes = require("./routes/account");
const groupRoutes = require("./routes/group");
const scheduleRoutes = require("./routes/schedule");
const ocrRoutes = require("./routes/ocr");
const session = require("express-session");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Allow only this origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow credentials
  })
);
// Middleware for parsing JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: "localhost",
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
    },
  })
);

// Routes
app.use("/account", accountRoutes);
app.use("/group", groupRoutes);
app.use("/schedule", scheduleRoutes);
app.use("/ocr", ocrRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
