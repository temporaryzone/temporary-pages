const Datastore = require("nedb");
const _ = require("lodash");
const request = require("request");
const path = require("path");
var db = new Datastore({ filename: "../db/bookstest.db", autoload: true });
const bookapi = require("google-books-search");
var Vibrant = require("node-vibrant");
const fs = require("fs");



db.find({}).exec(function(err, books) {
	_.forEach(books, book => {
		db.update({ _id: book._id },{ $set: { id: parseInt(book._id) } }, {}, function(
			err,
			numReplaced
		) {
			console.log(err);
			console.log(numReplaced);
		});
	});
});
