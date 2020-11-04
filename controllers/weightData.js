const express = require("express");
const router = express.Router();
const weightData = require("../models/Schema.js");
const methodOverride = require("method-override");
router.use(methodOverride("_method"));

//========================================\\
//               Routes                   \\
//========================================\\
//localhost:3000/
//index
router.get("/", (req, res) => {
  weightData.find({}, (error, allWeight) => {
    res.render("index.ejs", {
      weightData: allWeight,
    });
  });
});

//new
router.get("/new", (req, res) => {
  res.render("new.ejs");
});

//post
router.post("/", (req, res) => {
  weightData.create(req.body, (error, createdData) => {
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
