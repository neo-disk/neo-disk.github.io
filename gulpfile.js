const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const del = require('del');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const pug = require('gulp-pug');
const cached = require('gulp-cached');
const gcmq = require('gulp-group-css-media-queries');

const folder = process.env.NODE_ENV === 'production' ? 'build' : 'dev_build';

const pugToHtml = () => {
  return gulp.src('source/pug/pages/*.pug')
      .pipe(plumber())
      .pipe(pug({ pretty: true }))
      .pipe(cached('pug'))
      .pipe(gulp.dest(`${folder}`));
};

const css = () => {
  return gulp.src('source/sass/style.scss')
      .pipe(plumber())
      .pipe(sourcemap.init())
      .pipe(sass())
      .pipe(postcss([autoprefixer({
        grid: true,
      })]))
      .pipe(gcmq()) // выключите, если в проект импортятся шрифты через ссылку на внешний источник
      .pipe(gulp.dest(`${folder}/css`))
      .pipe(csso())
      .pipe(rename('style.min.css'))
      .pipe(sourcemap.write('.'))
      .pipe(gulp.dest(`${folder}/css`))
      .pipe(server.stream());
};

const js = () => {
  return gulp.src(['source/js/main.js'])
      .pipe(webpackStream(webpackConfig))
      .pipe(gulp.dest(`${folder}/js`))
};

const svgo = () => {
  return gulp.src('source/img/**/*.{svg}')
      .pipe(imagemin([
        imagemin.svgo({
            plugins: [
              {removeViewBox: false},
              {removeRasterImages: true},
              {removeUselessStrokeAndFill: false},
            ]
          }),
      ]))
      .pipe(gulp.dest('source/img'));
};

const sprite = () => {
  return gulp.src('source/img/sprite/*.svg')
      .pipe(svgstore({inlineSvg: true}))
      .pipe(rename('sprite_auto.svg'))
      .pipe(gulp.dest(`${folder}/img`));
};

const copySvg = () => {
  return gulp.src('source/img/**/*.svg', {base: 'source'})
      .pipe(gulp.dest(`${folder}`));
};

const copyImages = () => {
  return gulp.src('source/img/**/*.{png,jpg,webp}', {base: 'source'})
      .pipe(gulp.dest(`${folder}`));
};

const optimizeImages = () => {
  return gulp.src(`${folder}/img/**/*.{png,jpg}`)
      .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
      ]))
      .pipe(gulp.dest(`${folder}/img`));
};

// Используйте отличное от дефолтного значение root, если нужно обработать отдельную папку в img,
// а не все изображения в img во всех папках.

// root = '' - по дефолту webp добавляются и обналяются во всех папках в source/img/
// root = 'content/' - webp добавляются и обновляются только в source/img/content/

const createWebp = () => {
  const root = '';
  return gulp.src(`source/img/${root}**/*.{png,jpg}`)
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest(`source/img/${root}`));
};

const copy = () => {
  return gulp.src([
    'source/fonts/**',
    'source/img/**',
    'source/data/**',
    'source/favicons/**',
    'source/video/**',
    'source/downloads/**',
    'source/*.php',
  ], {
    base: 'source',
  })
      .pipe(gulp.dest(`${folder}`));
};

const clean = () => {
  return del(`${folder}`);
};

const syncServer = () => {
  server.init({
    server: `${folder}/`,
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch('source/pug/**/*.pug', gulp.series(pugToHtml, refresh));
  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series(css));
  gulp.watch('source/js/**/*.{js,json}', gulp.series(js, refresh));
  gulp.watch('source/data/**/*.{js,json}', gulp.series(copy, refresh));
  gulp.watch('source/img/**/*.svg', gulp.series(copySvg, sprite, pugToHtml, refresh));
  gulp.watch('source/img/**/*.{png,jpg,webp}', gulp.series(copyImages, pugToHtml, refresh));

  gulp.watch('source/favicon/**', gulp.series(copy, refresh));
  gulp.watch('source/video/**', gulp.series(copy, refresh));
  gulp.watch('source/downloads/**', gulp.series(copy, refresh));
  gulp.watch('source/*.php', gulp.series(copy, refresh));
};

const refresh = (done) => {
  server.reload();
  done();
};

const start = gulp.series(clean, svgo, copy, css, sprite, js, pugToHtml, syncServer);

const build = gulp.series(clean, svgo, copy, css, sprite, js, pugToHtml, optimizeImages);

exports.imagemin = optimizeImages;
exports.webp = createWebp;
exports.start = start;
exports.build = build;
