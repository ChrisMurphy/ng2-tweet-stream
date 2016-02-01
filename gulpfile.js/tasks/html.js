'use strict';

var gulp = require('gulp'),
	useref = require('gulp-useref'),
	htmlmin = require('gulp-htmlmin');
	
gulp.task('html', function () {
    return gulp.src('src/index.html')
        .pipe(useref())
		.pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});