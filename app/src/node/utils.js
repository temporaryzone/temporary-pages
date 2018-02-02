const _ = require("lodash");
const fs = require("fs");
const path = require("path");
utils = {};

utils.unsetThumbnails = function(db) {
	db.update({}, { $unset: { thumbnail_big: true } }, {}, function() {
		// Now the document for Mars doesn't contain the planet field
		// You can unset nested fields with the dot notation of course
	});
};



utils.generateImgUrls = function(db) {
	db.find({ thumbnail_big: { $exists: false } }).exec(function(err, books) {
		_.forEach(books, book => {
			var imagePath = path.join(
				__dirname,
				"../../../app/public/images/scans",
				book._id + ".jpeg"
			);

			console.log(imagePath);

			fs.stat(imagePath, (err, stats) => {
				if (err) {
					console.log("image of id: " + book._id + " není");
					// db.update(
					// 	{ _id: book._id },
					// 	{
					// 		$set: {
					// 			thumbnail_big: false
					// 		}
					// 	},
					// 	{},
					// 	function(err, numReplaced) {
					// 		console.log(err);
					// 		console.log(numReplaced);
					// 	}
					// );
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
							console.log(err);
							console.log(numReplaced);
						}
					);
				}
			});
		});
	});
};

utils.test = () => {
	console.log("utils working");
};

module.exports = utils;
