var gulp = require('gulp');
var markdown = require('gulp-markdown');
var browserSync = require('browser-sync').create();
var buildBranch = require('buildbranch');
var nunjucksRender = require('gulp-nunjucks-render');

gulp.task('markdown', function() {
    return gulp.src('src/**/*.{md,html}')
        //.pipe(markdown())
        .pipe(nunjucksRender({
            path: 'templates',
            data: {
                name: 'Matthieu'
            }
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('dev', ['markdown'], function() {
    browserSync.init({
        server: './dist'
    });
    gulp.watch('src/**/*.{md,html}', ['markdown']);
    gulp.watch('dist/*.html').on('change', browserSync.reload);
    console.log('Lance le serveur');
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

gulp.task('default', ['markdown', 'publish']);
