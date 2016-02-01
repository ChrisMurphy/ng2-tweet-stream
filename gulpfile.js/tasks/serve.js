'use strict';

var config = require('../config'),
    gulp = require('gulp'),
    liveServer = require("live-server"),
    environments = require('gulp-environments');

gulp.task('serve', function(){
      var serverConfig = environments.production() ? config.server.production :config.server.development;
      return liveServer.start(serverConfig);
});