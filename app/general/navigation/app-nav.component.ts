import {Component} from '@angular/core';

@Component({
  selector: 'app-nav',
  // template: require('./app-nav.component.html!text')
  template: `
<nav class="navbar navbar-light bg-faded">
  <a class="navbar-brand" href="#"><img src="images/oasp-logo-72dpi.png" height="25"></a>
  <button class="navbar-toggler hidden-lg-up"
          type="button"
          aria-controls="navbarResponsive"
          aria-label="Toggle navigation"
          [attr.aria-expanded]="!navCollapsed"
          [class.collapsed]="navCollapsed"
          (click)="toggleNavigation()"></button>
  <div class="collapse navbar-toggleable-md" id="navbarResponsive" [class.in]="!navCollapsed">
    <ul class="nav navbar-nav">
      <li class="nav-item" routerLinkActive="active">
        <a class="nav-link" routerLink="/book-mgmt/books">Book Overview</a>
      </li>
      <li class="nav-item"   routerLinkActive="active">
        <a class="nav-link" routerLink="/book-mgmt/book">New Book</a>
      </li>
    </ul>
  </div>
</nav>
`
})
export class AppNavComponent {
  navCollapsed: boolean = true;

  toggleNavigation(): void {
    this.navCollapsed = !this.navCollapsed;
  };
}
