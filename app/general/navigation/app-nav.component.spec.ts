/* tslint:disable:no-unused-variable */
import {AppNavComponent} from './app-nav.component';
import {TestBed, async} from '@angular/core/testing';
import {Type} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {ComponentFixture} from '@angular/core/testing/component_fixture';

describe('AppNavComponent with TCB', function () {
  let fixture: ComponentFixture<AppNavComponent>;
  let component: AppNavComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppNavComponent]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppNavComponent as Type<AppNavComponent>);
      component = fixture.componentInstance;
    });
  }));

  it('should instantiate AppNavComponent component', () => {
    expect(component instanceof AppNavComponent).toBe(true);
  });
});
