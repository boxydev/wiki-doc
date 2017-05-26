var gulp = require('gulp');
var markdown = require('gulp-markdown');
var browserSync = require('browser-sync').create();
var buildBranch = require('buildbranch');
var nunjucksRender = require('gulp-nunjucks-render');
var sass = require('gulp-sass');

gulp.task('css', function() {
    return gulp.src('src/assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

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

gulp.task('dev', ['css', 'markdown'], function() {
    browserSync.init({
        server: './dist'
    });
    gulp.watch('src/**/*.{md,html}', ['markdown']);
    gulp.watch('src/assets/sass/**/*.scss', ['css']);
    gulp.watch('dist/**/*').on('change', browserSync.reload);
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

gulp.task('default', ['css', 'markdown', 'publish']);
