var gulp = require('gulp'),
	less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
    uglifycss = require('gulp-uglifycss'),
    spritesmith = require('gulp.spritesmith');

gulp.task('less', function(){
    gulp.src('src/less/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['ie >= 7', 'Firefox >= 3.6', 'Chrome >= 5', 'Opera >= 10.10'],
            cascade: false
        }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('sprite', function() {
    var spriteData =
        gulp.src('src/sprites/*.*')
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprites.less',
                cssFormat: 'less',
                algorithm: 'binary-tree',
                cssTemplate: 'src/less/dev/less.template.mustache',
                padding: 10
            }));

    spriteData.img.pipe(gulp.dest('dist/img/'));
    spriteData.css.pipe(gulp.dest('src/less/dev'));
});

gulp.task('cssmin', function(){
    gulp.src('dist/css/*.css')
        .pipe(uglifycss())
        .pipe(gulp.dest('dist/css/min'));
});

gulp.task('watch', function(){
    gulp.watch('src/less/**/*.less', ['less']);
    gulp.watch('src/sprites/*.*', ['sprite']);
});

gulp.task('default', ['watch']);