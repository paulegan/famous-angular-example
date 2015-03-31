'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('connect', function () {
  $.connect.server({root: 'src', port: 9000, livereload: true});
});

gulp.task('watch', ['connect', 'build'], function () {
  gulp.watch('bower.json', ['wiredep']);
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('src/styles/**/*.scss', ['styles']);
  gulp.watch('src/**/*').on('change', function (file) {
    // gulp.start('build');
    gulp.src(file.path).pipe($.connect.reload());
  });
});

gulp.task('wiredep', function () {
  gulp.src('src/*.html')
    .pipe(require('wiredep').stream({directory: 'src/bower_components'}))
    .pipe(gulp.dest('src'));
});

gulp.task('styles', function () {
  return gulp.src('src/styles/*.scss')
    .pipe($.sass())
    .pipe($.autoprefixer({browsers: ['last 2 versions'], cascade: false}))
    .pipe(gulp.dest('src/styles'));
});

gulp.task('scripts', function () {
  return gulp.src('src/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

gulp.task('images', function () {
  gulp.src('src/*.ico')
    .pipe(gulp.dest('www'));
  gulp.src('src/images/**/*')
    .pipe(gulp.dest('www/images'));
});

gulp.task('partials', function () {
  return gulp.src('src/partials/**/*.html')
    .pipe($.ngHtml2js({moduleName: "example-app", prefix: "partials/"}))
    .pipe(gulp.dest(".tmp/partials"));
});

gulp.task('html', ['partials', 'styles'], function () {
  var assets = $.useref.assets({searchPath: ['.tmp', 'src']});
  return gulp.src('src/*.html')
    .pipe($.inject(gulp.src('.tmp/partials/**/*.js', {read: false}), {
      starttag: '<!-- inject:partials -->',
      addRootSlash: false,
      ignorePath: '.tmp'
    }))
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest('www'));
});

gulp.task('build', ['html', 'partials', 'styles', 'scripts', 'images']);

gulp.task('clean', function () {
  return gulp.src(['.tmp', 'www'], {read: false}).pipe($.clean());
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
