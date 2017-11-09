var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
const del = require('del')

var paths = {
  src: {
    less: './src/style/less/*.less',
    css: './src/style/css/*.css',
    theme: './src/style/css/themes/***',
    js: './src/js/*.js',
    lib: './src/js/lib/*.js',
    pug: './src/pug/*.pug',
    images: './src/img/*',
    data: './src/data/*',
    font: './src/font/*'
  },
  dist: {
    html: './dist',
    style: './dist/style',
    theme: './dist/style/themes',
    js: './dist/js',
    lib: './dist/js/lib',
    images: './dist/img',
    data: './dist/data',
    font: './dist/font'
  }
}

gulp.task('pug', () => {
  gulp.src(paths.src.pug)
    .pipe($.pug())
    .pipe(gulp.dest('./dist'))
})

gulp.task('less', () => {
  gulp.src(paths.src.less)
    .pipe($.less())
    .pipe($.cleanCss({ compatibility: '*'}))
    .pipe(gulp.dest(paths.dist.style))
})
gulp.task('css', () => {
  gulp.src(paths.src.css)
    .pipe($.cleanCss({ compatibility: '*'}))
    .pipe(gulp.dest(paths.dist.style))
})

gulp.task('scripts', () => {
  gulp.src(paths.src.js)
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe($.uglify())
    .pipe(gulp.dest(paths.dist.js))
})
gulp.task('lib', () => {
  gulp.src(paths.src.lib)
    .pipe($.uglify())
    .pipe(gulp.dest(paths.dist.lib))
})

gulp.task('images', () => {
  gulp.src(paths.src.images)
    .pipe($.imagemin())
    .pipe(gulp.dest(paths.dist.images))
})

gulp.task('font', () => {
  gulp.src(paths.src.font)
    .pipe(gulp.dest(paths.dist.font))
})

gulp.task('data', () => {
  gulp.src(paths.src.data)
    .pipe(gulp.dest(paths.dist.data))
})

gulp.task('webserver', () => {
  gulp
    .src(paths.dist.html)
    .pipe($.webserver({
      port: 8080,
      livereload: true,
      directoryListing: false
    }))
})
// Cleaning
gulp.task('clean', () => {
  return del(['dist/**/*'])
})

gulp.task('watch', () => {
  gulp.watch(paths.src.pug, ['pug'])
  gulp.watch(paths.src.less, ['less'])
  gulp.watch(paths.src.js, ['scripts'])
  gulp.watch(paths.src.js, ['data'])
})

gulp.task('default', ['webserver', 'watch'])
gulp.task('build', ['pug', 'less', 'css', 'scripts', 'lib', 'data', 'font'])
