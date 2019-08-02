//Подключение пакетов
var gulp = require('gulp'),
browserSync = require('browser-sync'),
plumber = require('gulp-plumber'),
notify = require('gulp-notify'),
autoprefixer = require('gulp-autoprefixer'),
scss = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "src/",
      // ПРОПИСЫВАЙ НАЗВАНИЕ HTML ФАЙЛА С КОТОРЫМ СЕЙЧАС РАБОТАЕШЬ
      index: "index.html"
    },
    notify: false,
  });
});

gulp.task('scss', function() {
  return gulp.src('./src/scss/style.scss')
  .pipe(plumber({
    errorHandler: notify.onError(function(err){
      return {
        title: 'styles',
        message: err.message
      }
    })
  }))
  .pipe(sourcemaps.init())
  .pipe(scss())
  .pipe(autoprefixer({
    browsers: ['last 3 version'],
    cascade: false
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./src/css'))
  .pipe(browserSync.stream());
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.scss', gulp.series('scss'));
  gulp.watch('src/**/*.js').on("change", browserSync.reload);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('scss', 'browser-sync', 'watch'));