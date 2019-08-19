var gulp = require('gulp'); //carrega o modulo instalado e armazena nesta variavel
var sass = require('gulp-sass');

//tarefinha
gulp.task('sass', function() {
    gulp.src('./src/sass/**/*.scss') //pega os arquivos de origem 
        .pipe(sass()) //faz um tratamento utilizando o gulp-sass
        .pipe(gulp.dest('./src/css/')); //manda pra saida
})

//monitorando arquivos
gulp.task('listen', function() {
    gulp.watch('./src/sass/**/*.scss', ['sass']); //arquivos que serao monitorados e se for executado uma alteração ele roda a tarefa anterior
});
