import {Component, OnInit} from '@angular/core';
import {BookService, Book} from '../book.service';
import {myTempl} from './book-overview.component.html!text';

@Component({
  selector: 'book-overview',
  template: myTempl,
//   template:
//     `
// <section class="container-fluid">
//   <section [hidden]="thereAreBooksToDisplay()">
//     <p>No books available. <a routerLink="/book-mgmt/book">Add a new one</a>.</p>
//   </section>
//   <section [hidden]="!thereAreBooksToDisplay()">
//     <table class="table table-striped">
//       <thead>
//       <tr>
//         <th>Author</th>
//         <th>Title</th>
//         <th>&nbsp;</th>
//       </tr>
//       </thead>
//       <tbody>
//       <tr *ngFor="let book of currentBooks">
//         <td>{{book.author}}</td>
//         <td>{{book.title}}</td>
//         <td><a [routerLink]="['/book-mgmt/book', book.id]">Details</a></td>
//       </tr>
//       </tbody>
//     </table>
//   </section>
// </section>
// `
})
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
