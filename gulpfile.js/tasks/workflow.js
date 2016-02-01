'use strict';

var gulp = require('gulp'),
	gulpSequence = require('gulp-sequence');

gulp.task('production', 
	gulpSequence('set-production', 'build', 'serve')
);

gulp.task('development', ['nodemon']);