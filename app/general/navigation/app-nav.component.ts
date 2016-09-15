import {Component, ComponentMetadataType} from '@angular/core';
import * as template from './app-nav.component.html!text';

@Component({
  selector: 'app-nav',
  template: template
} as ComponentMetadataType)
export class AppNavComponent {
  navCollapsed:boolean = true;

  toggleNavigation():void {
    this.navCollapsed = !this.navCollapsed;
  };
}
