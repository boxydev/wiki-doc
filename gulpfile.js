var gulp = require('gulp');
var markdown = require('gulp-markdown');

gulp.task('markdown', function() {
    return gulp.src('src/*.md')
        .pipe(markdown())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', function() {
  // place code for your default task here
});
