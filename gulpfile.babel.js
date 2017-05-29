'use strict'

var args = require('yargs').argv
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
var createReactApp = require('./src/assets/js/app.js')

var prod = args.prod
if (prod) {
    var baseUrl = 'https://boxydev.github.io/WikiDoc/'
} else {
    var baseUrl = 'http://localhost:3000/'
}

gulp.task('css', function() {
    return gulp.src('src/assets/sass/**/*.scss')
        .pipe(sass({outputStyle: (prod) ? 'compressed' : 'nested'}).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('js', function() {
    return browserify({
            entries: './src/assets/js/client.js'
        }).transform('babelify', { presets: ['es2015', 'react'] })
        .bundle()
        .pipe(source('client.js'))
        .pipe(buffer())
        .pipe(uglify({
            mangle: false,
            compress: false
        }))
        .pipe(rename('app.js'))
        .pipe(gulp.dest('./dist/js'))
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
                var relativePath = path.join(path.dirname(path.relative(file.cwd, file.path)), path.basename(file.path, path.extname(file.path)))
                var sourceUrl = relativePath + '.md'
                var url = '/' + path.relative('src/data/pages/', relativePath) + '.html'
                var htmlRender = '<!DOCTYPE html>'
                var reactRender = createReactApp({ html: html, meta: meta, baseUrl: baseUrl, sourceUrl: sourceUrl, url: url })
                htmlRender += reactRender
                file.contents = new Buffer(htmlRender)
                callback(null, file)
            }
        }))
        .pipe(rename(function(file) {
            file.dirname = './' + path.relative('pages', file.dirname)
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream())
})

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch(['src/assets/js/**/*.js'], ['js', 'html'])
    gulp.watch(['src/data/**/*.md'], ['html'])
    gulp.watch(['src/assets/sass/**/*.scss'], ['css'])
    gulp.watch('dist/**/*').on('change', browserSync.reload)
})

gulp.task('browser-sync', ['css', 'js', 'html'], function() {
    browserSync.init({
        server: './dist'
    })
})

gulp.task('publish', ['css', 'js', 'html'], function() {
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

gulp.task('dev', ['watch'])
gulp.task('default', ['publish'])
