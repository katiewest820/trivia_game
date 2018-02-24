var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var babel = require('gulp-babel');
 
gulp.task('compress', function (cb) {
  pump([
        gulp.src('dist/index.js'),
        uglify(),
        gulp.dest('dist/uglifyindex.js')
    ],
    cb
  );
});
 
gulp.task('babel', () =>
    gulp.src('index.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist'))
);