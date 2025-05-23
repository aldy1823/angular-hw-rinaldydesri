import { Component } from '@angular/core';
import {RouterOutlet, ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from './animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'angular-hw-rinaldydesri';

  constructor(private contexts: ChildrenOutletContexts) {}

   getRouteAnimationData() {
     return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}