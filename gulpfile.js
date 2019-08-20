'use strict';

var gulp = require('gulp'); //carrega o modulo instalado e armazena nesta variavel
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var browserSync = require('browser-sync');

//tarefinha
gulp.task('sass', function() {
    return gulp.src('./src/sass/**/*.scss') //pega os arquivos de origem 
        .pipe(sass().on('error', sass.logError)) //faz um tratamento utilizando o gulp-sass
        .pipe(gulp.dest('./src/css')); //manda pra saida
})

gulp.task('css', function() {
    gulp.src('./src/css/*.css')
        .pipe(uglifycss({
            "uglyComments": true
        }))
        .pipe(gulp.dest('./dist/'));
})

//monitorando arquivos
// gulp.task('listen', function() {
//     gulp.watch('./src/sass/**/*.scss', gulp.series('sass')); //arquivos que serao monitorados e se for executado uma alteração ele roda a tarefa anterior
//     gulp.watch('./src/css/*.css', gulp.series('css'))
// });

//reload
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    })

    gulp.watch('./src/**/*').on('change', browserSync.reload);

})
