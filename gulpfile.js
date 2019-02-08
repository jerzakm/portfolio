'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    changed = require('gulp-changed'),
    uglify = require('gulp-uglify'),
    lineec = require('gulp-line-ending-corrector');


sass.compiler = require('node-sass');

function css() {
    return gulp.src('src/scss/*.scss')
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(sourcemaps.write())
        .pipe(lineec())
        .pipe(gulp.dest('src/css'));
};

function concatCSS() {
    return gulp.src('src/css/*.css')
        .pipe(sourcemaps.init({
            loadMaps: true,
            largeFile: true
        }))
        .pipe(concat('style.min.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('src/maps/'))
        .pipe(lineec())
        .pipe(gulp.dest('src/dist/css'));
}

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

function watch() {
    browserSync.init({
        server: "./src",
        open: 'external',
        watchOptions: {
            ignoreInitial: false,
            ignored: '*.txt'
        },
        files: ['./src'],
    });
    browserSync.reload("*.html");
    browserSync.reload("*.css");
    browserSync.reload("*.js");
    browserSync.reload("*.md");
    browserSync.reload("*.scss");

    gulp.watch('src/scss/*.scss', css);
    gulp.watch("src/css/*.css", concatCSS);
}

exports.css = css;
exports.watch = watch;

var build = gulp.parallel(watch);
gulp.task('default', build);