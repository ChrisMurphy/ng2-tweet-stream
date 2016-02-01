'use strict';

var gulp = require('gulp'),    
    environments = require('gulp-environments');

gulp.task('set-development', environments.development.task);
gulp.task('set-production', environments.production.task);