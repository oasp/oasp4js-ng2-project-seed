import {NgModule, NgModuleMetadataType}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {GeneralModule} from './general/general.module';
import {BookMgmtModule} from './book-mgmt/book-mgmt.module';
import {routing} from './app.routing';

@NgModule({
  imports: [BrowserModule, BookMgmtModule, GeneralModule, routing],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
} as NgModuleMetadataType)
export class AppModule {
}
