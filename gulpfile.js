const { src, dest, watch, series, parallel } = require("gulp");
const uglify = require('gulp-uglify');
const babel = require("gulp-babel");
const concat = require('gulp-concat');

const buildBundle = ()=> {
    return src([
        'src/*.js'
    ])

    .pipe(concat('snakeBundle.js'))
    .pipe(babel({
        presets:["@babel/preset-env"]
    }))
    .pipe(uglify())
    .pipe(dest('public/src'))
   
}

const replaceLibs = () => {
    return src([
        'src/libs/*.js',
        'src/phaser/*.js'
    ])

    .pipe(dest('public/src/libs'))
}

const html = () => {
    return src([
        'index.html'
    ])
    .pipe(dest('public/src'))
}

const assets =() =>{
    return src([
        'assets/**/*.*'
    ])
    .pipe(dest('public/src/assets'))
}

exports.html = html;
exports.buildBundle = buildBundle;
exports.replaceLibs = replaceLibs;

exports.default = series(buildBundle, replaceLibs, assets, html)