const { Router } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const { allRouter } = require("./routes");
const app = express();

module.exports = class Application {
  constructor(DB_URL, PORT) {
    this.configDateBase(DB_URL);
    this.configApplication(PORT);
    this.configRoutes();
    this.errorHandler();
  }
  configDateBase(DB_URL) {
    mongoose.connect(DB_URL, (err) => {
      if (err) throw err;
      console.log("connected to database...");
    });
  }
  configApplication(PORT) {
    app.use(express.static(path.join(__dirname, "../public")));
    require("dotenv").config();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("dev"));

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
  configRoutes() {
    app.use(allRouter);
  }
  errorHandler() {
    app.use((req, res, next) => {
      return res.status(404).json({
        status: 404,
        message: "not found this",
      });
    });
    app.use((err, req, res, next) => {
      const status = err?.status || err?.code || 500;
      const message = err?.message || "Internal Server Error";
      return res.status(status).json({
        status,
        message,
        success: false,
      });
    });
  }
};
