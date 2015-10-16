var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var production = process.env.NODE_ENV === 'production';

gulp.task('vendor', function() {
  return gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.js'
  ]).pipe(concat('vendor.js'))
    .pipe(gulpif(production, uglify({ mangle: false })))
    .pipe(gulp.dest('assets/js'));
});