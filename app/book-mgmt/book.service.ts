import {Injectable} from '@angular/core';

@Injectable()
export class BookService {
  private books: Book[] = [];
  private sequencer: number = 1;

  findOne(id: number): Book {
    const originalBook = this.findById(id);
    if (originalBook) {
      return Book.from(originalBook);
    }
  }

  save(bookToSave: Book): void {
    if (bookToSave.id) {
      let originalBook: Book = this.findById(bookToSave.id);
      if (originalBook) {
        originalBook.author = bookToSave.author;
        originalBook.title = bookToSave.title;
      }
    } else {
      bookToSave.id = this.sequencer++;
      this.books.push(bookToSave);
    }
  }

  findAll(): Book[] {
    return this.books;
  }

  private findById(id: number): Book {
    for (let book of this.books) {
      if (book.id === id) {
        return book;
      }
    }
  };
}

export class Book {
  private _id: number;
  private _author: string;
  private _title: string;

  static from(anotherBook: Book): Book {
    const newBook: Book = new Book(anotherBook.author, anotherBook.title);
    newBook.id = anotherBook.id;

    return newBook;
  }

  constructor(authors?: string, title?: string) {
    this._author = authors;
    this._title = title;
  }

  get id(): number {
    return this._id;
  }

  get author(): string {
    return this._author;
  }

  get title(): string {
    return this._title;
  }

  set id(value: number) {
    this._id = value;
  }

  set title(value: string) {
    this._title = value;
  }

  set author(value: string) {
    this._author = value;
  }
}
