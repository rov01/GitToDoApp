var gulp 		= require('gulp');
var gutil 		= require('gulp-util')
var concat 		= require('gulp-concat');
var sass 		= require('gulp-sass');
var watchify 	= require('watchify');

gulp.task('sass', function () {
 	var start = Date.now();
  	gulp.src('./sass/**/*.scss')
    .pipe(sass()
    	.on('error', sass.logError)
    	.on('end',function(){
    		 gutil.log(gutil.colors.green('Finished scss converting in', (Date.now() - start) + 'ms.'));
    	}))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('sass-watch',function(){
	gulp.watch('./sass/**/*.scss',[sass])
})