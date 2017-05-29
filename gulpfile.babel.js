'use strict'

var browserify = require('browserify')
var gulp = require('gulp')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var metaMarkdown = require('gulp-meta-marked')
var browserSync = require('browser-sync').create()
var buildBranch = require('buildbranch')
var sass = require('gulp-sass')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var path = require('path')
var Transform = require('stream').Transform
var React = require('react')
var ReactDOMServer = require('react-dom/server')
var App = require('./src/assets/js/app.js')

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
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('css', function() {
    return gulp.src('src/assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('html', function() {
    return gulp.src('src/data/**/*.md')
        .pipe(metaMarkdown())
        .pipe(new Transform({
            objectMode: true,
            transform: function(file, encoding, callback) {
                var fileContents = JSON.parse(file.contents)
                var html = fileContents.html
                var meta = fileContents.meta
                var url = path.join(path.dirname(path.relative(file.cwd, file.path)), path.basename(file.path, path.extname(file.path))) + '.md'
                var htmlRender = '<!DOCTYPE html>'
                var reactRender = ReactDOMServer.renderToStaticMarkup(React.createElement(App, {html: html, meta: meta, url: url}))
                htmlRender += reactRender
                file.contents = new Buffer(htmlRender)
                callback(null, file)
            }
        }))
        .pipe(rename(function(file) {
            file.dirname = '.'
            file.extname = '.html'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream())
})

gulp.task('watch', function() {
    gulp.watch('src/assets/js/**/*.js', ['js'])
    gulp.watch('src/assets/sass/**/*.scss', ['css'])
    gulp.watch('src/data/**/*.md', ['html'])
    gulp.watch('dist/**/*').on('change', browserSync.reload)
})

gulp.task('browser-sync', ['js', 'css', 'html'], function() {
    browserSync.init({
        server: './dist'
    })
})

gulp.task('publish', ['js', 'css', 'html'], function() {
    buildBranch({
        branch: 'gh-pages',
        remote: 'origin',
        ignore: ['.git', 'dist', 'node_modules'],
        folder: 'dist'
    }, function(err) {
        if(err) {
            throw err
        }
        console.log('Published!')
    })
})

gulp.task('dev', ['browser-sync', 'watch'])
gulp.task('default', ['publish'])
