const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const todoRoute = require("./routes/todoRoute");

dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 8010;
const connectionURL = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cors());

// API endpoints
app.use("/todos", todoRoute);

// DB config
mongoose.set("strictQuery", true);
mongoose
  .connect(connectionURL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
