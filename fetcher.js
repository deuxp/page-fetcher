const request = require('request');
const fs = require('fs');
const URL = process.argv[2];
const SCRIBE = process.argv[3];

/**
 * How to use   -> run from the commmmand line: `node fetcher.js [URL] [file PATH]`
 * Dependencies -> (a) process.argv (b) fs (c) request [npm package]
 * Behaviour    -> 1. uses request to GET a resource from a url
 *                 2. uses fs to write to a local file --> callback function called from within
 *                 3. uses fs.stat() to record how many bytes the packet is and log it to console.
 *                 4. uses process.argv to get the arguments
 *                 5. checks file path - if incorect throw err - line 31
 */
/** STATUS CODES **\
 *  ==============================================================================
 * 403 - forbidden            | understands request but rejects it. Similar to 401
 * 200 - HTTP 200 OK success  | indicates that the request has succeeded
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
  if (error) console.log('error:', error); // Print the error if one occurred
  if (response.statusCode === 200) writeTo(SCRIBE, body); // save to file
  else console.log(`Failed to write web page --> statusCode: ${response.statusCode}`);
});

