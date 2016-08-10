'use strict'

var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    csscomb = require('gulp-csscomb'),
    useref = require('gulp-useref'),
    wiredep = require('wiredep').stream,
    sourcemaps = require('gulp-sourcemaps'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    sftp = require('gulp-sftp'),
    pug = require('gulp-pug'),
    size = require('gulp-size'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    prettify = require('gulp-prettify');

// Запуск BROWSERSYNC
gulp.task('server', ['pug', 'stylus'], function () {
    browserSync.init({
        server: "app",
        port: 9000
    });
});

//Добавляет библиотеки BOWER в Pug(Jade)
gulp.task('bower', function () {
    return gulp.src('app/templates/common/*.pug')
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest('app/templates/common'))
});

// Компиляция Pug(Jade) файлов в HTML
gulp.task('pug', function () {
    return gulp.src('app/templates/pages/*.pug')
        .pipe(changed('app/'))
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(pug())
        .pipe(prettify({indent_size: 4}))
        .pipe(gulp.dest('app/'))
        .pipe(browserSync.stream());
});

// Компиляция stylus файлов в CSS
gulp.task('stylus', function () {
    return gulp.src('app/stylus/**/main.styl')
        .pipe(changed('app/css'))
    // Не прерывает поток, выводит ошибку
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sourcemaps.init())
        .pipe(stylus({ use: nib(),  import: ['nib']}))
        // Приводит к единообразному виду CSS
        .pipe(csscomb())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

// Слежка за файлами
gulp.task('watch', function () {
    gulp.watch('app/templates/**/*.*', ['pug']);
    gulp.watch('app/stylus/**/*.*', ['stylus']);
    gulp.watch('bower.json', ['bower']);
    gulp.watch(["app/js/**/*.js",
        "app/css/**/*.css",
        "app/**/*.html"
        ]).on("change", reload);
});

gulp.task('default', ['server', 'watch']);

// Очищает папку 'public'
gulp.task('clean', function () {
    return del('public/**/*');
});

// Собирает в папку 'public' картинки
gulp.task('copy:img', function () {
    return gulp.src('app/img/**/*')
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('public/img'));

});

// Собирает в папку 'public' шрифты
gulp.task('copy:fonts', function () {
    gulp.src('app/fonts/*.*')
        .pipe(gulp.dest('public/fonts/'))
});

// Собирает в папку 'public' остальные файлы(например favicon.ico)
gulp.task('extras', function () {
    return gulp.src(['app/*.*', '!app/*.html'])
        .pipe(gulp.dest('public'))
});

// Сборка и минификация всех js, css в папку public
gulp.task('useref', function () {
    return gulp.src('app/*.html')
    //Собирает все js и css в файлы main and vendor
        .pipe(useref())
        //Минифицирует js
        .pipe(gulpif('*.js', uglify()))
        //Минифицирует css
        .pipe(gulpif('*.css', cleanCSS({compatibility: 'ie8'})))
        .pipe(gulp.dest('public'));
});

// Сборка папки public и вывод размера этой папки
gulp.task('public', ['useref', 'copy:img', 'copy:fonts', 'extras'], function () {
    return gulp.src('public/**/*')
        .pipe(size({title: 'build'}))
});

// Сборка папки public только после ее очистки и компиляции Pug(Jade) Stylus файлов
gulp.task('build', ['clean', 'pug', 'stylus'], function () {
    gulp.start('public');
});

// Отправка папки public на сервер
gulp.task('sftp', function () {
    return gulp.src('public/**/*')
        .pipe(sftp({
            host: 'website.com',
            user: 'johndoe',
            pass: '1234',
            remotePath: 'httn/hhh/'
        }));
});





