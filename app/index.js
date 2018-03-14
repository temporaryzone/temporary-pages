"use strict";
const express = require("express");
const app = express();
const _ = require("lodash");
const Datastore = require("nedb");
const path = require('path');
const utils = require('./src/node/utils.js');
const basicAuth = require('express-basic-auth');

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('db/db.sqlite3');

// app.set("view engine", "ejs");
app.use("/static", express.static(path.join(__dirname, "public")));


// app.use(basicAuth({
//     users: { 'admin': 'supersecret' }
// }))

var staticUserAuth = basicAuth({
    users: {
        'Admin': 'admin'
    },
    challenge: true
})

var books = new Datastore({
  filename: "./db/bookstest.db",
  autoload: true
});

app.get('/static', staticUserAuth, function(req, res) {
    res.status(200).send('You passed')
})



app.get("/", function(req, res) {
  res.sendFile("index.html", { root: __dirname + "/src" });
}); 

app.get("/api/books", function(req, res) {
//   books.find({}).sort({ id: 1 }).exec(function(err, docs) {
//     res.json(docs);
//   });
  
	db.all('SELECT * FROM books', [],(err, rows) => {
		// process rows here  
		console.log(err);
		console.log(rows);
		res.json(rows);
	});


});



var server = app.listen(3000, () => {
  console.log("Server running at 3000");
});


// closing properly https://stackoverflow.com/questions/42928055/when-to-close-database-with-node-sqlite3-and-express
process.on('SIGINT', () => {
    db.close();
    server.close();
});