const Datastore = require('nedb');
const csv = require('csvtojson');
const _ = require('lodash');
const request = require('request');
var db = new Datastore({ filename: './books.db', autoload: true });
var bookapi = require('google-books-search');
const download = require('image-downloader');

var bookData = [];

var options = {
    key: "AIzaSyCdRkMnxfJqp8VbIu6puprFEQgjphaH8bw",
    field: 'isbn',
    offset: 0,
    limit: 1,
};


db.find({}, (err, books) => {
    _.forEach(books, (book) => {
        fetchBookThumbnailUrl(book.isbn, function(url) {
            downloadIMG(url);

        });

    });
});

function downloadIMG(url) {
    download.image({ url: url, dest: 'test' })
    .then(({ filename, image }) => {
        console.log('File saved to', filename)
    }).catch((err) => {
        throw err
    });
}


function fetchBookThumbnailUrl(isbn, cb) {
    bookapi.search(isbn, options, function (error, results, apiResponse) {
        if (!error) {
            console.log(results);
            cb(results.thumbnail);
        } else {
            console.log(error);
        }
    });

}