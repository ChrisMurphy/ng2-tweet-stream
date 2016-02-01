var express = require('express'),
    app = express(),
    server = app.listen(3000),
    io = require('socket.io').listen(server),
    path = require('path');

exports.io = io;

console.log('Tweet API started on port ' + server.address().port);

//Configuration
//app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());

app.all('*', function(req, res, next) {
  	res.set('Access-Control-Allow-Origin', '*');
  	res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  	res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  	if ('OPTIONS' == req.method) return res.send(200);
  	next();
});

// Serve Angular 2 content
app.use(express.static(path.join(__dirname, '..', 'src')));

var twitter = require('./twitter');