'use strict';

var
  oasp4js = {
    currentAppDir: ''
  },
// gulp, its plugins and some libraries used
  gulp = require('gulp'),
  gulpSync = require('gulp-sync')(gulp),
  Server = require('karma').Server,
  tsLint = require('gulp-tslint'),
  clean = require('gulp-clean'),
  ts = require('gulp-typescript'),
  sourceMaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync').create(),
  less = require('gulp-less'),
  processHtml = require('gulp-processhtml'),
  historyApiFallback = require('connect-history-api-fallback'),
  currentTsTranspiler = require('typescript'),
  Builder = require('systemjs-builder'),
  usemin = require('gulp-usemin'),
  rev = require('gulp-rev'),
  gulpIf = require('gulp-if'),
  cleanCss = require('gulp-clean-css'),
  htmlMin = require('gulp-htmlmin'),

  htmlMinConfig = {
    collapseWhitespace: true,
    caseSensitive: true,
    removeComments: true
  },

// helper functions
  transpileTsToJs = function (sourceRoot) {
    var tsResult = gulp.src(config.tsSources)
      .pipe(sourceMaps.init())
      .pipe(ts(tsProject));

    return tsResult.js
      .pipe(sourceMaps.write('.', {
        includeContent: false,
        sourceRoot: sourceRoot
      }))
      .pipe(gulp.dest(config.transpiledAppDir));
  },

  runKarmaTestsAndWatchForChanges = function (headlessBrowser, done) {
    var karmaConfig = {
      configFile: __dirname + '/karma.conf.js',
      singleRun: false,
      autoWatch: true
    };

    if (headlessBrowser) {
      karmaConfig.browsers = ['PhantomJS'];
    }

    gulp.watch([config.tsSources, config.templateSources, config.lessComponentSources], ['transpile-ts-to-js-4-tests']);
    new Server(karmaConfig, done).start();
  },

// TypeScript project
  tsProject = ts.createProject({
    // these settings comes from tsconfig.json (except for sourceMap; source maps are generated using gulp-sourcemaps)
    target: 'es5',
    module: 'commonjs',
    moduleResolution: 'node',
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    removeComments: false,
    noImplicitAny: true,
    suppressImplicitAnyIndexErrors: true,
    // these settings are specific to gulp-typescript
    declaration: false,
    noExternalResolve: false,
    typescript: currentTsTranspiler
  }),

  polyfillPaths = [
    'node_modules/core-js/client/shim.min.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/zone.js/dist/zone.js'],

// configuration (to be externalized to oasp4js.config.json)
  config = function () {
    var
      devMode = true,
      appDir = 'app',
      devDir = '.tmp',
      prodDir = 'dist',
      mainLessPath = 'styles.less',
      lessComponentSources = 'app/**/*.component.less',
      currentDistDir = function () {
        return devMode ? devDir : prodDir;
      };

    return {
      setForProd: function () {
        devMode = false;
      },
      isProd: function () {
        return !devMode;
      },
      tmpDir: devDir,
      distDir: prodDir,
      isDev: devMode,
      transpiledAppDir: devDir + '/' + appDir,
      cssDir: devDir + '/' + 'css',
      fontsDir: function () {
        return currentDistDir() + '/' + 'fonts';
      },
      mainLessPath: mainLessPath,
      mainHtmlPath: 'index.html',
      tsSources: 'app/**/*.ts',
      tsSources4Test: devDir + '/' + 'app/**/*.ts',
      templateSources: 'app/**/*.html',
      lessSourcesExceptComponentOnes: [mainLessPath, 'app/**/*.less', '!' + lessComponentSources],
      lessComponentSources: lessComponentSources,
      currentDistDir: currentDistDir
    };
  }();

// for communication (through global oasp4js namespace) between gulp and systemjs.config.js on current app directory
global.oasp4js = oasp4js;

gulp.task('copy-favicon-icon', function () {
  return gulp.src('favicon.ico')
    .pipe(gulp.dest(config.currentDistDir()));
});

