var dataBase = {results: [{username : 'god', createdAt : new Date(), objectId : 123, text : 'file system'}]};



var fs = require('fs')
var toFile = JSON.stringify(dataBase)


fs.readFile('./db.txt', 'utf8', function (err, data) {

})


var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};
var objectId = 1;
var sendResponse = function(response, message, statusCode){
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(message));
}

var receivePost = function(request, response){
  var data = ""
  request.on('data', function(chunk){
    data += chunk;
  });
  request.on('end', function(data){
    data = JSON.parse(data);
    data.objectId = objectId++;
    data.createdAt = new Date();
    dataBase.results.push(data);
    fs.writeFile('./db.txt', JSON.stringify(dataBase), function () {})
  })
  sendResponse(response, null, 201)
}
var actions = {
  'GET' : function(request, response){
    sendResponse(response, dataBase, 200)
  },
  'POST' : function(request, response){
    receivePost(request, response)
  },
  'OPTIONS' : function(request, response){
    sendResponse(response, 'You got options', 200);
  }
}


module.exports.requestHandler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);
  var action = actions[request.method];
  if( action ){
    action(request, response)
  } else {
    console.log('You screwed up')
  }
};
