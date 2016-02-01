'use strict';

var config = require('../config'),
	gulp = require('gulp'),
	del = require('del');

gulp.task('clean',
	del.bind(
		null, 
		[config.folders.dist + config.globs.any], 
		{ dot: true }
	)
);