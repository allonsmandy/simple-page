'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var include = require('gulp-file-include');
var browserSync = require('browser-sync');

gulp.task('copy', function() {
    gulp.src(['src/components/**/*', 'src/css/**/*', 'src/javascript/**/*', 'src/imagens/**/*'], {"base": "src"})
        .pipe(gulp.dest('dist'))
})


gulp.task('sass', function() {
    return gulp.src('./src/sass/**/*.scss') 
        .pipe(sass().on('error', sass.logError)) 
        .pipe(gulp.dest('./dist/css/')); 

})

gulp.task('css', function() {
    gulp.src('./src/css/*.css')
        .pipe(uglifycss({
            "uglyComments": true
        }))
        .pipe(gulp.dest('./dist/css/'));
})

gulp.task('listen', function() {
    gulp.watch('./src/sass/**/*.scss', gulp.series('sass')); //arquivos que serao monitorados e se for executado uma alteração ele roda a tarefa anterior
    gulp.watch('./src/css/*.css', gulp.series('css'))
});

gulp.task('html', function(){
    return gulp.src('./src/**/*.html')
        .pipe(include())
        .pipe(gulp.dest('./dist/'))
})

//reload
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })

    gulp.watch('./dist/**/*').on('change', browserSync.reload);
    gulp.watch('./src/**/*.html', gulp.series('html'))
})
