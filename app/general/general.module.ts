import {NgModule} from '@angular/core';
import {AppNavComponent} from './navigation/app-nav.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule],
  declarations: [AppNavComponent],
  exports: [AppNavComponent]
} as NgModule)
export class GeneralModule {
}
