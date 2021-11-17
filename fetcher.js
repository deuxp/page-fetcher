const request = require('request');
const fs = require('fs');
const URL = process.argv[2];
const SCRIBE = process.argv[3];

/**
 * 1. [x] use process.argv to get the arguments
 * 1. [x] use request to GET a resource from a url
 * 2. [x] use fs to write to a local file --> callback function called from within
 * 3. [x] use fs.stat() to record how many bytes the packet is and log it to console.
 */

/// logs the file size
const byteSize = file => {
  fs.stat(`./${file}`, (err, stats) => {
    if (err) throw err;
    console.log(`${stats.size} bytes of data written to ${file}`);
  });
};
/// Write PATH function
// (a) write to the file arg, (b) => callback to log bytes, file saved
const writeTo = function(file, data) {
  fs.writeFile(file, data, (err) => {
    if (err) throw err;
    byteSize(SCRIBE); // log the file status
  });
};

/// async request data
request(URL, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  writeTo(SCRIBE, body); // save to file
});
