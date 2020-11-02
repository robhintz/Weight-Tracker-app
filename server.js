//========================================\\
//               Dependances              \\
//========================================\\
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
//
const weightData = require("./models/Schema.js");
// How to connect to the database either via heroku or locally
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/" + `temp`;

// Connect to Mongo
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Error / success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

// open the connection to mongo
db.on("open", () => {});

//========================================\\
//               Middleware               \\
//========================================\\

//use public folder for static assets
app.use(express.static("public"));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride("_method")); // allow POST, PUT and DELETE from a form

//========================================\\
//               Routes                   \\
//========================================\\
//localhost:3000/
//index
app.get("/index", (req, res) => {
  weightData.find({}, (error, allWeight) => {
    res.render("index.ejs", {
      weightData: allWeight,
    });
  });
});

//new
app.get("/index/new", (req, res) => {
  res.render("new.ejs");
});

//post
app.post("/index", (req, res) => {
  weightData.create(req.body, (error, createdData) => {
    res.redirect("/index");
  });
});

//edit
app.get("/index/:id/edit", (req, res) => {
  weightData.findByIdAndUpdate(req.params.id, (error, foundWeightData) => {
    res.render("edit.ejs", {
      weightData: foundWeightData,
    });
  });
});

//update
app.put("/:id", (req, res) => {
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
app.get("/index/:id", (req, res) => {
  weightData.findById(req.params.id, (error, foundWeightData) => {
    res.render("show.ejs", {
      weightData: foundWeightData,
    });
  });
});

//DESTROY
app.delete("/:id", (req, res) => {
  weightData.findByIdAndRemove(
    req.params.id,
    { useFindAndModify: false },
    (err, data) => {
      res.redirect("/index");
    }
  );
});

//========================================\\
//               listener                 \\
//========================================\\
app.listen(PORT, () => console.log("Listening on port:", PORT));
