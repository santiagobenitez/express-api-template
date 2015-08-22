'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

module.exports = function(options) {
  gulp.task('inject', ['scripts', 'styles'], function () {
    var injectStyles = gulp.src([
      options.tmp + '/serve/app/**/*.css',
      '!' + options.tmp + '/serve/app/vendor.css'
    ], { read: false });

    var environmentInjectScripts = gulp.src(options.src + '/app/**/*' + options.env + '.configuration.js');
    var environmentInjectOptions = {
      starttag: '<!-- inject: envconf -->',
      relative: true
    };

    var libInjectScripts = gulp.src(options.libs + '/*.js');
    var libInjectOptions = {
      starttag: '<!--  inject:lib-scripts -->',
      relative: true
    };

    var injectScripts = gulp.src([
      options.src + '/app/**/*.js',
      '!' + options.src + '/app/**/*.spec.js',
      '!' + options.src + '/app/**/*.mock.js',
      '!' + options.src + '/app/**/*configuration.js',
    ])
    .pipe($.angularFilesort()).on('error', options.errorHandler('AngularFilesort'));

    var injectOptions = {
      ignorePath: [options.src, options.tmp + '/serve'],
      addRootSlash: false
    };

    return gulp.src(options.src + '/*.html')
      .pipe($.inject(injectStyles, injectOptions))
      .pipe($.inject(injectScripts, injectOptions))
      .pipe($.inject(environmentInjectScripts, environmentInjectOptions))
      .pipe($.inject(libInjectScripts, libInjectOptions))
      .pipe(wiredep(options.wiredep))
      .pipe(gulp.dest(options.tmp + '/serve'));

  });
};
