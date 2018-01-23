/// <binding AfterBuild='moveHtml' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');

gulp.task('default', () => { });

gulp.task('nmp', () => {
    gulp.src("node_modules/typed-lexer/**/*.*").pipe(gulp.dest("src/lib/typed-lexer"));
    gulp.src("node_modules/typed-lexer/**/*.*").pipe(gulp.dest("wwwroot/lib/typed-lexer"));

});

gulp.task('moveHtml', () => {
    gulp.src("src/**/*.html").pipe(gulp.dest("wwwroot"));
    gulp.src("src/**/*.js").pipe(gulp.dest("wwwroot"));
    gulp.src("src/**/*.ts").pipe(gulp.dest("wwwroot"));
    gulp.src("src/**/*.js.map").pipe(gulp.dest("wwwroot"));
    gulp.src("src/**/*.txt").pipe(gulp.dest("wwwroot"));
    gulp.src("src/**/*.css").pipe(gulp.dest("wwwroot"));
}
);