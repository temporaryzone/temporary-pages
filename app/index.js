"use strict";
const express = require("express");
const app = express();
const _ = require("lodash");
const Datastore = require("nedb");
const path = require('path');

// app.set("view engine", "ejs");
app.use("/static", express.static(path.join(__dirname, "public")));


var db = new Datastore({
  filename: "./db/bookstest.db",
  autoload: true
});

app.get("/", function(req, res) {
  res.sendFile("index.html", { root: __dirname + "/src" });
});

app.get("/api/books", function(req, res) {
  db.find({}).sort({ id: 1 }).exec(function(err, docs) {
    res.json(docs);
  });
  
});

var server = app.listen(3000, () => {
  console.log("Server running at 3000");
});
