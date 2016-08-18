var express = require('express');
var app = express();
var config = require('./config/server.js');
var port = config.port;





app.listen(port, function() {
	console.log('Server started on port: ', port);
})
