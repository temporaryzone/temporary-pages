"use strict";

const csv = require('csvtojson');
const _ = require('lodash');
var generateThumbnailUrls = require('./thumbnailsFixerSql');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../db/db.sqlite3');

var bookData = [];

csv()
    .fromFile('../db/export.csv')
    .on('json', (jsonObj) => {
		bookData.push(jsonObj);
    })
    .on('done', (error) => {
		// insert to db
		console.log('started inserting to db');
		_.forEach(bookData, function (value, key) { 
			var arr = [JSON.stringify(value.author_details.split('|')) , value.title,value.description,value.pages, value.language, value.isbn, value.publisher, value.date_published, value.format, value._id];
			db.run("INSERT OR IGNORE INTO books (authors, title, description, pages, language, isbn, publisher, date_published, format, _id) VALUES (?,?,?,?,?,?,?,?,?,?)", arr);
		});
		  console.log('finished inserting');
		// updating if thumbnails exist
		generateThumbnailUrls(db);

    })



