var gulp        = require('gulp');
var gutil       = require('gulp-util');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var gulpif      = require('gulp-if');
var streamify   = require('gulp-streamify')
var uglify      = require('gulp-uglify');
var babelify    = require('babelify');
var watchify    = require('watchify');
var production  = process.env.NODE_ENV === 'production';

var dependencies = [
  'alt',
  'react',
  'react-router',
  'underscore'
];

gulp.task('browserify-vendor', function() {
  return browserify()
    .require(dependencies)
    .bundle()
    .pipe(source('vendor.bundle.js'))
    .pipe(gulpif(production, streamify(uglify({ mangle: false }))))
    .pipe(gulp.dest('assets/js/'));
});

gulp.task('bundle', ['browserify-vendor'], function() {
  return browserify('app/app.jsx')
    .external(dependencies)
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulpif(production, streamify(uglify({ mangle: false }))))
    .pipe(gulp.dest('assets/js/'));
});

gulp.task('bundle-watch', ['browserify-vendor'], function() {
  var bundler = watchify(browserify('app/app.jsx', watchify.args));
  bundler.external(dependencies);
  bundler.transform(babelify);
  bundler.on('update', rebundle);
  return rebundle();

  function rebundle() {
    var start = Date.now();
    return bundler.bundle()
      .on('error', function(err) {
        gutil.log(gutil.colors.red(err.toString()));
      })
      .on('end', function() {
        gutil.log(gutil.colors.green('Finished rebundling in', (Date.now() - start) + 'ms.'));
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('assets/js/'));
  }
});