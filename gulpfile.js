var gulp = require('gulp');
var markdown = require('gulp-markdown');
var buildBranch = require('buildbranch');

gulp.task('markdown', function() {
    return gulp.src('src/*.md')
        .pipe(markdown())
        .pipe(gulp.dest('dist'));
});

gulp.task('build', function() {
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

gulp.task('default', ['markdown', 'build']);
