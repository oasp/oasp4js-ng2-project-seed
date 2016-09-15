'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');
var sourceMaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var processHtml = require('gulp-processhtml');
var historyApiFallback = require('connect-history-api-fallback');
var currentTsTranspiler = require('typescript');
var tsProject = ts.createProject({
  // these settings comes from
  target: 'es5',
  module: 'commonjs',
  moduleResolution: 'node',
  emitDecoratorMetadata: true,
  experimentalDecorators: true,
  removeComments: false,
  noImplicitAny: true,
  suppressImplicitAnyIndexErrors: true,

  declaration: false,
  noExternalResolve: false,
  typescript: currentTsTranspiler
});

var config = function () {
  var
    devMode = true,
    appDir = 'app',
    devDir = '.tmp',
    prodDir = 'dist',
    mainLessPath = 'styles.less',
    lessComponentSources = 'app/**/*.component.less',
    currentDistDir = devMode ? devDir : prodDir;

  return {
    setForProd: function () {
      devMode = false;
    },
    setForDev: function () {
      devMode = true;
    },
    tmpDir: devDir,
    isDev: devMode,
    transpiledAppDir: devDir + '/' + appDir,
    cssDir: currentDistDir + '/' + 'css',
    fontsDir: currentDistDir + '/' + 'fonts',
    mainLessPath: mainLessPath,
    mainHtmlPath: 'index.html',
    tsSources: 'app/**/*.ts',
    templateSources: 'app/**/*.html',
    lessSourcesExceptComponentOnes: [mainLessPath, 'app/**/*.less', '!' + lessComponentSources],
    lessComponentSources: lessComponentSources,
    currentDistDir: currentDistDir
  };
}();

gulp.task('copy-favicon-icon', function () {
  return gulp.src('favicon.ico')
    .pipe(gulp.dest(config.currentDistDir));
});

gulp.task('copy-bootstrap-fonts', function () {
  return gulp.src('node_modules/bootstrap-css-only/fonts/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest(config.fontsDir));
});

gulp.task('copy-templates', function () {
  gulp.src(config.templateSources)
    .pipe(gulp.dest(config.transpiledAppDir));
});

gulp.task('compile-main-less-and-copy-it', function () {
  return gulp.src(config.mainLessPath)
    .pipe(less())
    .pipe(gulp.dest(config.cssDir))
    .pipe(browserSync.stream());
});

gulp.task('compile-component-less-styles-and-copy-them', function () {
  return gulp.src(config.lessComponentSources)
    .pipe(less())
    .pipe(gulp.dest(config.transpiledAppDir));
});

gulp.task('process-main-html-and-copy-it', function () {
  return gulp.src(config.mainHtmlPath)
    .pipe(processHtml({environment: 'dev'}))
    .pipe(gulp.dest(config.currentDistDir));
});

gulp.task('transpile-ts-to-js', ['copy-templates', 'compile-component-less-styles-and-copy-them'], function () {
  var tsResult = gulp.src(config.tsSources)
    .pipe(sourceMaps.init())
    .pipe(ts(tsProject));

  return tsResult.js
    .pipe(sourceMaps.write('.', {
      includeContent: false,
      sourceRoot: '/app'
    }))
    .pipe(gulp.dest(config.transpiledAppDir));
});

gulp.task('reload-browser-after-transpilation', ['transpile-ts-to-js'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('reload-browser-after-processing-main-html', ['process-main-html-and-copy-it'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('serve', ['transpile-ts-to-js', 'process-main-html-and-copy-it', 'compile-main-less-and-copy-it', 'copy-bootstrap-fonts', 'copy-favicon-icon'], function () {
  browserSync.init({
    online: false,
    ghostMode: false,
    server: {
      baseDir: [config.currentDistDir],
      routes: {
        '/node_modules': 'node_modules',
        '/systemjs.config.js': 'systemjs.config.js',
        '/app': 'app' // for getting TypeScript sources from within source maps
      },
      middleware: [ historyApiFallback() ] // to return index.html while refreshing or bookmarking (HTML5 navigation)
    }
  });

  gulp.watch([config.tsSources, config.templateSources, config.lessComponentSources], ['reload-browser-after-transpilation']);
  gulp.watch([config.lessSourcesExceptComponentOnes], ['compile-main-less-and-copy-it']);
  gulp.watch([config.mainHtmlPath], ['reload-browser-after-processing-main-html']);
});

gulp.task('clean', function () {
  return gulp.src([config.tmpDir, 'app/**/*.js', 'app/**/*.js.*'], {read: false})
    .pipe(clean({force: true}));
});
