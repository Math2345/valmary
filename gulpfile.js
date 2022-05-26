var gulp         = require('gulp'), // Подключаем Gulp
    gutil        = require('gulp-util'),
    // ftp          = require('vinyl-ftp'),
    sass         = require('gulp-sass'),
    pug          = require('gulp-pug'), // Подключаем pug
    browserSync  = require('browser-sync'), // Подключаем Browser Sync
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    babel        = require('gulp-babel'),//Подлючаем библиотеку для перевода js в старый формат es5
    uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    postcss      = require('gulp-postcss'),
    pixelstorem  = require('postcss-pixels-to-rem'),
    cached       = require('gulp-cached'),
    dependents   = require('gulp-dependents');

let pathBuild = './app/';

gulp.task('sass', function() { // Создаем таск Sass
    var plugins = [
        pixelstorem()
    ];
    return gulp.src(['app/sass/**/*.sass', 'app/assets/libs/**/*.sass']) // Берем источник
        .pipe(cached('sass'))
        .pipe(dependents())
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(postcss(plugins))
        // .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(autoprefixer(['last 15 versions', '> 1%'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('app/assets/css')) // Выгружаем результат в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({
        server: pathBuild
    });
});

gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'app/assets/libs/jquery/jquery.min.js',
        'app/assets/libs/owl.carousel/dist/owl.carousel.js',
        'app/assets/libs/fancybox/dist/fancybox.js',
        // 'app/assets/libs/device/device.js',
        'app/assets/libs/mask/jquery.mask.js',
        'app/assets/libs/slick/slick.min.js',
        // 'app/assets/libs/wow/wow.js',
        // 'app/assets/js/common.js'
        ])
        .pipe(babel({
          presets: ["@babel/preset-env"]
        }))
        .pipe(concat('scripts.min.js')) // Собираем их в кучу в новом файле
        .pipe(browserSync.reload({stream: true}))
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/assets/js')); // Выгружаем в папку app/js
});

gulp.task('code', function() {
    return gulp.src('app/**/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('clean', async function() {
    return del.sync('public_html'); // Удаляем папку public_html перед сборкой
});

gulp.task('pug', function () {
    return gulp.src(["app/pug/*.+(jade|pug)", "!app/pug/layout.pug"])
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('app/'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('img', function() {
    return gulp.src('app/assets/image/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({ // С кешированием
        // .pipe(imagemin({ // Сжимаем изображения без кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))/**/)
        .pipe(gulp.dest('public_html/assets/image')); // Выгружаем на продакшен
});

gulp.task('upload', function() {
    return gulp.src(['app/assets/upload/*', '!app/assets/upload/*.mp4']) // Берем все изображения из app
        .pipe(cache(imagemin({ // С кешированием
        // .pipe(imagemin({ // Сжимаем изображения без кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('public_html/assets/upload')); // Выгружаем на продакшен
});

gulp.task('prebuild', async function() {

    var buildCss = gulp.src([ // Переносим библиотеки в продакшен
        'app/assets/css/main.min.css'
        ])
    .pipe(gulp.dest('public_html/assets/css'))

    var buildFonts = gulp.src('app/assets/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('public_html/assets/fonts'))

    var buildJs = gulp.src('app/assets/js/scripts.min.js') // Переносим скрипты в продакшен
    .pipe(gulp.dest('public_html/assets/js'))

    var buildHtml = gulp.src(['app/**/*.html', "!app/layout.html", "!app/footer.html", "!app/header.html"]) // Переносим HTML в продакшен
    .pipe(gulp.dest('public_html'));

});

gulp.task('clear', function (callback) {
    return cache.clearAll();
})

gulp.task('deploy', function(){

    var conn = ftp.create({
        host:     'incomycm.beget.tech',
        user:     'incomycm_astongulp',
        password: 'Asubeb57!',
        parallel: 10,
        log:      gutil.log
    });

    var globs = [
        'public_html/assets/css/**/*.*',
        'public_html/assets/fonts/**/*.*',
        'public_html/assets/image/**/*.*',
        'public_html/assets/js/**/*.*',
        'public_html/assets/libs/**/*.*',
        'public_html/assets/upload/**/*.*'
    ];

    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance

    return gulp.src(globs, {base:'public_html/assets/', buffer: false})
        .pipe(conn.newer('public_html/assets')) // only upload newer files
        .pipe(conn.dest('public_html/assets'));
});

gulp.task('watch', function() {
    gulp.watch('app/pug/**/*.pug', gulp.parallel('pug'));
    gulp.watch('app/sass/**/*.sass', gulp.parallel('sass')); // Наблюдение за sass файлами
    gulp.watch(['app/assets/js/common.js', 'app/assets/libs/**/*.js'], gulp.parallel('scripts')); // Наблюдение за главным JS файлом и за библиотеками
});
gulp.task('default', gulp.parallel('pug', 'sass', 'scripts', 'browser-sync', 'watch'));
gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'upload', 'sass', 'scripts'));
