const express = require("express");
const mongoose = require("mongoose");
const error = require("../middleware/error");
const signup = require("../routes/signup");
const auth = require("../routes/auth");
const posts = require("../routes/posts");
const forgot_password = require("../routes/forgot_password");
const users = require("../routes/users");

module.exports = function (app) {
  app.use(express.json());

  app.use("/api/signup", signup);
  app.use("/api/auth", auth);
  app.use("/api/posts", posts);
  app.use("/api/forgot_password", forgot_password);
  app.use("/api/users", users);

  app.use(error);
};
