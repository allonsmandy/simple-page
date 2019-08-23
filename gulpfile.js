'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var include = require('gulp-file-include');
var clean = require('gulp-clean')
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');

// Limpa a pasta dist
gulp.task('clean', function(){
    return gulp.src('dist')
        .pipe(clean());
})

//faz a copia da pasta src para a dist
gulp.task('copy', function() {
    return gulp.src([
            'src/components/**/*', 
            'src/css/**/*', 
            'src/javascript/**/*', 
            'src/imagens/**/*'], 
            {"base": "src"})
        .pipe(gulp.dest('dist'))
})

// pega o código sass e coloca na pasta destino de css
gulp.task('sass', function() {
    return gulp.src('./src/sass/**/*.scss') 
        .pipe(sass()) 
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/css/')); 
})


gulp.task('listen', function() {
    gulp.watch('./src/sass/**/*.scss', gulp.series('sass')); //arquivos que serao monitorados e se for executado uma alteração ele roda a tarefa anterior
    gulp.watch('./src/**/*.html', gulp.series('html'))
    gulp.watch('./src/javascript/**/*', gulp.series('buildjs'))
});

//faz includes e tratamentos com o arquivos html
gulp.task('html', function(){
    return gulp.src([
        './src/**/*.html',
        '!/src/inc/**'
    ])
        .pipe(include())
        .pipe(gulp.dest('./dist/'))
})

// melhora a performance das imagens
gulp.task('imagemin', function() {
    return gulp.src('./src/imagens/**/*')
           .pipe(imagemin())
           .pipe(gulp.dest('./dist/imagens/'))
})

// faz o tratamento performático nos arquivos de javascript
gulp.task('buildjs', function() {
    return gulp.src('./src/javascript/**/*')
        .pipe(concat('app.min.js'))
        .pipe(uglify()) //minifica :3
        .pipe(gulp.dest('./dist/javascript/'))
})

gulp.task('default', gulp.series('copy', gulp.parallel('imagemin', 'sass', 'buildjs')), function(done) {
    done()
})

//servidorzinho :3
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })

    gulp.watch('./dist/**/*').on('change', browserSync.reload);
    // gulp.watch('./src/sass/**/*.scss', gulp.series('sass'))
    // gulp.watch('./src/**/*.html', gulp.series('html'))
    // gulp.watch('./src/javascript/**/*', gulp.series('buildjs'))
})
