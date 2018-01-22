const Datastore = require('nedb');
const csv = require('csvtojson');
const _ = require('lodash');
var db = new Datastore({ filename: './books.db', autoload: true });

var bookData = [];

csv()
    .fromFile('export.csv')
    .on('json', (jsonObj) => {
        // combine csv header row and csv line to a json object
        // jsonObj.a ==> 1 or 4
        bookData.push(jsonObj);
        // console.log(bookData.title);

        // db.insert(jsonObj);
    })
    .on('done', (error) => {
        console.log(bookData.length);

        _.forEach(bookData, function (value, key) {
            // console.log(`Book num. ${key}`);
            // delete value._id;

            // process authors
            value.authors = value.author_details.split('|');

            delete value.author_details;

            delete value.location;
            delete value.series_details;
            delete value.read_start;
            delete value.read_end;
            delete value.read;
            delete value.notes;
            delete value.signed;
            delete value.loaned_to;
            delete value.rating;
            delete value.anthology;
            delete value.anthology_titles;
            delete value.book_uuid;
            delete value.date_added;
            delete value.goodreads_book_id;
            delete value.last_goodreads_sync_date;
            delete value.last_update_date;
            // delete value.book_uuid;
            delete value.field31;




            // _.forEach(value, function (value,key) {

            //     // console.log(key);
                
            // })
        });
        // console.log(bookData);
        console.log('done processing csv')

        // insert to db
        db.insert(bookData);
    })



