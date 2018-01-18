"use strict";
const express = require("express");
const app = express();
const _ = require("lodash");
const Datastore = require("nedb");

app.set("view engine", "ejs");

var db = new Datastore({
  filename: "./books.db",
  autoload: true
});

app.get("/", function(req, res) {
  db.find({}, (err, docs) => {
    console.log(err);
    // res.send(docs);
    res.render("index", {
      books: docs
    });
  });
});

var server = app.listen(3000, () => {
  console.log("Server running at 3000");
});
