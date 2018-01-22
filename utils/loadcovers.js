const Datastore = require("nedb");
const csv = require("csvtojson");
const _ = require("lodash");
const request = require("request");
const path = require("path");
var db = new Datastore({ filename: "../db/bookstest.db", autoload: true });
const bookapi = require("google-books-search");

const http = require("http");
const fs = require("fs");

var bookData = [];

var options = {
	key: "AIzaSyCdRkMnxfJqp8VbIu6puprFEQgjphaH8bw",
	field: "isbn",
	offset: 0,
	limit: 1
};

// db.find({}, (err, books) => {
//     _.forEach(books, (book) => {
//         // console.log(book);
//         fetchBookThumbnailUrl(book.isbn, function(url) {
//                     console.log(url);
//         });

//     });
// });

db
	.find({})
	.skip(4)
	  .limit(1)
	.exec(function(err, books) {
		_.forEach(books, book => {
			console.log(book);
			fetchBookThumbnailUrl(book.isbn, function(url) {
				// console.log(__dirname + "/db/" + book._id + ".jpg", url);
				if (url) {
					downloadIMG(url, path.join(__dirname, '../app/public/images/covers', book._id + ".jpg"), function(
						error
					) {
						console.log("download happened");
					});
				} else {
					console.log("bad url");
				}
			});
		});
	});

var downloadIMG = function(url, dest, cb) {
	var file = fs.createWriteStream(dest);
	var request = http
		.get(url, function(response) {
			response.pipe(file);
			file.on("finish", function() {
				file.close(cb); // close() is async, call cb after close completes.
			});
		})
		.on("error", function(err) {
			// Handle errors
			fs.unlink(dest); // Delete the file async. (But we don't check the result)
			if (cb) cb(err.message);
		});
};

function fetchBookThumbnailUrl(isbn, cb) {
	bookapi.search(isbn, options, function(error, results, apiResponse) {
		if (!error) {
			console.log(results.thumbnail);
			if (results[0]) {
				if (results[0].thumbnail) {
					cb(results[0].thumbnail);
				} else {
					cb(false);
				}
			}
		} else {
			// console.log(error);
		}
	});
}
