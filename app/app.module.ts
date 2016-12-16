import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {GeneralModule} from './general/general.module';
import {BookMgmtModule} from './book-mgmt/book-mgmt.module';
import {routing} from './app.routing';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [BrowserModule, BookMgmtModule, GeneralModule, routing, NgbModule.forRoot()],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
} as NgModule)
export class AppModule {
}
