var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload');
var babel = require('gulp-babel');
var requirejs= require('gulp-requirejs')

gulp.task('app', function(){
  return gulp.src("src/app.js")
    .pipe(babel())
    .pipe(gulp.dest(""));
});

// gulp.task('viewstatic', function(){
//   return gulp.src(['src/views/*.jade', 'src/views/**/*.html'])
//     .pipe(gulp.dest("views"));
// });
//
// gulp.task('viewjs', function(){
//   return gulp.src("src/views/**/*.js")
//     .pipe(babel())
//     .pipe(gulp.dest('views'));
// })
//
// gulp.task('routesjs', function(){
//   return gulp.src("src/routes/*.js")
//     .pipe(babel())
//     .pipe(gulp.dest('routes'));
// })


gulp.task('libjs', function(){
  return gulp.src(["!src/libs/**/*route.js", "!src/libs/**/dojoConfig.js", "src/libs/**/*.js"])
    .pipe(babel({ "plugins": ["transform-es2015-modules-amd"] }))
    .pipe(gulp.dest('public/libs'))
})

gulp.task('libjsroute', function(){
  return gulp.src("src/libs/**/*route.js")
    .pipe(babel())
    .pipe(gulp.dest('public/libs'))
})

gulp.task('libstatic', function(){
  return gulp.src(['src/libs/*.jade', 'src/libs/**/*.html', "src/libs/**/dojoConfig.js",])
    .pipe(gulp.dest('public/libs'))
})

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    debug: true,
    ext: 'js',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'app',
  'libjs',
  'libjsroute',
  'libstatic',
  'develop'
]);
