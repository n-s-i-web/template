var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    spritesmith = require('gulp.spritesmith'),
    livereload = require('gulp-livereload');

gulp.task('less', function(){
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['ie >= 10', 'Firefox >= 15', 'Chrome >= 15', 'Opera >= 12.17'],
            cascade: false
        }))
        .pipe(gulp.dest('../css'));
});

gulp.task('sprite', function() {
    var spriteData =
        gulp.src('sprites/*.*')
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprites.less',
                imgPath: '../img/sprite.png',
                cssFormat: 'less',
                algorithm: 'binary-tree',
                cssTemplate: 'less/dev/less.template.mustache',
                padding: 10
            }));

    spriteData.img.pipe(gulp.dest('../img/'));
    spriteData.css.pipe(gulp.dest('less/dev/'));
});

gulp.task('watch', function(){
    livereload.listen();
    gulp.watch(['../css/*.css', '../*.php', '../js/*.js']).on('change', livereload.changed);
    gulp.watch('less/**/*.less', ['less']);
    gulp.watch('sprites/*.*', ['sprite']);
});

gulp.task('default', ['watch']);