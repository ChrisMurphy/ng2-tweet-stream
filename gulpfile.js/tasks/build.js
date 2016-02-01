'use strict';

var gulp = require('gulp'),
	gulpSequence = require('gulp-sequence');

gulp.task('build', 
	gulpSequence(['clean', 'lint'], ['javascript', 'html'])
);