gulp.task('copy-bootstrap-fonts', function () {
  return gulp.src('node_modules/bootstrap-css-only/fonts/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest(config.fontsDir));
});

gulp.task('copy-templates', function () {
  return gulp.src(config.templateSources)
    .pipe(gulpIf(config.isProd(), htmlMin(htmlMinConfig)))
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
    .pipe(gulpIf(config.isProd(), cleanCss()))
    .pipe(gulp.dest(config.transpiledAppDir));
});

gulp.task('process-main-html-and-copy-it', function () {
  return gulp.src(config.mainHtmlPath)
    .pipe(processHtml({
      commentMarker: 'process', // use <!-- process:... --> comment markers to not conflict with usemin ones: <!-- build:css ... -->
      environment: config.isProd() ? 'prod' : 'dev'
    }))
    .pipe(gulpIf(config.isProd(), usemin({
      path: config.tmpDir,
      css: [cleanCss(), rev()],
      js: [rev()]
    })))
    .pipe(gulp.dest(config.currentDistDir()));
});

gulp.task('transpile-ts-to-js', ['copy-templates', 'compile-component-less-styles-and-copy-them'], function () {
  return transpileTsToJs('/app');
});

gulp.task('transpile-ts-to-js-4-tests', ['copy-templates', 'compile-component-less-styles-and-copy-them'], function () {
  return transpileTsToJs('/base/app');
});

gulp.task('reload-browser-after-transpilation', ['transpile-ts-to-js'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('reload-browser-after-processing-main-html', ['process-main-html-and-copy-it'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('build', ['transpile-ts-to-js', 'process-main-html-and-copy-it', 'compile-main-less-and-copy-it', 'copy-bootstrap-fonts', 'copy-favicon-icon']);

gulp.task('serve', ['build'], function () {
  browserSync.init({
    online: false,
    ghostMode: false,
    server: {
      baseDir: [config.currentDistDir()],
      routes: {
        '/node_modules': 'node_modules',
        '/systemjs.config.js': 'systemjs.config.js',
        '/app': 'app' // for getting TypeScript sources from within source maps
      },
      middleware: [historyApiFallback()] // to return index.html while refreshing or bookmarking (HTML5 navigation)
    }
  });

  gulp.watch([config.tsSources, config.templateSources, config.lessComponentSources], ['reload-browser-after-transpilation']);
  gulp.watch([config.lessSourcesExceptComponentOnes], ['compile-main-less-and-copy-it']);
  gulp.watch([config.mainHtmlPath], ['reload-browser-after-processing-main-html']);
});

gulp.task('set-prod-config', function () {
  config.setForProd();
});

gulp.task('minify-main-html-in-dist', function () {
  return gulp.src(config.distDir + '/' + config.mainHtmlPath)
    .pipe(htmlMin(htmlMinConfig))
    .pipe(gulp.dest(config.distDir));
});

gulp.task('build-systemjs-self-executable-js', ['transpile-ts-to-js'], function (done) {
  oasp4js.currentAppDir = '.tmp/app';
  try {
    new Builder('.', './systemjs.config.js')
      .buildStatic(
        polyfillPaths.join(' + ') + ' + ' + config.transpiledAppDir + '/main.js',
        config.transpiledAppDir + '/main-sfx.js',
        {minify: true, runtime: false}) // no transpiler runtime needed
      .then(function () {
        done();
      })
      .catch(function (error) {
        done(error);
      });
  } catch (error) {
    done(error);
  }
});

gulp.task('build:dist', gulpSync.sync([['set-prod-config'], ['build-systemjs-self-executable-js', 'compile-main-less-and-copy-it', 'copy-bootstrap-fonts', 'copy-favicon-icon'], ['process-main-html-and-copy-it'], ['minify-main-html-in-dist']]));

gulp.task('serve:dist', ['build:dist'], function () {
  browserSync.init({
    online: false,
    ghostMode: false,
    server: {
      baseDir: [config.currentDistDir()],
      middleware: [historyApiFallback()] // to return index.html while refreshing or bookmarking (HTML5 navigation)
    }
  });
});

gulp.task('clean', function () {
  return gulp.src([config.tmpDir, config.distDir], {read: false})
    .pipe(clean({force: true}));
});

gulp.task('test:tdd', ['transpile-ts-to-js-4-tests'], function (done) {
  runKarmaTestsAndWatchForChanges(true, done);
});

gulp.task('test:tdd:debug', ['transpile-ts-to-js-4-tests'], function (done) {
  runKarmaTestsAndWatchForChanges(false, done);
});

gulp.task('test', gulpSync.sync(['lint', 'transpile-ts-to-js-4-tests']), function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    browsers: ['PhantomJS'],
    singleRun: true,
    autoWatch: false
  }, done).start();
});

gulp.task('lint', function () {
  return gulp.src(config.tsSources)
    .pipe(tsLint({
      formatter: 'prose'
    }))
    .pipe(tsLint.report({
      emitError: true,
      summarizeFailureOutput: true
    }))
});

gulp.task('default', gulpSync.sync(['clean', 'serve']));
