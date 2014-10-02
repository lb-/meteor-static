/*jslint node: true */
"use strict";

var path = require('path');
var fs = require('fs');
//var process = require('process');
var exec = require('child_process').exec;

//# Inspiration
//http://www.anupshinde.com/posts/how-to-create-nodejs-npm-package/
//https://github.com/percolatestudio/meteor-static/blob/master/bundle-static.py


var bundleStatic = function(appDir, buildDir) {
  //console.log(buildDir, fs.realpathSync(buildDir));
  buildDir = fs.realpathSync(buildDir);
  appDir = fs.realpathSync(appDir);
  //This is the folder /bundle that the app gets put
  var bundleDir = path.join(buildDir, 'bundle');
  //console.log(buildDir, appDir);
  // create a new folder in sub-folder 'build'
  //later.
  //
  // if (fs.existsSync(buildDir)) {
  //   console.log('build directory:', buildDir, 'exists');
  // } else {
  //   fs.mkdirSync(buildDir);
  // }

  // create a tmp folder
  // var tempDir = path.join(buildDir, 'tmp');
  // //console.log('buildDir', buildDir, 'tempDir', tempDir);
  // if (fs.existsSync(tempDir)) {
  //   console.log('temp directory:', tempDir, 'exists');
  // } else {
  //   fs.mkdirSync(tempDir);
  // }

  // get the bundle into a directory
  //var bundleDir = path.join(tempDir, 'bundle.tar.gz');
  bundle(appDir, buildDir);

  //console.log('current dir:', process.cwd());

  // grab the HTML, JS, CSS
  var clientApp = path.join(bundleDir, 'programs', 'web.browser');

};

var bundle = function(appDir, bundleDir) {
  var bundleCommand = 'meteor build ' + bundleDir + ' --debug --directory';
  //console.log(appDir, bundleFile);

  //console.log('Starting directory: ' + process.cwd());
  try {
    process.chdir(appDir);
    console.log('Change directory: ' + process.cwd());
  } catch (err) {
    console.log('chdir: ' + err);
  }

  console.log('About to build bundle');
  exec(bundleCommand, function(error, stdout, stderr) {
    //console.log('stdout: ' + stdout);
    //console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });

};

bundleStatic('/Users/LB/Projects/test-static/', '/Users/LB/Desktop/build');
