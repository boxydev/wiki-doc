'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var markdown = require('gulp-markdown');
var browserSync = require('browser-sync').create();
var buildBranch = require('buildbranch');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var headerfooter = require('gulp-headerfooter');
var path = require('path');
var Transform = require('stream').Transform;
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var App = require('./src/assets/js/app.js');

gulp.task('js', function() {
    return browserify({
            entries: './src/assets/js/app.js'
        }).transform('babelify', { presets: ['es2015', 'react'] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        /*.pipe(uglify({
            mangle: false
        }))*/
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('css', function() {
    return gulp.src('src/assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('html', function() {
    return gulp.src('src/data/**/*.{md,html}')
        .pipe(new Transform({
            objectMode: true,
            transform: function(file, encoding, callback) {
                var html = String(file.contents)
                var reactRender = ReactDOMServer.renderToStaticMarkup(React.createElement(App, {html: html}));
                file.contents = new Buffer(reactRender)
                callback(null, file);
            }
        }))
        .pipe(headerfooter.header('./src/templates/header.html'))
        .pipe(headerfooter.footer('./src/templates/footer.html'))
        .pipe(rename(function(file) {
            file.dirname = '.'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('src/assets/js/**/*.js', ['js']);
    gulp.watch('src/assets/sass/**/*.scss', ['css']);
    gulp.watch('src/**/*.{md,html}', ['html']);
    gulp.watch('dist/**/*').on('change', browserSync.reload);
});

gulp.task('browser-sync', ['js', 'css', 'html'], function() {
    browserSync.init({
        server: './dist'
    });
});

gulp.task('publish', function() {
    buildBranch({
        branch: 'gh-pages',
        remote: 'origin',
        ignore: ['.git', 'dist', 'node_modules'],
        folder: 'dist'
    }, function(err) {
        if(err) {
            throw err;
        }
        console.log('Published!');
    });
});

gulp.task('dev', ['browser-sync', 'watch']);
gulp.task('default', ['js', 'css', 'html', 'publish']);
