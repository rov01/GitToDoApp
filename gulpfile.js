var gulp  = require('gulp');
var fs    = require('fs');

fs.readdirSync(__dirname + '/gulp').forEach(function(task){
  require('./gulp/' + task)
})

gulp.task('build', ['vendor','bundle','sass']);
gulp.task('dev', ['build','bundle-watch','sass-watch','watch-server']);
