const { src, dest, watch, series, parallel } = require("gulp");
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
    .pipe(dest('publick/src'))
   
}

exports.buildBundle = buildBundle;