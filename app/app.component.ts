import {Component, ComponentMetadataType} from '@angular/core';

@Component({
  selector: 'app',
  template: '<app-nav></app-nav><router-outlet></router-outlet>',
} as ComponentMetadataType)
export class AppComponent {
}
