import {NgModule} from '@angular/core';
import {AppNavComponent} from './navigation/app-nav.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [AppNavComponent],
  exports: [AppNavComponent]
} as NgModule)
export class GeneralModule {
}
