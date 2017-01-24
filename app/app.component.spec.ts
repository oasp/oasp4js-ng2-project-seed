/* tslint:disable:no-unused-variable */
import {AppComponent} from './app.component';
import {TestBed, async} from '@angular/core/testing';
import {GeneralModule} from './general/general.module';
import {BookMgmtModule} from './book-mgmt/book-mgmt.module';
import {Type} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {ComponentFixture} from '@angular/core/testing/component_fixture';
import {Observable} from 'rxjs';

describe('AppComponent with TCB', function () {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BookMgmtModule, GeneralModule, RouterTestingModule],
      declarations: [AppComponent]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent as Type<AppComponent>);
      component = fixture.componentInstance;
    });
  }));

  it('should instantiate component', () => {
    fixture.detectChanges(); // triggers AppComponent.ngOnInit()
    expect(component instanceof AppComponent).toBe(true, 'should create AppComponent');
  });


  class MyClass1 {
    getOne(param: string): Observable<string> {
      return Observable.from(param + '00');
    }

    addOne(param: string): Observable<string> {
      return Observable.from(param + '1');
    }
  }

  class MyClass2 {
    private myClass1: MyClass1 = new MyClass1();

    getTwo(param: string): Observable<number> {
      return this.myClass1.getOne(param)
        .flatMap((one: string) => {
          return this.myClass1.addOne(one);
        })
        .map((one: string) => {
          return +one;
        });
    }

  }

});
