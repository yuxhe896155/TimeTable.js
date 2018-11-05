const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const webpackStream = require("webpack-stream");
const webpack = require("webpack");

const webpackConfig = require("./webpack.config");

//gulp webpackで実行
gulp.task("webpack", ()=>{
    return webpackStream(webpackConfig, webpack)
        .pipe(gulp.dest("./dist")); 
});

//変更監視
//gulp.task("watch", ()=>{
//    gulp.watch("./modules/**/*", ["webpack", "bs-reload"]);
//});


gulp.task("browser-sync", ()=>{
    browserSync.init({
        server: {
            baseDir: "./",
            index: "index.html"
        }
    });
});

gulp.task("bs-reload", ["webpack"], ()=> {
    browserSync.reload();
});

// ファイルの更新をwatch
gulp.task("default", ["browser-sync"], ()=>{
    gulp.watch("./modules/**/*", ["bs-reload"]);
    gulp.watch("./index.html",   ["bs-reload"]);
});