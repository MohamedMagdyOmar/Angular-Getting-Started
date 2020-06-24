import { Component } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'pm-root',
  template: `
    <nav class="navbar navbar-expand navbar-light bg-light">
      <a class="navbar-brand">{{ pageTitle }}</a>
      <ul class="nav nav-pills">
        <li><a class="nav-link" [routerLink]="['/welcome']">Home</a></li>
        <li>
          <a class="nav-link" [routerLink]="['/products']">Carbonite Product List</a>
        </li>
      </ul>
    </nav>

    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  pageTitle: string = 'Carbonite Product Managment';
}
