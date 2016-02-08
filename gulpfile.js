'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
const preprocess = require('gulp-preprocess');
const react = require('gulp-react');


// Base commands
gulp.task('watch', ['watch-server-jsx']);
gulp.task('prod', ['server-jsx', 'client-jsx']);

// default calls prod and starts watch
gulp.task('default', ['prod', 'watch']);


// Process server jsx
gulp.task('server-jsx', () => gulp.src('./lib/app/**/components/src/**/*.jsx')
  .pipe(preprocess({
    context: {
      IS_NODE: true,
    },
    extension: 'js',
  }))
  .pipe(react())
  .pipe(rename((path) => {
    path.dirname = path.dirname.replace('src', 'build');
  }))
  .pipe(gulp.dest('/lib')));

// Process client jsx
gulp.task('client-jsx', () => gulp.src()
  .pipe());

// Watch client and server
gulp.task('watch-server-jsx', () =>
  gulp.watch('./lib/app/**/components/src/**/*.jsx', ['server-jsx', 'client-jsx']));
