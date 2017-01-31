/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    defaultJSExtensions: true,
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // for template imports
      text: 'npm:systemjs-plugin-text/text.js',
      // our app is within the app folder
      app: (global.oasp4js && global.oasp4js.currentAppDir) || 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core',
      '@angular/common': 'npm:@angular/common',
      '@angular/compiler': 'npm:@angular/compiler',
      '@angular/platform-browser': 'npm:@angular/platform-browser',
      // '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic',
      '@angular/http': 'npm:@angular/http',
      '@angular/router': 'npm:@angular/router',
      '@angular/forms': 'npm:@angular/forms',

      // other libraries
      'rxjs': 'npm:rxjs',
      '@ng-bootstrap/ng-bootstrap': 'node_modules/@ng-bootstrap/ng-bootstrap'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main-aot.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      '@angular/core': {
        main: 'index.js'
      },
      '@angular/common': {
        main: 'index.js'
      },
      '@angular/compiler': {
        main: 'index.js'
      },
      '@angular/platform-browser': {
        main: 'index.js'
      },
      '@angular/forms': {
        main: 'index.js'
      },
      '@angular/router': {
        main: 'index.js'
      },
      '@angular/http': {
        main: 'index.js'
      },
      '@ng-bootstrap/ng-bootstrap': {
        main: 'index.js'
      }
    }
  });
})(this);
