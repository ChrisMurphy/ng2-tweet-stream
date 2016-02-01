var express = require('express'),
    Twit = require('twit'),
    io = require('./index').io,
    nconf = require('nconf');

var SOCKETIO_TWEETS_EVENT = 'tweet-io:tweets',
    SOCKETIO_START_EVENT = 'tweet-io:start',
    SOCKETIO_STOP_EVENT = 'tweet-io:stop',
    nbOpenSockets = 0,
    isFirstConnectionToTwitter = true;

nconf.argv()
   .env()
   .file({ file: './config.json' });   

var T = new Twit({
    consumer_key        : nconf.get('TWITTER_CONSUMER_KEY'),
    consumer_secret     : nconf.get('TWITTER_CONSUMER_SECRET'),
    access_token        : nconf.get('TWITTER_ACCESS_TOKEN'),
    access_token_secret : nconf.get('TWITTER_TOKEN_SECRET')
});

console.log("Listening for tweets from Leeds...");
//bounding_box:[west_long south_lat east_long north_lat]
var stream = T.stream('statuses/filter', { locations: [-1.674092,53.730803,-1.397373,53.881202] }),
    tweetsBuffer = [],
    oldTweetsBuffer = [];

//Handle Socket.IO events
var discardClient = function() {
	console.log('Client disconnected !');
	nbOpenSockets--;

	if (nbOpenSockets <= 0) {
		nbOpenSockets = 0;
		console.log("No active client. Stop streaming from Twitter");
		stream.stop();
	}
};

var handleClient = function(data, socket) {
	if (data == true) {
		console.log('Client connected !');
		
		if (nbOpenSockets <= 0) {
			nbOpenSockets = 0;
			console.log('First active client. Start streaming from Twitter');
			stream.start();
		}

		nbOpenSockets++;

		//Send previous tweets buffer to the new client.
		if (oldTweetsBuffer != null && oldTweetsBuffer.length != 0) {
			socket.emit(SOCKETIO_TWEETS_EVENT, oldTweetsBuffer);
		}
	}
};

io.sockets.on('connection', function(socket) {

	socket.on(SOCKETIO_START_EVENT, function(data) {
		handleClient(data, socket);
	});

	socket.on(SOCKETIO_STOP_EVENT, discardClient);

	socket.on('disconnect', discardClient);
});


//Handle Twitter events
stream.on('connect', function(request) {
	console.log('Connected to Twitter API');

	if (isFirstConnectionToTwitter) {
		isFirstConnectionToTwitter = false;
		stream.stop();
	}
});

stream.on('disconnect', function(message) {
	console.log('Disconnected from Twitter API. Message: ' + message);
});

stream.on('reconnect', function (request, response, connectInterval) {
  	console.log('Trying to reconnect to Twitter API in ' + connectInterval + ' ms');
});

stream.on('tweet', function(tweet) {
	if (tweet.place == null) {
		return ;
	}

	//Create message containing tweet + location + username + profile pic
	// var msg = {};
	// msg.text = tweet.text;
	// msg.location = tweet.place.full_name;
	// msg.user = {
	// 	name: tweet.user.name, 
	// 	image: tweet.user.profile_image_url
	// };


	//push msg into buffer
	//tweetsBuffer.push(msg);
    tweetsBuffer.push(tweet);

	broadcastTweets();
});

var broadcastTweets = function() {
	//send buffer only if full
	if (tweetsBuffer.length >= nconf.get('TWEETS_BUFFER_SIZE')) {
		//broadcast tweets
		io.sockets.emit(SOCKETIO_TWEETS_EVENT, tweetsBuffer);
		
		oldTweetsBuffer = tweetsBuffer;
		tweetsBuffer = [];
	}
}