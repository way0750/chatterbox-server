var dataBase = {results: [{username : 'god', createdAt : new Date(), objectId : 123, text : 'file system'}]};



var fs = require('fs')
var toFile = JSON.stringify(dataBase)

fs.writeFile('./db.txt', toFile, function () {})

fs.readFile('./db.txt', 'utf8', function (err, data) {

})


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var headers = defaultCorsHeaders; 
var statusCode;
/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

module.exports.requestHandler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);
  var route = request.url.split('/');
  // if route[1] === classes
    //set up rooms
  // if ro

  /**************************POSTS*********************/

  if(request.method === 'POST' && /classes/.test(request.url)){
    statusCode = 201;
    request.on('data', function(data){
      data = JSON.parse(data);
      data.objectId = Math.random();
      data.createdAt = new Date();
      dataBase.results.push(data);
    });
    fs.writeFile('./db.txt', JSON.stringify(dataBase), function () {})
    headers['Content-Type'] = "application/json";
    request.on('end', function(){
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(dataBase));
    });
  } else if (request.method === 'POST' && /classes/.test(request.url)){
    statusCode = 201;
    request.on('data', function(data){
      data = JSON.parse(data);
      data.objectId = Math.random();
      data.createdAt = new Date();
      dataBase.results.push(data);
    });
    headers['Content-Type'] = "application/json";
    request.on('end', function(){
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(dataBase));
    });
  } else if (request.method === 'GET' && /classes/.test(request.url)) {
    headers['Content-Type'] = "application/json";
    response.writeHead(200, headers);
    fs.readFile('./db.txt', 'utf8', function (err, data) {
      response.end(data)
    });
    // response.end(JSON.stringify(dataBase));
  }else if (request.method === 'GET' && /classes/.test(request.url)) {
    headers['Content-Type'] = "application/json";
    response.writeHead(200, headers);
    response.end(JSON.stringify(dataBase));
  } else if (request.method === "OPTIONS"){
    response.writeHead(200, headers);
    response.end();
  }
  else {
    headers['Content-Type'] = "application/json";
    response.writeHead(404, headers);
    response.end();
  }

  /*************************GET**************************/  
  
  //Not found response
  // else if (!/classes|send/.test(request.url) ) {
  //   statusCode = 404;
  //   headers['Content-Type'] = "application/json";
  //   response.writeHead(statusCode, headers);
  //   response.end();
  
  // // Successful GET response.
  // } else {
   
  //   statusCode = 200;

  //   headers['Content-Type'] = "application/json";
  //   response.writeHead(statusCode, headers);
  //   response.write(JSON.stringify(dataBase));
  //   response.end()
  // }
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

