'use strict';

// Variaveis
// --------------------------------------------------
var gulp = require('gulp');
var sass = require('gulp-sass');
var include = require('gulp-file-include');
var clean = require('gulp-clean')
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');

// Limpa a pasta dist
// --------------------------------------------------
gulp.task('clean', function(){
    return gulp.src('dist')
        .pipe(clean());
})

// Copia as pastas de src para a pasta dist
// --------------------------------------------------
gulp.task('copy', function() {
    return gulp.src([
            'src/components/**/*', 
            'src/javascript/**/*', 
            'src/imagens/**/*'], 
            {"base": "src"})
        .pipe(gulp.dest('dist'))
})

// Pega todos os arquivos .scss e faz o tratamento, jogando ele em dist/css
// --------------------------------------------------
gulp.task('sass', function() {
    return gulp.src('./src/sass/**/*.scss') 
        .pipe(sass()) //trata o scss para css
        .pipe(autoprefixer()) //adiciona prefixos em regras de css baseado no Can I Use
        .pipe(cssnano()) // otimiza o css
        .pipe(gulp.dest('./dist/css/')); 
})

// Faz as inclusões e tratamentos necessários no html
// --------------------------------------------------
gulp.task('html', function(){
    return gulp.src([
        './src/**/*.html',
        '!/src/inc/**'
    ])
        .pipe(include())
        .pipe(gulp.dest('./dist/'))
})

// Melhora a performance das imagens
// --------------------------------------------------
gulp.task('imagemin', function() {
    return gulp.src('./src/imagens/**/*')
           .pipe(imagemin())
           .pipe(gulp.dest('./dist/imagens/'))
})

// Faz o tratamento performático nos arquivos de javascript
// --------------------------------------------------
gulp.task('buildjs', function() {
    return gulp.src('./src/javascript/**/*')
        .pipe(concat('app.min.js')) //concatena tudo neste arquivo novo
        .pipe(uglify()) //minifica :3
        .pipe(gulp.dest('./dist/javascript/'))
})

// Otimização do svg
// --------------------------------------------------
gulp.task('svgmin', function() {
    return gulp.src(['./src/inc/icons/*.svg', '!./src/inc/icons/*.min.svg'])
        .pipe(imagemin()) //minifica :3
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./src/inc/icons/'))

})

// Executa a task "html" e "copy", depois as demais tarefas em paralelo
// --------------------------------------------------
gulp.task('dist', gulp.series('html', 'copy', gulp.parallel('imagemin', 'sass', 'buildjs')), function(done) {
    done()
})

// Vai ficar escutando os eventos <3
// --------------------------------------------------
gulp.task('listen', function() {
    gulp.watch('./src/sass/**/*.scss', gulp.series('sass')); 
    gulp.watch('./src/**/*.html', gulp.series('html'))
    gulp.watch('./src/javascript/**/*', gulp.series('buildjs'))
    gulp.watch(
        ['./src/inc/icons/*.svg',
        '!./src/inc/icons/*.min.svg'
        ], gulp.series('svgmin'))
});

// Servidor lindinho que dá reload :3
// --------------------------------------------------
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })

    gulp.watch('./dist/**/*').on('change', browserSync.reload);
})
