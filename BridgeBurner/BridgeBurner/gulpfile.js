/// <binding AfterBuild='moveHtml' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');

gulp.task('default', () => { });


gulp.task('moveNpmStuff', () => {
    gulp.src("node_modules/handlebars/**/*.*").pipe(gulp.dest("src/lib/handlebars"));
    gulp.src("node_modules/reflect-metadata/**/*.*").pipe(gulp.dest("src/lib/reflect-metadata"));
}
);



gulp.task('moveHtml', () => {
    gulp.src("src/**/*.html").pipe(gulp.dest("wwwroot"));
    gulp.src("src/**/*.js").pipe(gulp.dest("wwwroot"));
    gulp.src("src/**/*.ts").pipe(gulp.dest("wwwroot"));
    gulp.src("src/**/*.js.map").pipe(gulp.dest("wwwroot"));
    gulp.src("src/**/tsconfig.json").pipe(gulp.dest("wwwroot"));
    gulp.src("src/**/*.txt").pipe(gulp.dest("wwwroot"));
    gulp.src("src/**/*.css").pipe(gulp.dest("wwwroot"));
}
);