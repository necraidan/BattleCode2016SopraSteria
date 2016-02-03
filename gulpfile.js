var gulp = require('gulp');
var zip = require('gulp-zip');
var size = require('gulp-filesize');
var yarg = require('yargs').argv;

gulp.task('zip', function(){
  return gulp.src('src/*')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('dist'));
});

gulp.task('size', function(){
  return gulp.src('dist/archive.zip').pipe(size());
});

// Default Task
gulp.task('default', ['zip']);
