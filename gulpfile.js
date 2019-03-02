const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const plumber = require("gulp-plumber");

const webpackConfig = require("./webpack.config");

// Execute gulp webpack
gulp.task("webpack", ()=>{
    console.log("in");
    return gulp.src(["./src/app.js"])
        .pipe(plumber())
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest("./dist")); 
});

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

// watch file update
gulp.task("default", ["browser-sync"], ()=>{
    gulp.watch("./src/**", ["bs-reload"]);
    gulp.watch("./src/**/**", ["bs-reload"]);
    gulp.watch("./index.html",   ["bs-reload"]);
});