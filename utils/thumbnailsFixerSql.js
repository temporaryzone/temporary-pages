const _ = require("lodash");
const request = require("request");
const path = require("path");
const fs = require("fs");

// const sqlite3 = require('sqlite3').verbose();
// let db = new sqlite3.Database('../db/db.sqlite3');



var generateThumbnailUrls = function(db) {
	db.all("SELECT * FROM books WHERE thumbnail IS NULL", function(err, rows) {
        rows.forEach(function (book) {
			var imagePath = path.join(__dirname,"../app/public/images/scans",book._id + ".jpeg");
			fs.stat(imagePath, (err, stats) => { 
				if(err) {
					console.log(err);
				} else {
					console.log(imagePath, book._id);
					db.run("UPDATE books SET thumbnail_big = ? WHERE _id = ?", [ "/static/images/scans/" + book._id + ".jpeg", book._id]);
				}
			});
        });
    });


}


module.exports = generateThumbnailUrls;