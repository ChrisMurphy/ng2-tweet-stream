'use strict';

var gulp = require('gulp'),
    tslint = require('gulp-tslint'),
    stylish = require('gulp-tslint-stylish');

gulp.task('ts-lint', function(){
      return gulp.src(['./**/*.ts', '!./node_modules/**', '!./src/jspm_packages/**', '!./typings/**'])
        .pipe(tslint())
        .pipe(tslint.report(stylish, {
            emitError: true,
            sort: true,
            bell: true,
            fullPath: true
        }));
});

// TODO: add other lint style etc.

// Lint everything
gulp.task('lint', ['ts-lint']);