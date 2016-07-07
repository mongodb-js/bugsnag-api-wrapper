var request = require('request');
var _ = require('highland');

var URL = 'https://api.bugsnag.com';
var PROJECT_ID = process.env.BUGSNAG_PROJECT_ID;
var auth = {
  'Authorization': 'token ' + process.env.BUGSNAG_API_KEY
};

/**
 * Function to perform a get request with given uri and options, handles pagination recursively and writes all results to the same stream
 * @param {stream} stream Stream to write data to
 * @param {object} options Options object for the HTTP request
 * @param {function} callback Callback function to call if error or successful return
 * @return {void}
 */
var getData = function(stream, options, callback) {
  var stream = stream || _(); // eslint-disable-line no-redeclare

  console.log('fetching..' + options.uri);

  request.get(options, function(error, response, body) {
    if (error || body.errors) {
      // console.error(error);
      callback(error || body.errors);
      return;
    }

    if (response.headers.status === '200 OK') {
      // var data = body;
      if (body.length > 0) {
        // console.log(body);
        stream.write(body);

        if (response.headers.link) {
          var link = response.headers.link.split(';')[0];
          link = link.match(/<(.*?)>/)[1];

          var nextOptions = {
            uri: link,
            headers: auth,
            json: true
          };
          getData(stream, nextOptions, callback);
        } else {
          stream.end();
          callback(null, stream);
          return;
        }
      }
    } else if (response.headers.status === '429 Too Many Requests') {
      console.log('>>> 429 TOO MANY, WAITING ' + response.headers['retry-after'] + ' SECONDS');
      var delay = response.headers['retry-after'] * 1000; // seconds to milliseconds
      setTimeout(getData, delay, stream, options, callback);
    }
  });

  // return callback(null, stream);
};

/**
 * Function to get errors from Bugsnag for a given project
 * @param {object} querystring parameters to use when getting list of errors from bugsnag
 *                  http://docs.bugsnag.com/api/data-access/errors/#list-errors-by-project
 * @param {function} callback Callback function to call if error or successful return
 * @return {void}
 */
var getErrors = function(querystring, callback) {
  var options = {
    uri: URL + '/projects/' + PROJECT_ID + '/errors',
    headers: auth,
    json: true,
    qs: querystring
  };

  getData(null, options, function(err, res) {
    if (err) {
      // console.error(err);
      callback(err);
      return;
    }

    // res.on('data', function(data) {
    //   console.log(data);
    // });
    // res.on('end', function() {
    //   console.log('FETCHED ERRORS');
    // });
    callback(null, res);
    return;
  });
};

/**
 * Function to get events from Bugsnag for a given project
 * @param {object} querystring parameters to use when getting list of events from bugsnag
 *                  http://docs.bugsnag.com/api/data-access/events/#list-events-by-project
 * @param {function} callback Callback function to call if error or successful return
 * @return {void}
 */
var getEvents = function(querystring, callback) {
  var options = {
    uri: URL + '/projects/' + PROJECT_ID + '/events',
    headers: auth,
    json: true,
    qs: querystring
  };

  getData(null, options, function(err, res) {
    if (err) {
      // console.error(err);
      callback(err);
      return;
    }

    // res.on('data', function(data) {
    //   console.log(data);
    // });
    // res.on('end', function() {
    //   console.log('FETCHED EVENTS');
    // });
    callback(null, res);
    return;
  });
};

// getErrors({});
getEvents({});

/**
 *
 * @api public
 */
module.exports = {
  getErrors: getErrors,
  getEvents: getEvents
};
