import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-management',
  imports: [RouterLink],
  templateUrl: './management.html',
  styleUrl: './management.css',
})
export class Management {
  title = '';
  icon = '';
  description = '';

  constructor(route: ActivatedRoute) {
    route.data.subscribe((data) => {
      this.title = data['title'];
      this.icon = data['icon'];
      this.description = data['description'];
    });
  }
}
