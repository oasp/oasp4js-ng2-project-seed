import {NgModule} from '@angular/core';
import {BookOverviewComponent} from './book-overview/book-overview.component';
import {BrowserModule} from '@angular/platform-browser';
import {BookService} from './book.service';
import {BookDetailsComponent} from './book-details/book-details.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [BrowserModule, RouterModule, FormsModule],
  declarations: [BookOverviewComponent, BookDetailsComponent],
  exports: [BookOverviewComponent, BookDetailsComponent],
  providers: [BookService]
} as NgModule)
export class BookMgmtModule {
}
