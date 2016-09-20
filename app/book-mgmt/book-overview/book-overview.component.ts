import {Component, OnInit} from '@angular/core';
import {BookService, Book} from '../book.service';

@Component({
  selector: 'book-overview',
  template: require('./book-overview.component.html!text')
} as Component)
export class BookOverviewComponent implements OnInit {
  currentBooks: Book[];

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.currentBooks = this.bookService.findAll();
  }

  thereAreBooksToDisplay(): boolean {
    return this.currentBooks && this.currentBooks.length > 0;
  }
}
