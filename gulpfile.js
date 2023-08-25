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
    .pipe(dest('.'))
   
}

exports.default = series(buildBundle)