import {Component} from '@angular/core';

@Component({
  selector: 'app-nav',
  template: require('./app-nav.component.html!text')
} as Component)
export class AppNavComponent {
  navCollapsed: boolean = true;

  toggleNavigation(): void {
    this.navCollapsed = !this.navCollapsed;
  };
}
