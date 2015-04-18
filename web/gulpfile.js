var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var livereload = require('gulp-livereload')
var sass = require('gulp-ruby-sass')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var sourcemaps = require('gulp-sourcemaps')
var watchify = require('watchify')
var util = require('gulp-util')
var plumber = require('gulp-plumber')
var envify = require('envify')
var riotify = require('riotify')

gulp.task('sass', function () {
  return sass('./public/styles/')
    .on('error', util.log)
    .pipe(plumber())
    .pipe(gulp.dest('./dist/css'))
    .pipe(livereload())
})

gulp.task('watch', function () {
  gulp.watch('./public/styles/*.scss', ['sass'])
})

function bundle (b) {
  return b.bundle()
    .pipe(source('./main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js'))
}

gulp.task('build-client', function () {
  var b = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true
  })
  b.transform(envify)
  b.transform(riotify)

  b = watchify(b)
  b.on('update', function () {
    bundle(b)
  })

  b.add('./public/javascripts/main.js')
  return bundle(b)
})

gulp.task('develop', function () {
  livereload.listen()
  nodemon({
    script: 'bin/www',
    ext: 'js ejs coffee'
  }).on('restart', function () {
    setTimeout(function () {
      livereload.changed(__dirname)
    }, 500)
  })
})

gulp.task('default', [
  'sass',
  'build-client',
  'develop',
  'watch'
])
