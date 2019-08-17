// 'use strict'
// const gulp = require('gulp');
// const $ = require('gulp-load-plugins')({lazy: true});
// const config = require('./gulp.config')();
// const del = require('del');
// const compress = require('gulp-compress')(gulp);
// const zip = require('gulp-zip');
// gulp.task('help', $.taskListing);
// gulp.task('default',['help']);

// gulp.task('codecheck',function(){
//     console.log('Analyzing source');
//     return gulp
//         .src(config.alljs)
//         .pipe($.jscs())
//         .pipe($.jshint())
//         .pipe($.jshint.reporter('jshint-stylish', {verbose: true}));
// });


// gulp.task('pack', function(){
//     console.log('packing files...')
//     return gulp.src(config.src)
//         .pipe(zip('web.zip'))
//         .pipe(gulp.dest(config.dist));
// });

// gulp.task('build-clean', function(){
//     console.log('deleting build dir...');
//     del(config.buildFolder);
//     del(config.dist);
// })
// // gulp.task('compile-scss', function(){
// //     console.log('Compiling scss files')
// //     return gulp.src(config.scss)
// //         .pipe($.scss(
// //             {"bundleExec": true}
// //             ))
// //         .pipe(gulp.dest(config.scssDest));
// // })

// gulp.task('build',['build-clean'],function(){
//     console.log("Building procject...")
    
// });

// gulp.task('start-test', function(){
//     var karma = require('karma')
// })