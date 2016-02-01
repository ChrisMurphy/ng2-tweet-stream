var express = require('express'),
    Twit = require('twit'),
    socketio = require('socket.io'),
    nconf = require('nconf');

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
var stream = T.stream('statuses/filter', { locations: [-1.674092,53.730803,-1.397373,53.881202] }); 

var tweetsBuffer = [];
 
stream.on('connect', function(request) {
    console.log('Connected to Twitter API');
});
 
stream.on('disconnect', function(message) {
    console.log('Disconnected from Twitter API. Message: ' + message);
});
 
stream.on('reconnect', function (request, response, connectInterval) {
  console.log('Trying to reconnect to Twitter API in ' + connectInterval + ' ms');
})
 
stream.on('tweet', function(tweet) {
    if (tweet.geo == null) {
        return ;
    }
 
    //Create message containing tweet + username + profile pic + geo
    var msg = {};
    msg.text = tweet.text;
    msg.geo = tweet.geo.coordinates;
    msg.user = {
        name: tweet.user.name,
        image: tweet.user.profile_image_url
    };
 
    console.log(msg);
});
