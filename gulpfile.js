const { src, dest, series, parallel } = require('gulp');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const useref = require('gulp-useref');
const gulpif = require('gulp-if');
var replace = require('gulp-replace');
var fs = require('fs');
var sass = require('gulp-sass');
sass.compiler = require('dart-sass');

function cleanDist() {
  return del(['dist/*']);
}

function minifyJS() {
  return src(['src/script/*.js'])
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('dist/script/'));
}

function minifyImages() {
  return src('src/assets/*.{mp4,webm}')
    .pipe(dest('dist/assets/'))
    .pipe(src(['src/assets/*.{png,PNG,gif,GIF,jpg,jpeg,JPG,svg}' ]))
    .pipe(imagemin({ verbose: true }))
    .pipe(dest('dist/assets/'));
}

function copyFavicons() {
  return src('src/*.{png,ico,webmanifest}')
      .pipe(dest('dist/'));
}

// Not used currently
function minifyCSS() {
  return src('src/styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('dist/styles/'));
}

function updateScriptStyleReferences() {
  return src('src/*.html')
    .pipe(useref())
    .pipe(gulpif('*.css', cleanCSS({compatibility: 'ie8'})))
    .pipe(gulpif('*.js', uglify()))
    .pipe(dest('dist/'))
}

function minifyHTML() {
  return src('dist/*.html')
    .pipe(htmlmin({ collapseWhitespace: true, minifyCSS: true, minifyJS: true, removeComments: true }))
    .pipe(replace('slideMenu.js', 'slideMenu.min.js'))
    .pipe(dest('dist/'));
}

function copyFonts() {
  return src('src/fonts/**/*.{ttf,eot,woff,woff2}')
    .pipe(dest('dist/fonts/'));
}

function compileSassToCSS() {
  return src('src/styles/*.{sass,scss}')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('src/styles/'))
}

exports.default = series(cleanDist, parallel(minifyJS, minifyImages, copyFonts, copyFavicons, series(compileSassToCSS, updateScriptStyleReferences, minifyHTML)));
