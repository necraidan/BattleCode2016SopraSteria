var gulp = require('gulp');
var zip = require('gulp-zip');
var size = require('gulp-filesize');
var yarg = require('yargs').argv;
var uglify = require('gulp-uglify');
var fs = require('fs');
var mkdirp = require('mkdirp');

var TEAM_NAME = 'TheCodeAwakens';
var DEV_NAME = 'BenjaminAuzanneau';
var DUMMY_JS = '';
var README_NAME = 'README.txt';
var README_CONTENT = 'The Code Awakens\r\n'+
+'Benjamin Auzanneau\r\n\r\n'
+'Cet exercice a été écrit en javascript ES5 et exécuté avec Node.\r\n\r\n'
+'Pour pouvoir l\'exécuter :\r\n$ node ';

gulp.task('create', function(){
  if(yarg.ex){
    fs.access(yarg.ex, fs.R_OK | fs.W_OK, function (err) {
      if(!err){
        console.log('Folder already exists');
      }else{
        fs.mkdir(yarg.ex, function(err){
          if(err) throw err;

          fs.writeFile(yarg.ex+'/'+yarg.ex+'.js', DUMMY_JS, function(err){
            if(err) throw err;

            console.log('Write of '+yarg.ex+'/'+yarg.ex+'.js done.');
          });

          fs.appendFile(yarg.ex+'/'+README_NAME, README_CONTENT+yarg.ex+'.js', function(err){
            if(err) throw err;

            console.log('Write of '+yarg.ex+'/'+README_NAME+' done.');
          });
        });
      }
    });
  }else{
    console.log('ERROR NO --name argument');
  }
});

gulp.task('zip', function(){
  if(yarg.ex){
    var zipName = TEAM_NAME+'_'+DEV_NAME+'_'+yarg.ex+'.zip';
    return gulp.src([yarg.ex+'/*', '!'+yarg.ex+'/*.zip'])
          .pipe(zip(zipName))
          .pipe(gulp.dest('zip'));
  }else{
    console.log('ERROR NOT --ex argument');
  }
});

gulp.task('uglify', function(){
  return gulp.src(yarg.ex+'/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(yarg.ex));
});

gulp.task('size', function(){
  if(yarg.ex){
    gulp.src('zip/'+TEAM_NAME+'_'+DEV_NAME+'_'+yarg.ex+'.zip').pipe(size());
  }else{
    console.log('ERROR NOT --ex argument');
  }
});

gulp.task('final', ['zip']);

// Default Task
gulp.task('default', ['zip']);
