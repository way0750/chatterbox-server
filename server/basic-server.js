/* Import node's http module: */
var dataBase = {results: []};
var fs = require('fs');
var urlParser = require("url");

var express = require('express');
var bodyParser = require('body-parser');
var objectId = 2;
var getJSON = bodyParser.json();
var app = express();

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

app.use(getJSON);

// all request with the root route 'clinet' will be 200 ok and simpliy be served;
app.use(express.static('client'))

var dataBase;

// fs.readFile('./server/db.txt', 'utf-8', function (err, data) {
// 	dataBase = JSON.parse(data);
// })

var toSendMessages = function (req, res, next) {
	res.set(headers);
	res.send(dataBase);
};

var toWriteMessages = function (req, res, next) {
	var newMessge = req.body;
	console.log(newMessge);
	newMessge.objectId = objectId++;
	newMessge.createdAt = new Date();

	// send new message to dataBase;
	dataBase.results.push(newMessge);

	//send a copy to the file;
	fs.writeFile('./server/db.txt', JSON.stringify(dataBase), function () {})

	res.set(headers);
	res.status(201).send(dataBase);	
};

app.route('/classes/messages')
   .get(toSendMessages)
   .post(toWriteMessages);

app.route('/classes/room1/')
   .get(toSendMessages)
   .post(toWriteMessages);

app.use('/', function (req, res, next) {
	res.sendStatus(404);
});

var port = 3000;

app.listen(port);
console.log('server running;')