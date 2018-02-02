const Datastore = require("nedb");
const _ = require("lodash");
const request = require("request");
const path = require("path");
const bookapi = require("google-books-search");
var Vibrant = require("node-vibrant");
const fs = require("fs");

var db = new Datastore({ filename: "../db/bookstest.db", autoload: true });

// unset thumbnail big
function unset() {
	console.log('unsetting');
	
	db.find({}).exec(function(err, books) {
		_.forEach(books, book => {
			console.log(book.title);
			db.update(
				{ _id: book._id },
				{ $unset: { thumbnail_big: true } },
				{},
				function(err, numReplaced) {
					if(err) {
						console.log(err);
					}
					// console.log(err);
					// console.log(numReplaced);
				}
			);
		});
	});
};

var generateImgUrls = function(db) {
	db.find({ thumbnail_big: { $exists: false } }).exec(function(err, books) {
		_.forEach(books, book => {
			var imagePath = path.join(
				__dirname,
				"../app/public/images/scans",
				book._id + ".jpeg"
			);

			console.log(imagePath);

			fs.stat(imagePath, (err, stats) => {
				if (err) {
					console.log("image of id: " + book._id + " není");
					db.update(
						{ _id: book._id },
						{
							$set: {
								thumbnail_big: false
							}
						},
						{},
						function(err, numReplaced) {
							if (err) {
								console.log(err);
								console.log(numReplaced);
							}
						}
					);
				} else {
					console.log("image of id: " + book._id + " je");
					db.update(
						{ _id: book._id },
						{
							$set: {
								thumbnail_big: "/static/images/scans/" + book._id + ".jpeg"
							}
						},
						{},
						function(err, numReplaced) {
							if (err) {
								console.log(err);
								console.log(numReplaced);
							}
						}
					);
				}
			});
		});
	});
};

generateImgUrls(db);