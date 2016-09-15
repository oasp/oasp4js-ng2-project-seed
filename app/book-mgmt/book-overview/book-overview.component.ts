import {Component, OnInit} from '@angular/core';
import {BookService, Book} from '../book.service';
import * as template from './book-overview.component.html!text';

@Component({
  selector: 'book-overview',
  template: template
} as Component)
export class BookOverviewComponent implements OnInit {
  currentBooks:Book[];

  constructor(private bookService:BookService) {
  }

  ngOnInit():void {
    this.currentBooks = this.bookService.findAll();
  }

  thereAreBooksToDisplay():boolean {
    return this.currentBooks && this.currentBooks.length > 0;
  }
}
