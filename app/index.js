"use strict";
const express = require("express");
const app = express();
const _ = require("lodash");
const Datastore = require("nedb");
const path = require('path');
const utils = require('./src/node/utils.js');

var bodyParser = require('body-parser');

// auth
const basicAuth = require('express-basic-auth');
// db
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('db/db.sqlite3');

var knex = require('knex')({
	client: 'sqlite3',
	useNullAsDefault: true,
	debug: true,
	connection: {
	  filename: "db/db.sqlite3"
	}
  });
  

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// app.use(basicAuth({
//     users: { 'admin': 'supersecret' }
// }))

var staticUserAuth = basicAuth({
    users: {
        'admin': 'admin'
    },
    challenge: true
})

var books = new Datastore({
  filename: "./db/bookstest.db",
  autoload: true
});

app.get('/admin', staticUserAuth, function(req, res) {
	res.sendFile("admin.html", { root: __dirname + "/src" });
})



app.get("/", function(req, res) {
  res.sendFile("index.html", { root: __dirname + "/src" });
}); 

app.get("/api/books", function(req, res) {
	// db.all('SELECT * FROM books', [],(err, rows) => {
	// 	res.json(rows);
	// });
	
	// knex.raw('SELECT * FROM books').then((rows) => {
	// 	res.json(rows);
	// });
	knex.select().from('books').where('show', 1).then((rows) => {
		fisherYates(rows);
		res.json(rows);
	});

	function fisherYates ( myArray ) {
		var i = myArray.length;
		if ( i == 0 ) return false;
		while ( --i ) {
		   var j = Math.floor( Math.random() * ( i + 1 ) );
		   var tempi = myArray[i];
		   var tempj = myArray[j];
		   myArray[i] = tempj;
		   myArray[j] = tempi;
		 }
	  }
	  
});

app.post("/api/post", staticUserAuth, function(req, res) {
	console.dir(req.body[0]);
	// var i = 1;
	req.body.forEach(function (body) {
		console.log(body);
		// i++;
		// db.run()
		knex('books').where('_id', body._id).update(body).then(res.json({good: 'yes'}));
	})

});

app.post("/api/book/:id", function(req, res) {
	console.log("req params id: ", req.params.id);
	console.dir(req);
	knex('books').where('_id', req.params.id)
				.update(req.body)
				.then(res.json({message: 'Updated: '+ req.body.title }));
});


app.get("/api/book/:id", function(req, res) {
	knex.select().from('books').where('_id', req.params.id).then((rows) => {
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