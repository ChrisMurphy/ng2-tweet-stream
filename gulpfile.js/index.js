'use strict';

/*
 * gulpfile.js
 * ===========
 * Rather than manage one giant configuration file responsible
 * for creating multiple tasks, each task has been broken out into
 * its own file in the 'gulp/tasks' folder. Any files in that directory get
 * automatically required below.
 *
 * To add a new task, simply add a new task file in that directory.
 */

var gulp = require('gulp');
var requireDir = require('require-dir');

// Require all tasks in the 'tasks', including subfolders.
requireDir('./tasks', { recurse: true });