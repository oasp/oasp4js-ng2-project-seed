import {enableProdMode, Type} from '@angular/core';
import {environment} from './_env/environment';
import {platformBrowser} from '@angular/platform-browser';
import {AppModuleNgFactory} from '../aot/app/app.module.ngfactory';
// import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
// import {AppModule} from './app.module';

if (environment.enableProdMode) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule as Type<AppModule>);

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
