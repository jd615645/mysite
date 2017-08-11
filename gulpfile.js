var gulp = require('gulp')
var $ = require('gulp-load-plugins')()

var paths = {
  src: {
    less: './src/style/less/*.less',
    css: './src/style/css/*.css',
    theme: './src/style/css/themes/***',
    js: './src/js/**',
    pug: './src/pug/*.pug',
    images: './src/img/*',
    data: './src/data/*',
    font: './src/font/*'
  },
  dist: {
    html: './dist',
    css: './dist/style',
    theme: './src/style/themes',
    js: './dist/js',
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
    .pipe(gulp.dest(paths.dist.css))
})
gulp.task('css', () => {
  gulp.src(paths.src.css)
    .pipe(gulp.dest(paths.dist.css))
})

gulp.task('scripts', () => {
  gulp.src(paths.src.js)
    // .pipe($.uglify())
    .pipe(gulp.dest(paths.dist.js))
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

gulp.task('theme', () => {
  gulp.src(paths.src.theme)
    .pipe(gulp.dest(paths.dist.theme))
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

gulp.task('watch', () => {
  gulp.watch(paths.src.pug, ['pug'])
  gulp.watch(paths.src.less, ['less'])
  gulp.watch(paths.src.js, ['scripts'])
})

gulp.task('default', ['webserver', 'watch'])
gulp.task('build', ['pug', 'less', 'css', 'theme', 'scripts', 'data', 'font'])
