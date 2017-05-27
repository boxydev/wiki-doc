'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var markdown = require('gulp-markdown');
var browserSync = require('browser-sync').create();
var buildBranch = require('buildbranch');
var nunjucksRender = require('gulp-nunjucks-render');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

gulp.task('js', function() {
    return browserify({
            entries: './src/assets/js/app.js'
        }).transform('babelify', {presets: ['es2015', 'react']})
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
    return gulp.src('src/*.{md,html}')
        //.pipe(markdown())
        .pipe(nunjucksRender({
            path: 'src/templates',
            data: {
                name: 'Matthieu'
            }
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('src/assets/js/**/*.js', ['js']);
    gulp.watch('src/assets/sass/**/*.scss', ['css']);
    gulp.watch('src/*.{md,html}', ['html']);
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
