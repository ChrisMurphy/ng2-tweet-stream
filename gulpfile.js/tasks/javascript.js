'use strict';

var gulp = require('gulp'),
    jspm = require('jspm');

gulp.task('javascript', function() {
  return jspm.bundleSFX('app/bootstrap', 'dist/js/app.js', { sourceMaps: false, minify: true });
});