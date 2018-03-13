"use strict";
const Datastore = require('nedb');
const csv = require('csvtojson');
const _ = require('lodash');
// var db = new Datastore({ filename: './books.db', autoload: true });

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite3');


var bookData = [];

csv()
    .fromFile('../db/export.csv')
    .on('json', (jsonObj) => {
		bookData.push(jsonObj);
		
    })
    .on('done', (error) => {
        // insert to db
		db.serialize(function() {
			console.log('started inserting to db');
			_.forEach(bookData, function (value, key) { 
				// console.log("key: " + key);
				// console.log("value: " + value);
				var arr = [JSON.stringify(value.author_details.split('|')) , value.title,value.description,value.pages, value.language, value.isbn, value.publisher, value.date_published, value.format, value._id];
				db.run("INSERT OR IGNORE INTO books (authors, title, description, pages, language, isbn, publisher, date_published, format, _id) VALUES (?,?,?,?,?,?,?,?,?,?)", arr);
			});
		  });
		  console.log('finished inserting');
    })



