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
const responsive = require('gulp-responsive')

const outputFolder = process.env.NODE_ENV === 'production' ? 'docs' : 'dev_build';

const pugToHtml = () => {
  return gulp.src('source/pug/pages/*.pug')
      .pipe(plumber())
      .pipe(pug({ pretty: true }))
      .pipe(cached('pug'))
      .pipe(gulp.dest(`${outputFolder}`));
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
      .pipe(gulp.dest(`${outputFolder}/css`))
      .pipe(csso())
      .pipe(rename('style.min.css'))
      .pipe(sourcemap.write('.'))
      .pipe(gulp.dest(`${outputFolder}/css`))
      .pipe(server.stream());
};

const js = () => {
  return gulp.src(['source/js/main.js'])
      .pipe(webpackStream(webpackConfig))
      .pipe(gulp.dest(`${outputFolder}/js`))
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
      .pipe(gulp.dest(`docs/img`));
};

const copySvg = () => {
  return gulp.src('source/img/**/*.svg', {base: 'source'})
      .pipe(gulp.dest(`${outputFolder}`));
};

const copyImages = () => {
  return gulp.src('source/img/**/*.{png,jpg,webp}', {base: 'source'})
      .pipe(gulp.dest(`${outputFolder}`));
};

/** @link https://gist.github.com/OleVik/f2c8b51a7153743b13607072c27cf8d2 **/
const generateResponsiveImages = () => {
  return gulp
      .src(`source/img/**/*.png`)
      .pipe(
          responsive({
            // produce multiple images from one source
            'background-main.png': [
              {
                width: 1023,
                rename: { suffix: '@2x' }
              },
              {
                width: 767,
              },
              {
                width: 449,
                rename: { suffix: '-mobile@2x' }
              },
              {
                width: 374,
                rename: { suffix: '-mobile' }
              },
            ]
          }, {
            quality: 70,
            progressive: true,
            withMetadata: false,
            skipOnEnlargement: true,
            errorOnUnusedConfig: false,
            errorOnUnusedImage: false,
            errorOnEnlargement: false
          })
      )
      .pipe(gulp.dest(`${outputFolder}/img`))
}

const optimizeImages = () => {
  return gulp.src(`${outputFolder}/img/**/*.{png,jpg}`)
      .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
      ]))
      .pipe(gulp.dest(`${outputFolder}/img`));
};

const createWebp = () => {
  return gulp.src(`${outputFolder}/img/**/*.{png,jpg}`)
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest(`${outputFolder}/img/`));
};

const copy = () => {
  return gulp.src([
    'source/fonts/**',
    'source/img/**',
    'source/data/**',
    'source/favicons/**',
    'source/video/**',
    'source/downloads/**',
    'source/files/**',
  ], {
    base: 'source',
  })
      .pipe(gulp.dest(`${outputFolder}`));
};

const copyCNAME = () => {
  return gulp.src('CNAME', {
    base: '',
  })
      .pipe(gulp.dest(`${outputFolder}`));
};

const copyYandexVerificationFile = () => {
  return gulp.src('yandex_9f86d2912df42f84.html', {
    base: '',
  })
      .pipe(gulp.dest(`${outputFolder}`));
};

const clean = () => {
  return del(`${outputFolder}`);
};

const syncServer = () => {
  server.init({
    server: `${outputFolder}/`,
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
  gulp.watch('source/img/**/*.{png,jpg,webp}', gulp.series(copyImages, generateResponsiveImages, createWebp, pugToHtml, refresh));

  gulp.watch('source/favicon/**', gulp.series(copy, refresh));
  gulp.watch('source/video/**', gulp.series(copy, refresh));
  gulp.watch('source/downloads/**', gulp.series(copy, refresh));
  gulp.watch('source/files/**', gulp.series(copy, refresh));
};

const refresh = (done) => {
  server.reload();
  done();
};

const start = gulp.series(
    clean,
    svgo,
    copy,
    generateResponsiveImages,
    createWebp,
    css,
    sprite,
    js,
    pugToHtml,
    syncServer
);

const build = gulp.series(
    clean,
    svgo,
    copy,
    generateResponsiveImages,
    createWebp,
    copyCNAME,
    copyYandexVerificationFile,
    css,
    sprite,
    js,
    pugToHtml
);

exports.imagemin = optimizeImages;
exports.start = start;
exports.build = build;
