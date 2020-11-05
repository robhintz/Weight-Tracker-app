const express = require("express");
const router = express.Router();
const weightData = require("../models/Schema.js");

//========================================\\
//               Routes                   \\
//========================================\\
//localhost:3000/
//index
router.get("/", (req, res) => {
  user = req.session.currentUser;
  console.log(user);
  weightData.find({ username: user.username }, (error, allWeight) => {
    res.render("index.ejs", {
      weightData: allWeight,
      currentUser: req.session.currentUser,
    });
  });
});

//new
router.get("/new", (req, res) => {
  res.render("new.ejs", {
    currentUser: req.session.currentUser,
  });
});

//post
router.post("/", (req, res) => {
  var data = {
    date: req.body.date,
    weight: req.body.weight,
    comment: req.body.comment,
    username: req.session.currentUser.username,
  };
  weightData.create(data, (error, createdData) => {
    res.redirect("/index");
  });
});

//edit
router.get("/:id/edit", (req, res) => {
  weightData.findById(req.params.id, (err, foundWeightData) => {
    res.render("edit.ejs", {
      weightData: foundWeightData,
    });
  });
});

//update
router.put("/:id", (req, res) => {
  weightData.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedWeightData) => {
      res.redirect("/index");
    }
  );
});

//show
router.get("/:id", (req, res) => {
  weightData.findById(req.params.id, (error, foundWeightData) => {
    res.render("show.ejs", {
      weightData: foundWeightData,
      currentUser: req.session.currentUser,
    });
  });
});

//DESTROY
router.delete("/:id", (req, res) => {
  weightData.findByIdAndRemove(
    req.params.id,
    {
      useFindAndModify: false,
    },
    (err, data) => {
      res.redirect("/index");
    }
  );
});

module.exports = router;
