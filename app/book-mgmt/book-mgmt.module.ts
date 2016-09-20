import {NgModule} from '@angular/core';
import {BookOverviewComponent} from './book-overview/book-overview.component';
import {BookService} from './book.service';
import {BookDetailsComponent} from './book-details/book-details.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [BookOverviewComponent, BookDetailsComponent],
  exports: [BookOverviewComponent, BookDetailsComponent],
  providers: [BookService]
} as NgModule)
export class BookMgmtModule {
}
