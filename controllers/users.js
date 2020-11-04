const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();
const User = require("../models/users.js");

// const bodyParser = require("body-parser");
// var jsonParser = bodyParser.json();

// const methodOverride = require("method-override");
// users.use(methodOverride("_method"));

users.get("/new", (req, res) => {
  res.render("users/new.ejs");
});

users.get("/", (req, res) => {
  res.render("users/welcome.ejs");
});

users.post("/", (req, res) => {
  console.log(req.body);
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (err, createdUser) => {
    console.log(req.body);
    console.log("user is created", createdUser);
    res.redirect("sessions/login");
  });
});

module.exports = users;
