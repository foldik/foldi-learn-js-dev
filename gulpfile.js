var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var gulpIf = require('gulp-if');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

var sourceFolder = 'dev';
var destionationFolder = 'dist';

gulp.task('clean:dist', function() {
  return del.sync(destionationFolder);
})

gulp.task('copy-files', function(){
  return gulp.src(sourceFolder + '/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest(destionationFolder));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: sourceFolder
    },
  })
});

gulp.task('watch', ['browserSync'], function () {
	gulp.watch(sourceFolder + '/css/**/*.css', browserSync.reload);
	gulp.watch(sourceFolder + '/js/**/*.js', browserSync.reload);
	gulp.watch(sourceFolder + '/*.html', browserSync.reload);
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', ['copy-files'], callback);
})

gulp.task('default', function (callback) {
  runSequence(['browserSync', 'watch'], callback);
})