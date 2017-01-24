import {Component, OnInit, ViewChild} from '@angular/core';
import {BookService, Book} from '../book.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NgForm, AbstractControl} from '@angular/forms';

@Component({
  selector: 'book-details',
  // template: require('./book-details.component.html!text'),
  template:
    `
<section class="book-details container">
  <form #bookForm="ngForm" (ngSubmit)="save()" [class.ng-submitted]="submitted" novalidate>
    <div class="form-group row" [class.has-danger]="isFieldInvalid('titleField')">
      <label for="title" class="col-lg-1 col-form-label">Title:</label>
      <div class="col-lg-4">
        <input id="title" name="titleField" type="text" [(ngModel)]="currentBook.title"
               class="form-control form-control-danger" required maxlength="50">
      </div>
      <div class="col-lg-7 form-control-feedback">{{ getErrorMessageOfField('titleField') }}</div>
    </div>

    <div class="form-group row has-danger" [class.has-danger]="isFieldInvalid('authorField')">
      <label for="author" class="col-lg-1 col-form-label">Author:</label>
      <div class="col-lg-4">
        <input id="author" name="authorField" type="text" [(ngModel)]="currentBook.author"
               class="form-control form-control-danger" required maxlength="15">
      </div>
      <div class="col-lg-7 form-control-feedback">{{ getErrorMessageOfField('authorField') }}</div>
    </div>

    <div class="row">
      <div class="col-lg-1">
      </div>
      <div class="col-lg-4">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </div>
  </form>
</section>
`,
  // styles: [require('./book-details.component.css!text')]
  styles: [`
:host .row {
    margin-top: 20px;
  }
:host .form-label {
    text-align: right;
  }
`]
})
export class BookDetailsComponent implements OnInit {
  @ViewChild('bookForm') currentForm: NgForm;

  currentBook: Book;

  submitted: boolean;

  private static createErrorMessage(errorObject: {[key: string]: any}): string {
    if (errorObject) {
      for (let errorCode in errorObject) {
        if (errorObject.hasOwnProperty(errorCode)) {
          switch (errorCode) {
            case 'required':
              return 'Please provide a value';
            case 'maxlength':
              return 'The value is too long';
            default:
              return 'The value is wrong';
          }
        }
      }
    }
  };

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) {
    this.currentBook = new Book();
    this.submitted = false;
  }

  save(): void {
    this.submitted = true;
    if (this.currentForm && this.currentForm.form && this.currentForm.form.valid) {
      this.bookService.save(this.currentBook);
      this.router.navigate(['book-mgmt/books']);
    }
  }

  getErrorMessageOfField(fieldName: string): string {
    if (this.isFieldInvalid(fieldName)) {
      const fieldControl: AbstractControl = this.currentForm.form.get(fieldName);
      return BookDetailsComponent.createErrorMessage(fieldControl.errors);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const fieldControl: AbstractControl = this.currentForm.form.get(fieldName);
    return fieldControl && fieldControl.invalid && (fieldControl.touched || this.submitted);
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['bookId']) {
        let bookId: number = +params['bookId'];
        let foundBook: Book = this.bookService.findOne(bookId);
        if (foundBook) {
          this.currentBook = foundBook;
        } else {
          this.router.navigate(['book-mgmt/book']);
        }
      }
    });
  }
}
