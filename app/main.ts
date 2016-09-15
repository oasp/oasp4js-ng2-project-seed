/// <reference path="../typings/index.d.ts" />

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';
import {Type} from '@angular/core';

platformBrowserDynamic().bootstrapModule(AppModule as Type<AppModule>);
