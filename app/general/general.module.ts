import {NgModule} from '@angular/core';
import {AppNavComponent} from './navigation/app-nav.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '@angular/material';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: [AppNavComponent],
  exports: [AppNavComponent]
} as NgModule)
export class GeneralModule {
}
