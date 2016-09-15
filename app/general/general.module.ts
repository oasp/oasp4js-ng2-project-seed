import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppNavComponent} from './navigation/app-nav.component';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [BrowserModule, RouterModule],
  declarations: [AppNavComponent],
  exports: [AppNavComponent]
} as NgModule)
export class GeneralModule {
}
