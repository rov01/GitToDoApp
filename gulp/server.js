var gulp 	= require('gulp');
var jshint  = require('gulp-jshint');
var stylish = require('jshint-stylish');
var nodemon = require('gulp-nodemon');

gulp.task('lint', function () {
  gulp.src('./assets/js/bundle.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
})

gulp.task('watch-server',function(){
	nodemon({
		script: 'server.js',
		ext: 'js',
		ignore: ['gulp*']
	})
})