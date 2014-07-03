var http      = require('http');
var iprospect = require('./script');
var EventEmitter = require('events').EventEmitter;


var startTime = new Date().getTime();
var linkStatuses = new Object();
var count = 0;
var totalElements = 1;

var app = new EventEmitter();


function checkStatus(domainUrl){

  //console.log('-----------------------------------------');
  domainUrl = iprospect.stringToArray(domainUrl);
  totalElements = domainUrl.length;
  domainUrl.forEach(function(entry) {

    // Get request on the domain URL
    http.get(entry, function (response) {
        count++;

        // Check the URL HTTP status, then update the database status and make a count for every status
        if(response != undefined) {
          console.log('Http status : ' + response.statusCode + ' ' + entry);
          // If key is not defined, we make array initialization to 0
          if(linkStatuses[response.statusCode] == undefined) {
            linkStatuses[response.statusCode] = 0;
          }
          linkStatuses[response.statusCode]++;
        }
        response.resume();
        iprospect.isProcessComplete(count, totalElements, startTime, linkStatuses, app);
    }).on('error', function(e) { // Domain does not answer
        count++;

        linkStatuses[entry] = 'offline';

        console.log('Domain is not reachable'.red + ' ' + entry);
        linkStatuses['offlines']++;
        iprospect.isProcessComplete(count, totalElements, startTime, linkStatuses, app);
    });
  });
  app.on('complete', function(message){
    console.log(message);
  });
}

exports.checkStatus = checkStatus;