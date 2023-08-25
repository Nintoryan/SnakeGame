const { src, dest, watch, series, parallel } = require("gulp");
const babel = require("gulp-babel");
const concat = require('gulp-concat');

function js() {
    return src([
        "app/assets/js/scripts.js"
    ])
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(dest("build/assets/js/"))
}

const buildBundle = ()=> {
    return src([
        'src/*.js'
    ])

    .pipe(concat('snakeBundle.js'))
    .pipe(babel({
        presets:["@babel/preset-env"]
    }))
    .pipe(dest('dist/src'))
   
}

exports.buildBundle = buildBundle;