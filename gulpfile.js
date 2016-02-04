var gulp = require('gulp');
var zip = require('gulp-zip');
var size = require('gulp-filesize');
var yarg = require('yargs').argv;
var uglify = require('gulp-uglify');

var TEAM_NAME = 'TheCodeAwakens';
var DEV_NAME = 'BenjaminAuzanneau';

gulp.task('zip', function(){
  if(yarg.ex){
    var zipName = TEAM_NAME+'_'+DEV_NAME+'_'+yarg.ex+'.zip';
    return gulp.src([yarg.ex+'/*', '!'+yarg.ex+'/*.zip'])
          .pipe(zip(zipName))
          .pipe(gulp.dest(yarg.ex));
  }else{
    console.log('ERROR NOT --exercice argument');
  }
});

gulp.task('uglify', function(){
  return gulp.src(yarg.ex+'/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(yarg.ex));
});

gulp.task('size', function(){
  return gulp.src('dist/archive.zip').pipe(size());
});

gulp.task('final', ['zip']);

// Default Task
gulp.task('default', ['zip']);
