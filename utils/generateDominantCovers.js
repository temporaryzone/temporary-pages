const Datastore = require("nedb");
const _ = require("lodash");
const request = require("request");
const path = require("path");
var db = new Datastore({ filename: "../db/bookstest.db", autoload: true });
const bookapi = require("google-books-search");
var Vibrant = require("node-vibrant");
const fs = require("fs");
const colorExtractor = require("img-color-extractor");



var opts = { background: "#FFFFFF", alphaMin: 0, dist: 100, greyVa: -1 };

db
	.find({})
	// .skip(4)
	// .limit(1)
	.exec(function(err, books) {
		_.forEach(books, book => {
			// console.log(book);
			var stream = fs.createReadStream(
				path.join(__dirname, "../app/public/images/covers", book._id + ".png")
			);
			stream.on("error", function() {
				console.log("no image");
				db.update({ _id: book._id }, { $set: { colors: false } }, {}, function(
					err,
					numreplaced
				) {
					console.log(numreplaced);
				});
			});
			stream.on("open", function() {
				colorExtractor
					.extract(stream, opts)
					.then(colors => {
						// console.log(colors);
						db.update(
							{ _id: book._id },
							{ $set: { colors: colors } },
							{},
							function(err, numreplaced) {
								console.log(numreplaced);
							}
						);
					})
					.catch(err => {
						console.log(err);
					});
			});
		});
	});

