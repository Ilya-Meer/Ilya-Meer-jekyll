const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

function minifyJS() {
  return src('scripts/*.js', { sourcemaps: true })
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('_includes/scripts', { sourcemaps: true }))
}

exports.default = minifyJS;