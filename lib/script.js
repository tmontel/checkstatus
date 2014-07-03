// Check if every link is completed then generate statistics ans stop the program execution
function isProcessComplete(count, totalElements, startTime, linkStatuses, app) {
  if(count >= totalElements){
      var endTime = new Date().getTime();
      var execTime = (endTime - startTime) / 1000;
      console.log('-----------------------------------------');
      console.log(totalElements + ' domains checked in ' + execTime + ' s');
      var mediumExecTime = execTime / count;
      console.log('Average execution time : ' + mediumExecTime.toFixed(2) + ' s / link');
      console.log('Statistics by status : ');
      for(var i in linkStatuses)
      {
           console.log(i + " => " + linkStatuses[i] + ' (' + (linkStatuses[i] * 100 / count).toFixed(2) + '%)');
      }
      console.log('-----------------------------------------');
      app.emit('complete', 'Complete...');
  }
}

function stringToArray(domainUrl) {
  if( Object.prototype.toString.call( domainUrl ) !== '[object Array]' ) {
    domainUrl = new Array(domainUrl);
  }
  return domainUrl;
}

exports.isProcessComplete = isProcessComplete;
exports.stringToArray = stringToArray;